import { motion } from "framer-motion";
import { ArrowDownToLine, Mail } from "lucide-react";
import { GithubMark, LinkedinMark } from "./icons";
import CodeCreature from "./CodeCreature";
import TypewriterText from "./TypewriterText";
import { profile } from "../data/content";

function ColumnLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm uppercase tracking-widest text-[var(--muted-contrast)] mb-3">
      {children}
    </p>
  );
}

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative z-10 -mt-8 rounded-t-[32px] md:rounded-t-[48px] flex flex-col px-5 md:px-10 pt-24 md:pt-32"
      style={{ background: "var(--bg-contrast)", color: "var(--fg-contrast)" }}
    >
      <motion.span
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="block text-sm text-center text-[var(--muted-contrast)]"
      >
        Contacto
      </motion.span>

      <TypewriterText
        text="¿Buscas a alguien para tu equipo? Hablemos."
        className="font-semibold text-center leading-tight mt-4 mx-auto max-w-5xl"
        style={{ fontSize: "clamp(1.8rem, 5.5vw, 4.2rem)" }}
      />

      <motion.a
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-80px" }}
        transition={{ duration: 0.6, delay: 0.15 }}
        href={`mailto:${profile.email}`}
        className="btn-gradient mx-auto mt-10 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm text-white font-medium uppercase tracking-widest"
      >
        <Mail size={16} />
        {profile.email}
      </motion.a>

      <div className="relative mt-20 md:mt-24 -mx-5 md:-mx-10 py-10 md:py-14">
        <CodeCreature color="#0c0c0c" className="absolute inset-0" density={50} />

        <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-y-8">
          <div className="flex flex-col items-center text-center">
            <ColumnLabel>Ubicación</ColumnLabel>
            <p className="text-lg md:text-xl">{profile.location}</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <ColumnLabel>Currículum</ColumnLabel>
            <a
              href={profile.cvUrl}
              download
              className="inline-flex items-center gap-2 text-lg md:text-xl hover:opacity-60 transition-opacity w-fit"
            >
              <ArrowDownToLine size={18} />
              Descargar CV
            </a>
          </div>

          <div className="flex flex-col items-center text-center">
            <ColumnLabel>Redes</ColumnLabel>
            <div className="flex flex-col items-center gap-2 text-lg md:text-xl">
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 hover:opacity-60 transition-opacity w-fit"
              >
                <GithubMark size={18} />
                GitHub
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 hover:opacity-60 transition-opacity w-fit"
              >
                <LinkedinMark size={18} />
                LinkedIn
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center text-center">
            <p className="text-lg md:text-xl mb-3 text-[var(--muted-contrast)]">
              Vicente Aparicio
            </p>
            <p className="text-sm uppercase tracking-widest text-[var(--muted-contrast)]">
              &copy; {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
