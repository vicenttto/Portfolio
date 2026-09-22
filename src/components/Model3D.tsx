import { Suspense, useRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useInView } from "framer-motion";
import * as THREE from "three";
import { useCenteredScene } from "../hooks/useCenteredScene";

function GrabCursor() {
  const { gl } = useThree();
  return (
    <OrbitControls
      enableZoom={false}
      enablePan={false}
      autoRotate
      autoRotateSpeed={2.2}
      rotateSpeed={0.7}
      onStart={() => (gl.domElement.style.cursor = "grabbing")}
      onEnd={() => (gl.domElement.style.cursor = "grab")}
    />
  );
}

function CenteredModel({ src }: { src: string }) {
  const { scene } = useGLTF(src);
  const groupRef = useRef<THREE.Group>(null);
  useCenteredScene(scene, groupRef, 1.7);

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  );
}

export default function Model3D({ src }: { src: string }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapperRef, { initial: true });

  return (
    <div ref={wrapperRef} style={{ width: "100%", height: "100%" }}>
      <Canvas
        camera={{ position: [0, 0, 3], fov: 40 }}
        gl={{ alpha: true, antialias: true }}
        style={{ width: "100%", height: "100%", touchAction: "none", cursor: "grab" }}
        frameloop={inView ? "always" : "never"}
      >
        <ambientLight intensity={1} />
        <directionalLight position={[3, 4, 5]} intensity={1.3} />
        <directionalLight position={[-3, -2, -3]} intensity={0.5} />
        <Suspense fallback={null}>
          <CenteredModel src={src} />
        </Suspense>
        <GrabCursor />
      </Canvas>
    </div>
  );
}
