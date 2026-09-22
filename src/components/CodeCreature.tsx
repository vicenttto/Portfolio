import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import { useIsTouch } from "../hooks/useIsTouch";

const CHARS = "{}()<>/;=+-01*#".split("");

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  char: string;
  flipSlot: number;
};

const REPEL_RADIUS = 90;
const REPEL_STRENGTH = 2.2;

export default function CodeCreature({
  color = "#f2f2f0",
  className = "h-40 md:h-56 w-full",
  density = 45,
}: {
  color?: string;
  className?: string;
  density?: number;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointer = useRef({ x: -9999, y: -9999 });
  const isTouch = useIsTouch();
  const inView = useInView(wrapperRef, { initial: true });
  const inViewRef = useRef(inView);
  useEffect(() => {
    inViewRef.current = inView;
  }, [inView]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const particles: Particle[] = Array.from({ length: density }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      char: CHARS[Math.floor(Math.random() * CHARS.length)],
      flipSlot: Math.floor(Math.random() * 200) % 50,
    }));

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onLeave = () => {
      pointer.current = { x: -9999, y: -9999 };
    };
    if (!isTouch) {
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerleave", onLeave);
    }

    let raf = 0;
    let frame = 0;
    ctx.font = "10px 'JetBrains Mono', monospace";
    ctx.fillStyle = color;

    const animate = () => {
      raf = requestAnimationFrame(animate);
      if (!inViewRef.current) return;

      frame++;
      ctx.clearRect(0, 0, width, height);
      ctx.globalAlpha = 0.45;

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
        p.x = Math.max(0, Math.min(width, p.x));
        p.y = Math.max(0, Math.min(height, p.y));

        if (!isTouch) {
          const dx = p.x - pointer.current.x;
          const dy = p.y - pointer.current.y;
          const dist = Math.hypot(dx, dy);
          if (dist < REPEL_RADIUS && dist > 0.01) {
            const push = ((REPEL_RADIUS - dist) / REPEL_RADIUS) * REPEL_STRENGTH;
            p.x = Math.max(0, Math.min(width, p.x + (dx / dist) * push));
            p.y = Math.max(0, Math.min(height, p.y + (dy / dist) * push));
          }
        }

        if (frame % 50 === p.flipSlot) {
          p.char = CHARS[Math.floor(Math.random() * CHARS.length)];
        }

        ctx.fillText(p.char, p.x, p.y);
      }
      ctx.globalAlpha = 1;
    };
    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, [color, density, isTouch]);

  return (
    <div ref={wrapperRef} className={className}>
      <canvas ref={canvasRef} className="h-full w-full block" />
    </div>
  );
}
