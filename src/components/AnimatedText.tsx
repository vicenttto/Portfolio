import { useRef, type CSSProperties } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

function Char({
  char,
  progress,
  start,
  end,
}: {
  char: string;
  progress: MotionValue<number>;
  start: number;
  end: number;
}) {
  const opacity = useTransform(progress, [start, end], [0.2, 1]);
  const display = char === " " ? " " : char;

  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      <span style={{ visibility: "hidden" }}>{display}</span>
      <motion.span style={{ opacity, position: "absolute", left: 0, top: 0 }}>
        {display}
      </motion.span>
    </span>
  );
}

export default function AnimatedText({
  text,
  className,
  style,
}: {
  text: string;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.2"],
  });

  const words = text.split(/(\s+)/);
  const totalChars = text.length;
  let charIndex = 0;

  return (
    <p ref={ref} className={className} style={style}>
      {words.map((word, wi) => (
        <span key={wi} style={{ display: /^\s+$/.test(word) ? undefined : "inline-block" }}>
          {word.split("").map((char) => {
            const i = charIndex++;
            const charProgress = i / totalChars;
            const start = Math.max(0, charProgress - 0.1);
            const end = Math.min(1, charProgress + 0.05);
            return (
              <Char
                key={i}
                char={char}
                progress={scrollYProgress}
                start={start}
                end={end}
              />
            );
          })}
        </span>
      ))}
    </p>
  );
}
