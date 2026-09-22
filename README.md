# Vicente Aparicio — Portfolio

Portfolio personal de Vicente Aparicio, desarrollador Full Stack Junior. Sitio de una sola página con una cabeza 3D interactiva, un carrusel de proyectos con efecto de mazo de cartas y un footer con partículas de código animadas.

## Demo

🔗 **[vicenteaparicio.vercel.app](https://vicenteaparicio.vercel.app/)** — desplegado con Vercel.

## Características

- **Retrato 3D interactivo** (Three.js / React Three Fiber): sigue el cursor, se puede arrastrar para girarlo, y en móvil un toque lo hace girar solo.
- **Carrusel de proyectos** con efecto de mazo de cartas: se navega arrastrando la tarjeta, con los botones ‹ › o con las flechas del teclado.
- **Texto tipo máquina de escribir** en el footer, con el espacio reservado de antemano para que no desplace el contenido al escribirse.
- **Fondo de caracteres de código** animado en canvas, que se apartan al acercar el cursor.
- **Totalmente responsive**, con las secciones alternando fondo claro/oscuro.

## Stack técnico

| Área | Tecnología |
|------|------------|
| Framework | React 19 + TypeScript + Vite |
| Estilos | Tailwind CSS v4 |
| Animaciones | Framer Motion |
| 3D | Three.js + React Three Fiber (`@react-three/fiber`, `@react-three/drei`) |
| Iconos | [Lucide](https://lucide.dev/) |
| Tipografía | Kanit, Space Grotesk, JetBrains Mono (Google Fonts) |
| Lint | Oxlint |

## Estructura del proyecto

```
├── src/
│   ├── components/       # Componentes de cada sección (Hero, About, Projects, Contact...)
│   ├── hooks/             # Hooks compartidos (detección táctil, centrado de modelos 3D...)
│   ├── data/content.ts    # Contenido del sitio (perfil, proyectos, experiencia)
│   ├── assets/media/      # Imágenes, capturas de proyectos y modelos .glb
│   └── index.css          # Variables de tema y estilos globales
├── public/                # Favicon, imagen Open Graph y CV
└── index.html
```

## Paleta

| Token | Hex | Uso |
|-------|-----|-----|
| `--bg` / `--fg-contrast` | `#0c0c0c` | Fondo en modo oscuro / texto sobre fondo claro |
| `--fg` / `--bg-contrast` | `#f2f2f0` / `#ffffff` | Texto sobre fondo oscuro / fondo en modo claro |
| `--muted` | `#8b8b86` | Texto secundario sobre fondo oscuro |
| Degradado de acento | `#7621b0 → #b600a8 → #be4c00` | Botones y detalles destacados |

## Desarrollo

```bash
npm install
npm run dev
```
