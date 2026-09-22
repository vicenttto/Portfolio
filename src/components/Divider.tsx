import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import retroComputerIcon from "../assets/media/retro-computer-icon.png";
import retroIeIcon from "../assets/media/retro-ie-icon.png";
import retroFloppyIcon from "../assets/media/retro-floppy-icon.png";
import retroNetworkIcon from "../assets/media/retro-network-icon.png";
import retroCameraIcon from "../assets/media/retro-camera-icon.png";
import retroRecycleBinIcon from "../assets/media/retro-recycle-bin-icon.png";
import retroFolderIcon from "../assets/media/retro-folder-icon.png";
import retroSearchIcon from "../assets/media/retro-search-icon.png";
import retroSoundIcon from "../assets/media/retro-sound-icon.png";
import retroUsersIcon from "../assets/media/retro-users-icon.png";

type MarqueeItem = {
  id: string;
  src: string;
  alt: string;
};

const icons: MarqueeItem[] = [
  { id: "computer", src: retroComputerIcon, alt: "Icono clásico de Mi PC" },
  { id: "ie", src: retroIeIcon, alt: "Icono clásico de Internet Explorer" },
  { id: "floppy", src: retroFloppyIcon, alt: "Disquete de 3,5 pulgadas" },
  { id: "network", src: retroNetworkIcon, alt: "Globo terráqueo de red" },
  { id: "camera", src: retroCameraIcon, alt: "Cámara de fotos" },
  { id: "recycle", src: retroRecycleBinIcon, alt: "Papelera de reciclaje" },
  { id: "folder", src: retroFolderIcon, alt: "Carpeta clásica de Windows" },
  { id: "search", src: retroSearchIcon, alt: "Icono de búsqueda de archivos" },
  { id: "sound", src: retroSoundIcon, alt: "Icono de sonido del sistema" },
  { id: "users", src: retroUsersIcon, alt: "Icono de usuarios" },
];

function wrap(min: number, max: number, v: number) {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
}

const COPIES = 8;
const WRAP_MIN = -(100 / COPIES);
const track = Array.from({ length: COPIES }, () => icons).flat();

export default function Divider() {
  const { scrollY } = useScroll();
  const smoothScrollY = useSpring(scrollY, {
    stiffness: 100,
    damping: 20,
    mass: 0.8,
  });

  const x = useTransform(
    smoothScrollY,
    (v) => `${wrap(WRAP_MIN, 0, v * -0.014)}%`
  );

  return (
    <div className="relative w-full pt-6 sm:pt-8 md:pt-10 pb-[3.5rem] sm:pb-16 md:pb-[4.5rem] bg-[var(--bg)] overflow-hidden">
      <motion.div className="flex w-max" style={{ x }}>
        {track.map((item, i) => (
          <div
            key={`${item.id}-${i}`}
            className="mx-2 sm:mx-2.5 h-[19vh] sm:h-[21vh] md:h-[23vh] aspect-square shrink-0 rounded-2xl border border-[var(--line)] bg-[var(--bg-soft)] flex items-center justify-center p-4 sm:p-5 md:p-5"
          >
            <img
              src={item.src}
              alt={item.alt}
              draggable={false}
              className="h-full w-full object-contain"
              style={{ imageRendering: "pixelated" }}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
