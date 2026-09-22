import { useEffect, useRef } from "react";
import Face3D from "./Face3D";

export default function Portrait() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const animate = (now: number) => {
      const t = (now - start) / 1000;
      const x = Math.sin(t * 0.75) * 10;
      const y = Math.sin(t * 0.55 + 1.4) * 6;
      if (containerRef.current) {
        containerRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-[54vh] sm:h-[60vh] md:h-[66vh] lg:h-[76vh] aspect-[307/425] select-none"
      style={{ transition: "transform 0.35s cubic-bezier(0.2,0.8,0.2,1)" }}
    >
      <Face3D />
    </div>
  );
}
