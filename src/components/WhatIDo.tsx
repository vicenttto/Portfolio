import { motion } from "framer-motion";

const capabilities = [
  {
    name: "Frontend Development",
    description:
      "Interfaces con React, TypeScript y Tailwind CSS, también en JavaScript vanilla: componentes reutilizables, animaciones (Framer Motion, AOS) y diseño responsivo mobile-first.",
  },
  {
    name: "Backend & APIs",
    description:
      "APIs REST con Java 21 y Spring Boot 3, y también en PHP: autenticación, roles, lógica de negocio y consumo de APIs externas.",
  },
  {
    name: "Bases de Datos",
    description:
      "Modelado de esquemas relacionales en MySQL con JPA/Hibernate: migraciones versionadas con Flyway e integridad referencial con claves foráneas y restricciones CHECK.",
  },
  {
    name: "Integración & Producción",
    description:
      "Despliegue y mantenimiento de aplicaciones en entornos reales de empresa: WooCommerce, configuradores visuales y paneles de gestión.",
  },
];

export default function WhatIDo() {
  return (
    <section
      className="relative z-10 -mt-8 rounded-t-[32px] md:rounded-t-[48px] bg-[var(--bg)] text-[var(--fg)] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.7 }}
        className="font-display text-gradient font-black uppercase leading-none tracking-tight text-center"
        style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
      >
        Lo Que Hago
      </motion.h2>

      <div className="mx-auto max-w-5xl mt-16 sm:mt-20 md:mt-28">
        {capabilities.map((item, i) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="flex items-center gap-6 sm:gap-10 py-8 sm:py-10 md:py-12"
            style={{ borderTop: "1px solid var(--line)" }}
          >
            <span
              className="font-display font-black shrink-0"
              style={{ fontSize: "clamp(3rem, 10vw, 140px)" }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <h3
                className="font-medium uppercase"
                style={{ fontSize: "clamp(1rem, 2.2vw, 2.1rem)" }}
              >
                {item.name}
              </h3>
              <p
                className="font-light leading-relaxed max-w-2xl mt-2 opacity-60"
                style={{ fontSize: "clamp(0.85rem, 1.6vw, 1.25rem)" }}
              >
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
