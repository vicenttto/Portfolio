import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import Portrait from "./Portrait";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as const },
  }),
};

export default function Hero() {
  return (
    <section
      id="top"
      className="relative h-[100svh] flex flex-col overflow-hidden"
      style={{ overflowX: "clip" }}
    >
      <div className="absolute top-0 inset-x-0 z-0 flex justify-center pt-6 sm:pt-7 md:pt-6 overflow-hidden">
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.5 }}
          custom={0.15}
          className="font-display text-shine font-black uppercase leading-none tracking-tight whitespace-nowrap w-full text-center"
          style={{ fontSize: "clamp(2rem, 11vw, 9rem)" }}
        >
          Soy Vicente
        </motion.h1>
      </div>

      <div className="relative z-30 flex-1 min-h-0 flex items-start justify-center pointer-events-none">
        <div className="pointer-events-auto mt-10 sm:mt-28 md:mt-32 lg:mt-36">
          <Portrait />
        </div>
      </div>

      <div className="relative z-20 mt-auto flex items-end justify-between px-5 md:px-10 pb-7 sm:pb-8 md:pb-10 gap-6">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.6 }}
          custom={0.35}
          className="pointer-events-none max-w-[160px] sm:max-w-[220px] md:max-w-[260px] text-[var(--muted)] font-light uppercase tracking-wide leading-snug"
          style={{ fontSize: "clamp(0.75rem, 1.4vw, 1.5rem)" }}
        >
          Full Stack Developer. De la idea a producción real.
        </motion.p>

        <motion.a
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.6 }}
          custom={0.5}
          href="#contact"
          className="btn-gradient pointer-events-auto inline-flex items-center gap-2 rounded-full px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base text-white font-medium uppercase tracking-widest"
        >
          <Mail size={16} />
          Contáctame
        </motion.a>
      </div>
    </section>
  );
}
