import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useOS } from "@/lib/os-store";

const STEPS = [
  "Booting SimranOS...",
  "Loading Developer Profile...",
  "Loading Projects...",
  "System Ready.",
];

export function BootScreen() {
  const setStage = useOS(s => s.setStage);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step < STEPS.length - 1) {
      const t = setTimeout(() => setStep(step + 1), 700);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setStage("lock"), 800);
    return () => clearTimeout(t);
  }, [step, setStage]);

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="mb-10"
      >
        <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-4xl font-bold text-white shadow-2xl">
          S
        </div>
      </motion.div>
      <motion.h1
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        className="text-2xl font-light tracking-wider text-white mb-8"
      >
        SimranOS
      </motion.h1>
      <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden mb-6">
        <motion.div
          className="h-full bg-gradient-to-r from-indigo-400 to-pink-400"
          initial={{ width: 0 }}
          animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      <div className="space-y-1 text-center min-h-[80px]">
        {STEPS.slice(0, step + 1).map((s, i) => (
          <motion.p key={i} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
            className="text-sm text-white/70 font-mono">{s}</motion.p>
        ))}
      </div>
    </div>
  );
}
