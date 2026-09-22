import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useInView } from "framer-motion";

export default function TypewriterText({
  text,
  className,
  style,
  speed = 35,
}: {
  text: string;
  className?: string;
  style?: CSSProperties;
  speed?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { amount: 0.4 });

  useEffect(() => {
    if (!inView) {
      setCount(0);
      return;
    }
    let i = 0;
    setCount(0);
    const interval = setInterval(() => {
      i++;
      setCount(i);
      if (i >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [inView, text, speed]);

  return (
    <div className={`relative ${className ?? ""}`} style={style}>
      <h2 aria-hidden className="invisible">
        {text}
      </h2>
      <h2 ref={ref} className="absolute inset-0">
        {text.slice(0, count)}
        <span className="typewriter-cursor">|</span>
      </h2>
    </div>
  );
}
