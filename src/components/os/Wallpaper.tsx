import { motion } from "framer-motion";

export interface WallpaperDef {
  name: string;
  gradient: string;
  orbs?: Array<{ color: string; opacity: number }>;
  kind?: "day" | "night" | "auto";
}

export const WALLPAPERS: WallpaperDef[] = [
  { name: "Aurora", gradient: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
    orbs: [{ color: "124,140,255", opacity: 0.5 }, { color: "236,72,153", opacity: 0.4 }, { color: "34,211,238", opacity: 0.4 }] },
  { name: "Sunset", gradient: "linear-gradient(135deg, #ff6a3d 0%, #c81b7a 50%, #2b1055 100%)",
    orbs: [{ color: "255,180,120", opacity: 0.4 }, { color: "236,72,153", opacity: 0.4 }] },
  { name: "Ocean", gradient: "linear-gradient(135deg, #0b3d91 0%, #0891b2 50%, #06b6d4 100%)",
    orbs: [{ color: "34,211,238", opacity: 0.5 }, { color: "125,211,252", opacity: 0.4 }] },
  { name: "Forest", gradient: "linear-gradient(135deg, #134e4a 0%, #065f46 50%, #052e16 100%)",
    orbs: [{ color: "34,197,94", opacity: 0.35 }, { color: "16,185,129", opacity: 0.35 }] },
  { name: "Mono", gradient: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #0a0a0a 100%)",
    orbs: [{ color: "255,255,255", opacity: 0.1 }] },
  { name: "Day", kind: "day", gradient: "linear-gradient(180deg, #7dd3fc 0%, #38bdf8 40%, #fef3c7 100%)",
    orbs: [{ color: "254,240,138", opacity: 0.7 }, { color: "255,255,255", opacity: 0.4 }] },
  { name: "Night", kind: "night", gradient: "linear-gradient(180deg, #020617 0%, #0f172a 50%, #1e1b4b 100%)",
    orbs: [{ color: "148,163,184", opacity: 0.15 }, { color: "99,102,241", opacity: 0.3 }] },
];

export function Wallpaper({ index = 0, animated = true }: { index?: number; animated?: boolean }) {
  const wp = WALLPAPERS[index % WALLPAPERS.length];
  const orbs = wp.orbs || [];
  const isNight = wp.kind === "night";

  return (
    <motion.div
      key={wp.name}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}
      className="absolute inset-0 overflow-hidden"
      style={{ background: wp.gradient }}
    >
      {isNight && (
        <div className="absolute inset-0">
          {Array.from({ length: 60 }).map((_, i) => {
            const size = Math.random() * 2 + 0.5;
            return (
              <span key={i} className="absolute rounded-full bg-white"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 70}%`,
                  width: size, height: size,
                  opacity: 0.3 + Math.random() * 0.6,
                  animation: `twinkle ${2 + Math.random() * 4}s ease-in-out ${Math.random() * 3}s infinite`,
                }} />
            );
          })}
          <style>{`@keyframes twinkle { 0%,100% { opacity: 0.2 } 50% { opacity: 1 } }`}</style>
        </div>
      )}
      {animated && orbs.map((orb, i) => {
        const positions = [
          { top: "-10rem", left: "-10rem", size: 600, x: [0, 100, 0], y: [0, 60, 0], dur: 18 },
          { top: "33%", right: "-10rem", size: 500, x: [0, -80, 0], y: [0, -40, 0], dur: 22 },
          { bottom: "-10rem", left: "25%", size: 550, x: [0, 60, 0], y: [0, -60, 0], dur: 25 },
        ][i % 3];
        const { size, x, y, dur, ...pos } = positions;
        return (
          <motion.div key={i}
            className="absolute rounded-full"
            style={{
              ...pos,
              width: size, height: size,
              background: `radial-gradient(circle, rgba(${orb.color},${orb.opacity}), transparent 70%)`,
              filter: "blur(20px)",
            }}
            animate={{ x, y }}
            transition={{ duration: dur, repeat: Infinity, ease: "easeInOut" }}
          />
        );
      })}
    </motion.div>
  );
}
