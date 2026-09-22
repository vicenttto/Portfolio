import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowDown } from "lucide-react";
import AnimatedText from "./AnimatedText";
import Model3D from "./Model3D";
import { skills } from "../data/content";
import modelCd from "../assets/media/model-cd.glb";
import modelCrtMonitor from "../assets/media/model-crt-monitor.glb";
import modelGameController from "../assets/media/model-game-controller.glb";
import modelGlobe from "../assets/media/model-globe.glb";

const fadeIn = {
  hidden: (custom: { x?: number; y?: number }) => ({
    opacity: 0,
    x: custom.x ?? 0,
    y: custom.y ?? 0,
  }),
  show: { opacity: 1, x: 0, y: 0 },
};

function FloatingCorner({
  mx,
  my,
  depth,
  entranceX,
  delay,
  positionClass,
  sizeClass,
  children,
}: {
  mx: MotionValue<number>;
  my: MotionValue<number>;
  depth: number;
  entranceX: number;
  delay: number;
  positionClass: string;
  sizeClass: string;
  children: React.ReactNode;
}) {
  const x = useSpring(useTransform(mx, (v) => v * depth), {
    stiffness: 120,
    damping: 18,
  });
  const y = useSpring(useTransform(my, (v) => v * depth), {
    stiffness: 120,
    damping: 18,
  });

  return (
    <motion.div
      variants={fadeIn}
      custom={{ x: entranceX }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0 }}
      transition={{ delay, duration: 0.9 }}
      style={{ x, y }}
      className={`absolute z-0 aspect-square opacity-80 ${positionClass} ${sizeClass}`}
    >
      {children}
    </motion.div>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set(((e.clientX - rect.left) / rect.width - 0.5) * 2);
    my.set(((e.clientY - rect.top) / rect.height - 0.5) * 2);
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative z-10 -mt-8 rounded-t-[32px] md:rounded-t-[48px] min-h-screen flex flex-col items-center justify-center overflow-hidden px-5 sm:px-8 md:px-10 py-20"
      style={{ background: "var(--bg-contrast)", color: "var(--fg-contrast)" }}
    >
      <FloatingCorner
        mx={mx}
        my={my}
        depth={14}
        entranceX={-80}
        delay={0.1}
        positionClass="top-[4%] left-[1%] sm:left-[2%] md:left-[4%]"
        sizeClass="w-[100px] sm:w-[130px] md:w-[170px]"
      >
        <Model3D src={modelCrtMonitor} />
      </FloatingCorner>

      <FloatingCorner
        mx={mx}
        my={my}
        depth={22}
        entranceX={-80}
        delay={0.25}
        positionClass="bottom-[6%] left-[3%] sm:left-[6%] md:left-[9%]"
        sizeClass="w-[100px] sm:w-[130px] md:w-[170px]"
      >
        <Model3D src={modelCd} />
      </FloatingCorner>

      <FloatingCorner
        mx={mx}
        my={my}
        depth={-14}
        entranceX={80}
        delay={0.15}
        positionClass="top-[4%] right-[1%] sm:right-[2%] md:right-[4%]"
        sizeClass="w-[100px] sm:w-[130px] md:w-[170px]"
      >
        <Model3D src={modelGameController} />
      </FloatingCorner>

      <FloatingCorner
        mx={mx}
        my={my}
        depth={-20}
        entranceX={80}
        delay={0.3}
        positionClass="bottom-[6%] right-[3%] sm:right-[6%] md:right-[9%]"
        sizeClass="w-[100px] sm:w-[130px] md:w-[170px]"
      >
        <Model3D src={modelGlobe} />
      </FloatingCorner>

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-16 sm:gap-20 md:gap-24">
        <div className="flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="font-display text-gradient-dark font-black uppercase leading-none tracking-tight text-center"
            style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
          >
            Sobre mí
          </motion.h2>

          <AnimatedText
            text="Aprendiendo y construyendo constantemente. Graduado en Desarrollo de Aplicaciones Web, con experiencia práctica full stack en empresa: desde un configurador visual con Fabric.js hasta APIs REST con Spring Boot. Cada proyecto es una excusa para aprender algo nuevo."
            className="text-[var(--muted-contrast)] font-medium text-center leading-relaxed max-w-[560px]"
            style={{ fontSize: "clamp(1rem, 2vw, 1.35rem)" }}
          />
        </div>

        <motion.a
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          href="#work"
          className="btn-gradient inline-flex items-center gap-2 rounded-full px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-white font-medium uppercase tracking-widest text-xs sm:text-sm md:text-base"
        >
          Ver proyectos
          <ArrowDown size={16} />
        </motion.a>

        <div className="flex flex-wrap justify-center gap-x-3 gap-y-2 -mt-10">
          {skills.map((skill, i) => (
            <span key={skill} className="text-sm text-[var(--muted-contrast)]">
              {skill}
              {i < skills.length - 1 && <span>,</span>}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
