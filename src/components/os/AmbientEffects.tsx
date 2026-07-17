import { motion } from "framer-motion";
import { useMemo } from "react";
import type { Ambient } from "@/lib/os-store";

interface Drop { left: number; delay: number; duration: number; length: number; }
interface Flake { left: number; delay: number; duration: number; size: number; drift: number; }
interface Particle { left: number; top: number; delay: number; duration: number; size: number; }

export function AmbientEffects({ mode }: { mode: Ambient }) {
  const rain = useMemo<Drop[]>(() =>
    Array.from({ length: 90 }, () => ({
      left: Math.random() * 100,
      delay: Math.random() * 1.5,
      duration: 0.5 + Math.random() * 0.6,
      length: 60 + Math.random() * 40,
    })), []);
  const snow = useMemo<Flake[]>(() =>
    Array.from({ length: 70 }, () => ({
      left: Math.random() * 100,
      delay: Math.random() * 8,
      duration: 6 + Math.random() * 8,
      size: 2 + Math.random() * 4,
      drift: (Math.random() - 0.5) * 80,
    })), []);
  const particles = useMemo<Particle[]>(() =>
    Array.from({ length: 40 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 6,
      duration: 8 + Math.random() * 10,
      size: 1 + Math.random() * 3,
    })), []);

  if (mode === "none") return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {mode === "rain" && rain.map((d, i) => (
        <motion.span
          key={i}
          className="absolute top-[-10%] w-[1px] bg-gradient-to-b from-transparent via-sky-200/50 to-sky-100/70"
          style={{ left: `${d.left}%`, height: d.length }}
          initial={{ y: "-10%", opacity: 0 }}
          animate={{ y: "110vh", opacity: [0, 1, 1, 0] }}
          transition={{ duration: d.duration, delay: d.delay, repeat: Infinity, ease: "linear" }}
        />
      ))}
      {mode === "snow" && snow.map((f, i) => (
        <motion.span
          key={i}
          className="absolute top-[-5%] rounded-full bg-white/80"
          style={{ left: `${f.left}%`, width: f.size, height: f.size, filter: "blur(0.5px)" }}
          initial={{ y: "-5vh", x: 0, opacity: 0 }}
          animate={{ y: "110vh", x: f.drift, opacity: [0, 1, 1, 0] }}
          transition={{ duration: f.duration, delay: f.delay, repeat: Infinity, ease: "linear" }}
        />
      ))}
      {mode === "particles" && particles.map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-white/60"
          style={{
            left: `${p.left}%`, top: `${p.top}%`,
            width: p.size, height: p.size,
            boxShadow: "0 0 8px rgba(255,255,255,0.6)",
          }}
          animate={{ y: [0, -30, 0], opacity: [0.2, 0.9, 0.2] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
