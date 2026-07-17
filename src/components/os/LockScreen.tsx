import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useOS } from "@/lib/os-store";
import { Wallpaper } from "./Wallpaper";
import { Lock } from "lucide-react";

export function LockScreen() {
  const { setStage, wallpaper } = useOS();
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-40 cursor-pointer"
        onClick={() => setStage("desktop")}
      >
        <Wallpaper index={wallpaper} />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white">
          <motion.div
            initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            className="text-center"
          >
            <div className="text-8xl md:text-9xl font-extralight tracking-tight tabular-nums">
              {now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </div>
            <div className="text-xl md:text-2xl font-light mt-2 text-white/80">
              {now.toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" })}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            className="mt-24 flex items-center gap-2 px-6 py-3 rounded-full glass animate-pulse"
          >
            <Lock className="w-4 h-4" />
            <span className="text-sm">Click Anywhere to Unlock</span>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
