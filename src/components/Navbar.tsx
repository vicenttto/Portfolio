import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

const links = [
  { label: "Proyectos", href: "#work" },
  { label: "Sobre mí", href: "#about" },
  { label: "Experiencia", href: "#experience" },
  { label: "Contacto", href: "#contact" },
];

function BurgerIcon() {
  return (
    <>
      <span className="h-px w-full bg-white" />
      <span className="h-px w-full bg-white" />
    </>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    const onScroll = () => setAtTop(window.scrollY < window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 px-5 md:px-10 py-6 text-white mix-blend-difference">
        <AnimatePresence mode="wait">
          {atTop ? (
            <motion.nav
              key="links"
              initial={{ opacity: 0, y: -14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
              className="hidden sm:flex items-center justify-between w-full"
            >
              {links.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ opacity: 0.4, transition: { duration: 0.25 } }}
                  transition={{ duration: 0.4, delay: 0.05 + i * 0.06 }}
                  className="text-sm md:text-base lg:text-lg uppercase tracking-wider font-medium"
                >
                  {link.label}
                </motion.a>
              ))}
            </motion.nav>
          ) : (
            <motion.div
              key="burger"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-end"
            >
              <button
                onClick={() => setOpen(true)}
                aria-label="Abrir menú"
                className="cursor-pointer flex flex-col gap-1.5 w-6"
              >
                <BurgerIcon />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {atTop && (
          <button
            onClick={() => setOpen(true)}
            aria-label="Abrir menú"
            className="cursor-pointer sm:hidden absolute right-5 top-6 flex flex-col gap-1.5 w-6"
          >
            <BurgerIcon />
          </button>
        )}
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
            className="fixed inset-0 z-[60] bg-[var(--bg)] flex flex-col"
          >
            <div className="flex items-center justify-end px-5 md:px-10 py-6">
              <button
                onClick={() => setOpen(false)}
                aria-label="Cerrar menú"
                className="cursor-pointer"
              >
                <X size={22} className="text-white" />
              </button>
            </div>

            <nav className="flex-1 flex flex-col items-start justify-center gap-3 px-5 md:px-10">
              {links.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ opacity: 0.4, transition: { duration: 0.25 } }}
                  transition={{ delay: 0.1 + i * 0.06 }}
                  className="font-semibold text-[15vw] sm:text-7xl uppercase leading-none tracking-tight text-white"
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
