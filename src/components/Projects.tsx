import { useState, type KeyboardEvent, type MouseEvent } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { projects, type Project } from "../data/content";

const TILT_MAX = 7;
const SHADOW_STACKED = "0 10px 16px -6px rgba(0,0,0,0.15)";
const SHADOW_ACTIVE = "0 10px 30px -8px rgba(0,0,0,0.18)";
const SHADOW_DRAGGING = "0 40px 70px -10px rgba(0,0,0,0.4)";
const MEDIA_RATIOS = ["4 / 3", "16 / 9", "6 / 5"];

function MediaTile({
  src,
  alt,
  placeholderRatio,
  frameColor = "dark",
}: {
  src?: string;
  alt: string;
  placeholderRatio: string;
  frameColor?: "dark" | "light";
}) {
  const frame = `rounded-[18px] sm:rounded-[24px] md:rounded-[28px] border-2 ${
    frameColor === "light"
      ? "border-white shadow-[0_2px_10px_rgba(0,0,0,0.18)]"
      : "border-[var(--fg-contrast)]"
  }`;
  const rowHeightClass = "sm:h-[clamp(130px,15vw,190px)]";

  if (src) {
    return (
      <img
        src={src}
        alt={`Vista previa de ${alt}`}
        className={`w-full h-auto sm:w-auto sm:max-w-full ${rowHeightClass} ${frame}`}
      />
    );
  }

  return (
    <div
      className={`w-full sm:w-auto sm:max-w-full ${rowHeightClass} flex items-center justify-center text-xs text-center px-2 text-[var(--muted-contrast)] bg-[var(--fg-contrast)]/5 ${frame}`}
      style={{ aspectRatio: placeholderRatio }}
    >
      Próximamente
    </div>
  );
}

function NavButton({
  direction,
  onClick,
  disabled,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "prev" ? "Proyecto anterior" : "Siguiente proyecto"}
      className="flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full border-2 border-[var(--fg-contrast)] text-[var(--fg-contrast)] shadow-lg transition-colors hover:bg-[var(--fg-contrast)] hover:text-[var(--bg-contrast)] disabled:opacity-0 disabled:pointer-events-none"
    >
      {direction === "prev" ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
    </button>
  );
}

function ProjectCard({
  project,
  index,
  stacked,
  isTop,
  onNext,
  onPrev,
}: {
  project: Project;
  index: number;
  stacked: boolean;
  isTop: boolean;
  onNext: () => void;
  onPrev: () => void;
}) {
  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);
  const rotateX = useSpring(rawRotateX, { stiffness: 200, damping: 20 });
  const rotateY = useSpring(rawRotateY, { stiffness: 200, damping: 20 });

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rawRotateY.set(px * TILT_MAX);
    rawRotateX.set(-py * TILT_MAX);
  }

  function handleMouseLeave() {
    rawRotateX.set(0);
    rawRotateY.set(0);
  }

  return (
    <motion.div
      initial={
        stacked ? { scale: 0.85, y: 30, boxShadow: SHADOW_STACKED } : false
      }
      animate={{ scale: 1, y: 0, boxShadow: SHADOW_ACTIVE }}
      exit={
        stacked
          ? {
              scale: 0.85,
              y: 30,
              boxShadow: SHADOW_STACKED,
              transition: { type: "spring", stiffness: 500, damping: 40 },
            }
          : undefined
      }
      transition={{ type: "spring", stiffness: 300, damping: 28 }}
      whileDrag={{ scale: 1.015, boxShadow: SHADOW_DRAGGING }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.2}
      onDragEnd={(_, info) => {
        if (info.offset.x < -80) onNext();
        else if (info.offset.x > 80) onPrev();
      }}
      onMouseMove={isTop ? handleMouseMove : undefined}
      onMouseLeave={isTop ? handleMouseLeave : undefined}
      className={`${isTop ? "relative" : "absolute inset-0"} w-full rounded-[32px] sm:rounded-[44px] md:rounded-[52px] border-2 p-5 sm:p-7 md:p-9 flex flex-col bg-[var(--bg-contrast)] border-[var(--fg-contrast)] cursor-grab active:cursor-grabbing`}
      style={{
        zIndex: index + 1,
        rotateX,
        rotateY,
        transformPerspective: 900,
      }}
    >
      <a
        href={project.href}
        target={project.href.startsWith("http") ? "_blank" : undefined}
        rel={project.href.startsWith("http") ? "noreferrer" : undefined}
        className="group absolute top-5 right-5 sm:top-7 sm:right-7 md:top-9 md:right-9 inline-flex items-center gap-1.5 sm:gap-2 rounded-full border-2 border-[var(--fg-contrast)] px-3.5 py-2 sm:px-5 sm:py-2.5 text-[10px] sm:text-xs uppercase tracking-widest text-[var(--fg-contrast)] hover:bg-[var(--fg-contrast)]/10 transition-colors shrink-0 bg-[var(--bg-contrast)]"
      >
        Ver proyecto
        <ArrowUpRight
          size={12}
          className="sm:w-3.5 sm:h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
        />
      </a>

      <div className="flex items-baseline gap-4 sm:gap-6 pr-24 sm:pr-40 md:pr-44">
        <span
          className="font-display font-black text-[var(--fg-contrast)]"
          style={{ fontSize: "clamp(2.5rem, 7vw, 90px)" }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <div>
          <span className="text-xs uppercase tracking-widest text-[var(--muted-contrast)]">
            {project.year}
          </span>
          <h3
            className="font-display font-semibold uppercase leading-none mt-1 text-[var(--fg-contrast)]"
            style={{
              fontSize: "clamp(1.5rem, 4vw, 3rem)",
              minHeight: "calc(2 * clamp(1.5rem, 4vw, 3rem))",
            }}
          >
            {project.name}
          </h3>
        </div>
      </div>

      <p
        className="mt-4 max-w-2xl text-[var(--muted-contrast)] leading-relaxed"
        style={{ minHeight: "3.25rem" }}
      >
        {project.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="rounded-full border border-[var(--fg-contrast)]/20 px-3 py-1 text-xs text-[var(--muted-contrast)]"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4">
        {MEDIA_RATIOS.map((ratio, i) => (
          <MediaTile
            key={i}
            src={project.media?.[i]}
            alt={project.name}
            placeholderRatio={ratio}
            frameColor={project.mediaFrame}
          />
        ))}
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [revealed, setRevealed] = useState(0);
  const [exitingIndex, setExitingIndex] = useState<number | null>(null);
  const topIndex = exitingIndex ?? revealed;
  const hasNext = revealed < projects.length - 1;
  const hasPrev = revealed > 0;
  const nextProject = projects[topIndex + 1];

  const next = () => setRevealed((r) => Math.min(r + 1, projects.length - 1));
  const prev = () => {
    if (revealed === 0) return;
    setExitingIndex(revealed);
    setRevealed((r) => r - 1);
  };

  function handleKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    }
  }

  return (
    <section
      id="work"
      className="relative z-10 -mt-8 rounded-t-[32px] md:rounded-t-[48px] px-5 md:px-10 py-20 sm:py-24 md:py-32"
      style={{ background: "var(--bg-contrast)", color: "var(--fg-contrast)" }}
    >
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="font-display text-gradient-dark font-black uppercase leading-none tracking-tight text-center"
        style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
      >
        Proyectos
      </motion.h2>

      <div
        role="group"
        aria-label="Carrusel de proyectos. Usa las flechas izquierda y derecha para navegar."
        tabIndex={0}
        onKeyDown={handleKeyDown}
        className="relative mx-auto max-w-4xl mt-16 sm:mt-20 md:mt-24 rounded-[32px] sm:rounded-[44px] md:rounded-[52px] focus:outline-none focus-visible:ring-4 focus-visible:ring-[var(--fg-contrast)]/25"
      >
        {nextProject && (
          <div
            aria-hidden
            className="absolute inset-0 rounded-[32px] sm:rounded-[44px] md:rounded-[52px] border-2 border-[var(--fg-contrast)] bg-[var(--bg-contrast)] pointer-events-none"
            style={{
              transform: "translateY(20px)",
              boxShadow: SHADOW_STACKED,
              zIndex: 0,
            }}
          />
        )}

        <AnimatePresence
          initial={false}
          onExitComplete={() => setExitingIndex(null)}
        >
          {projects.slice(0, revealed + 1).map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              stacked={i > 0}
              isTop={i === topIndex}
              onNext={next}
              onPrev={prev}
            />
          ))}
        </AnimatePresence>
      </div>

      <div className="mx-auto max-w-4xl mt-8 flex items-center justify-center gap-4">
        <NavButton direction="prev" onClick={prev} disabled={!hasPrev} />

        <span className="font-mono text-xs uppercase tracking-widest text-[var(--muted-contrast)] w-16 text-center">
          {String(revealed + 1).padStart(2, "0")} /{" "}
          {String(projects.length).padStart(2, "0")}
        </span>

        <NavButton direction="next" onClick={next} disabled={!hasNext} />
      </div>
    </section>
  );
}
