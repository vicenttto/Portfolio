import { motion } from "framer-motion";
import { experience } from "../data/content";

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative z-10 -mt-8 rounded-t-[32px] md:rounded-t-[48px] bg-[var(--bg)] pt-16 md:pt-24 pb-16 md:pb-24 px-5 md:px-10"
    >
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="font-display text-gradient font-black uppercase leading-none tracking-tight text-center"
        style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
      >
        Experiencia
      </motion.h2>

      <div className="mx-auto max-w-3xl mt-12 md:mt-16">
        {experience.map((item, i) => (
          <motion.div
            key={item.company}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-8 py-7"
            style={{ borderTop: "1px solid var(--line)" }}
          >
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--muted)] sm:w-40 shrink-0">
              {item.period}
            </span>
            <div>
              <h3 className="text-lg md:text-xl font-semibold">
                {item.company}{" "}
                <span className="text-[var(--muted)] font-normal">
                  — {item.role}
                </span>
              </h3>
              {item.description && (
                <p className="mt-2 text-sm md:text-base text-[var(--muted)] leading-relaxed max-w-xl">
                  {item.description}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
