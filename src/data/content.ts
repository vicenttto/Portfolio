import murciaHero from "../assets/media/hero.webp";
import murciaEventos from "../assets/media/eventos.webp";
import murciaCapitulos from "../assets/media/capitulos.webp";
import gamedeckHero from "../assets/media/hero2.webp";
import gamedeckJuegos from "../assets/media/juegos.webp";
import gamedeckLanzamientos from "../assets/media/lanzamientos.webp";

export const profile = {
  name: "Vicente Aparicio",
  role: "Full Stack Developer Jr.",
  location: "Alcantarilla, Murcia",
  email: "vicente.ah3@gmail.com",
  github: "https://github.com/Vicenttto",
  linkedin: "https://www.linkedin.com/in/vicente-aparicio",
  cvUrl: "/CV_Vicente_Aparicio.pdf",
};

export const skills = [
  "React",
  "TypeScript",
  "JavaScript",
  "Java",
  "Spring Boot",
  "PHP",
  "MySQL",
  "Tailwind CSS",
  "WooCommerce",
  "Git",
];

export type Project = {
  id: string;
  name: string;
  year: string;
  description: string;
  stack: string[];
  href: string;
  media?: string[];
  mediaFrame?: "dark" | "light";
};

export const projects: Project[] = [
  {
    id: "gamedeck",
    name: "GameDeck",
    year: "2026",
    description:
      "Plataforma web para la gestión de videojuegos, con integración de la API externa de RAWG para la obtención de datos.",
    stack: ["React", "TypeScript", "Java 21", "Spring Boot 3", "MySQL", "RAWG API"],
    href: "https://github.com/vicenttto/GameDeck",
    media: [gamedeckJuegos, gamedeckHero, gamedeckLanzamientos],
    mediaFrame: "light",
  },
  {
    id: "murcia",
    name: "Murcia, Desde Su Sabor",
    year: "2026",
    description:
      "Sitio web multipágina para la promoción turístico-gastronómica del Ayuntamiento de Murcia, con contenido audiovisual de YouTube.",
    stack: ["HTML5", "Tailwind CSS", "JavaScript", "AOS", "PHP"],
    href: "https://github.com/vicenttto/murcia-desde-su-sabor",
    media: [murciaCapitulos, murciaHero, murciaEventos],
  },
];

export const experience = [
  {
    company: "ASF Group",
    role: "Desarrollador Web Full Stack",
    period: "Feb 2026 — Jun 2026",
    description:
      "Configurador visual interactivo (Vanilla JS, Fabric.js) con doble vista y validación DPI. Backend en PHP para WooCommerce: roles B2B con precios dinámicos, caché por rol y guardado de diseños vía AJAX.",
  },
  {
    company: "H&M",
    role: "Tiempo parcial",
    period: "May 2024 — Actualidad",
    description: "Compatibilizado con los estudios de DAW.",
  },
  {
    company: "JD Sports / Lefties",
    role: "Tiempo parcial",
    period: "Nov 2023 — Mar 2024",
    description: "",
  },
  {
    company: "CEIP Vistabella",
    role: "Maestro de Educación Primaria",
    period: "Sep 2020 — Abr 2021",
    description: "",
  },
];
