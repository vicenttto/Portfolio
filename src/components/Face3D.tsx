import { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useInView } from "framer-motion";
import { MeshoptDecoder } from "three-stdlib";
import * as THREE from "three";
import modelFace from "../assets/media/model-face.glb";
import { useIsTouch } from "../hooks/useIsTouch";
import { useCenteredScene } from "../hooks/useCenteredScene";

const MAX_FOLLOW = 0.4;
const MAX_DRAG_X = 0.5;
const MAX_SCROLL_LOOK = 0.35;

function Head() {
  const { scene } = useGLTF(modelFace, true, true, (loader) => {
    loader.setMeshoptDecoder(MeshoptDecoder());
  });
  const pivotRef = useRef<THREE.Group>(null);
  const centerRef = useRef<THREE.Group>(null);
  const lightRef = useRef<THREE.PointLight>(null);
  const { gl } = useThree();

  const dragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0, rotY: 0, rotX: 0 });
  const dragRot = useRef({ y: 0, x: 0 });
  const currentRot = useRef({ y: 0, x: 0 });
  const pointer = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const isTouch = useIsTouch();

  const tapStart = useRef({ x: 0, y: 0, t: 0 });
  const spin = useRef<{
    phase: "idle" | "spin" | "settle";
    start: number;
    duration: number;
    ampY: number;
    ampX: number;
  }>({ phase: "idle", start: 0, duration: 900, ampY: 1, ampX: 0 });

  const scrollLook = useRef(0);

  useEffect(() => {
    if (!isTouch) return;
    const onScroll = () => {
      const t = window.scrollY / (window.innerHeight * 0.6);
      scrollLook.current = THREE.MathUtils.clamp(t, 0, 1);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isTouch]);

  useCenteredScene(scene, centerRef, 1.45);

  useEffect(() => {
    const canvas = gl.domElement;

    if (isTouch) {
      const onDown = (e: PointerEvent) => {
        tapStart.current = { x: e.clientX, y: e.clientY, t: performance.now() };
      };
      const onUp = (e: PointerEvent) => {
        const dx = e.clientX - tapStart.current.x;
        const dy = e.clientY - tapStart.current.y;
        const dt = performance.now() - tapStart.current.t;
        if (Math.hypot(dx, dy) < 10 && dt < 400 && spin.current.phase === "idle") {
          const angle = Math.random() * Math.PI * 2;
          spin.current = {
            phase: "spin",
            start: performance.now(),
            duration: 900,
            ampY: Math.cos(angle),
            ampX: Math.sin(angle),
          };
        }
      };
      canvas.addEventListener("pointerdown", onDown);
      canvas.addEventListener("pointerup", onUp);
      return () => {
        canvas.removeEventListener("pointerdown", onDown);
        canvas.removeEventListener("pointerup", onUp);
      };
    }

    const onDown = (e: PointerEvent) => {
      dragging.current = true;
      canvas.style.cursor = "grabbing";
      dragStart.current = {
        x: e.clientX,
        y: e.clientY,
        rotY: dragRot.current.y,
        rotX: dragRot.current.x,
      };
    };
    const onUp = () => {
      dragging.current = false;
      canvas.style.cursor = "grab";
      dragRot.current = { y: 0, x: 0 };
      currentRot.current.y =
        THREE.MathUtils.euclideanModulo(currentRot.current.y + Math.PI, Math.PI * 2) - Math.PI;
    };
    const onMove = (e: PointerEvent) => {
      pointer.current = { x: e.clientX, y: e.clientY };
      if (dragging.current) {
        const dx = e.clientX - dragStart.current.x;
        const dy = e.clientY - dragStart.current.y;
        dragRot.current = {
          y: dragStart.current.rotY + dx * 0.012,
          x: THREE.MathUtils.clamp(
            dragStart.current.rotX + dy * 0.012,
            -MAX_DRAG_X,
            MAX_DRAG_X
          ),
        };
      }
    };
    canvas.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointermove", onMove);
    return () => {
      canvas.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointermove", onMove);
    };
  }, [gl, isTouch]);

  useFrame(() => {
    const rect = gl.domElement.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = THREE.MathUtils.clamp((pointer.current.x - cx) / (rect.width / 2), -1, 1);
    const dy = THREE.MathUtils.clamp((pointer.current.y - cy) / (rect.height / 2), -1, 1);

    if (isTouch) {
      if (spin.current.phase === "spin") {
        const t = Math.min(
          (performance.now() - spin.current.start) / spin.current.duration,
          1
        );
        const eased = 1 - (1 - t) ** 4;
        currentRot.current.y = spin.current.ampY * Math.PI * 2 * eased;
        currentRot.current.x = spin.current.ampX * Math.PI * 2 * eased;
        if (t >= 1) {
          currentRot.current.y =
            THREE.MathUtils.euclideanModulo(currentRot.current.y + Math.PI, Math.PI * 2) -
            Math.PI;
          currentRot.current.x =
            THREE.MathUtils.euclideanModulo(currentRot.current.x + Math.PI, Math.PI * 2) -
            Math.PI;
          spin.current.phase = "settle";
        }
      } else if (spin.current.phase === "settle") {
        currentRot.current.y += (0 - currentRot.current.y) * 0.12;
        currentRot.current.x += (0 - currentRot.current.x) * 0.12;
        if (Math.abs(currentRot.current.y) < 0.01 && Math.abs(currentRot.current.x) < 0.01) {
          spin.current.phase = "idle";
          currentRot.current.y = 0;
          currentRot.current.x = 0;
        }
      } else {
        currentRot.current.y += (0 - currentRot.current.y) * 0.08;
        const lookTarget = scrollLook.current * MAX_SCROLL_LOOK;
        currentRot.current.x += (lookTarget - currentRot.current.x) * 0.06;
      }
    } else if (dragging.current) {
      currentRot.current.y += (dragRot.current.y - currentRot.current.y) * 0.25;
      currentRot.current.x += (dragRot.current.x - currentRot.current.x) * 0.25;
    } else {
      currentRot.current.y += (dx * MAX_FOLLOW - currentRot.current.y) * 0.08;
      currentRot.current.x += (dy * MAX_FOLLOW * 0.6 - currentRot.current.x) * 0.08;
    }

    if (pivotRef.current) {
      pivotRef.current.rotation.y = currentRot.current.y;
      pivotRef.current.rotation.x = currentRot.current.x;
    }
    if (lightRef.current) {
      lightRef.current.position.set(dx * 0.7, 0.1 - dy * 0.25, 1.15);
    }
  });

  return (
    <>
      <pointLight ref={lightRef} intensity={1.4} distance={1.8} decay={2.5} />
      <group ref={pivotRef}>
        <group ref={centerRef}>
          <primitive object={scene} />
        </group>
      </group>
    </>
  );
}

export default function Face3D() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapperRef, { initial: true });

  return (
    <div ref={wrapperRef} style={{ position: "absolute", inset: "0 -25%" }}>
      <Canvas
        camera={{ position: [0, 0, 2], fov: 32 }}
        gl={{ alpha: true, antialias: true }}
        style={{ width: "100%", height: "100%", touchAction: "pan-y", cursor: "grab" }}
        frameloop={inView ? "always" : "never"}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[3, 4, 5]} intensity={1.5} />
        <directionalLight position={[-3, -2, -3]} intensity={0.6} />
        <Suspense fallback={null}>
          <Head />
        </Suspense>
      </Canvas>
    </div>
  );
}
