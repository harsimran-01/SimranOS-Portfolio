import { motion } from "framer-motion";
import { useOS } from "@/lib/os-store";
import { APP_ICONS } from "./DesktopIcons";
import { Power } from "lucide-react";

export function StartMenu() {
  const { openApp, setStartOpen, setStage } = useOS();
  return (
    <>
      <div className="fixed inset-0 z-40" onClick={() => setStartOpen(false)} />
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ duration: 0.18 }}
        className="absolute bottom-16 left-2 md:left-4 z-50 w-[calc(100vw-1rem)] md:w-[520px] rounded-2xl glass-strong shadow-2xl p-4"
      >
        <div className="mb-3 px-2">
          <div className="text-xs text-muted-foreground">Welcome to</div>
          <div className="text-lg font-semibold">SimranOS</div>
        </div>
        <div className="grid grid-cols-4 md:grid-cols-5 gap-1">
          {APP_ICONS.map(({ id, label, Icon, color }) => (
            <button
              key={id}
              onClick={() => { openApp(id); setStartOpen(false); }}
              className="flex flex-col items-center gap-1 p-3 rounded-xl hover:bg-white/10 transition"
            >
              <Icon className={`w-7 h-7 ${color}`} />
              <span className="text-[11px] text-center leading-tight">{label}</span>
            </button>
          ))}
        </div>
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/10 px-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-pink-500 flex items-center justify-center text-white text-xs font-bold">HK</div>
            <div>
              <div className="text-sm font-medium">Harsimran Kaur</div>
              <div className="text-xs text-muted-foreground">Software Engineer</div>
            </div>
          </div>
          <button onClick={() => { setStartOpen(false); setStage("lock"); }} className="p-2 rounded-lg hover:bg-white/10" aria-label="Lock">
            <Power className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </>
  );
}
