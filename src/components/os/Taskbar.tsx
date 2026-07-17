import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useOS } from "@/lib/os-store";
import { APP_ICONS } from "./DesktopIcons";
import { Search, Wifi, Battery, Sun, Moon } from "lucide-react";
import { StartMenu } from "./StartMenu";

export function Taskbar() {
  const { windows, focusedId, focusWindow, minimizeWindow, openApp, startOpen, setStartOpen, theme, toggleTheme } = useOS();
  const [now, setNow] = useState(new Date());
  useEffect(() => { const t = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(t); }, []);

  return (
    <>
      <AnimatePresence>{startOpen && <StartMenu />}</AnimatePresence>
      <div className="absolute bottom-0 left-0 right-0 h-14 z-50 px-2 flex items-center gap-1 glass-strong border-t border-white/10">
        <button
          onClick={() => setStartOpen(!startOpen)}
          className={`p-2 rounded-lg hover:bg-white/10 transition ${startOpen ? "bg-white/15" : ""}`}
          aria-label="Start"
        >
          <div className="w-6 h-6 rounded-md bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold">S</div>
        </button>
        <button className="p-2 rounded-lg hover:bg-white/10 hidden sm:flex items-center gap-2 text-sm text-muted-foreground min-w-[180px]">
          <Search className="w-4 h-4" /> Search apps...
        </button>

        <div className="flex-1 flex items-center gap-1 overflow-x-auto">
          {windows.map(w => {
            const meta = APP_ICONS.find(a => a.id === w.appId);
            if (!meta) return null;
            const Icon = meta.Icon;
            const active = focusedId === w.id && !w.minimized;
            return (
              <button
                key={w.id}
                onClick={() => (w.minimized || !active ? focusWindow(w.id) : minimizeWindow(w.id))}
                title={w.title}
                className={`relative p-2 rounded-lg hover:bg-white/10 transition ${active ? "bg-white/15" : ""}`}
              >
                <Icon className={`w-5 h-5 ${meta.color}`} />
                <span className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 rounded-full transition-all ${active ? "w-4 bg-primary" : "w-1 bg-white/50"}`} />
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-1 text-xs">
          <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-white/10" aria-label="Toggle theme">
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <div className="p-2 rounded-lg hover:bg-white/10 hidden sm:block"><Wifi className="w-4 h-4" /></div>
          <div className="p-2 rounded-lg hover:bg-white/10 hidden sm:block"><Battery className="w-4 h-4" /></div>
          <button onClick={() => openApp("settings")} className="px-3 py-1.5 rounded-lg hover:bg-white/10 text-right leading-tight">
            <div className="text-sm tabular-nums">{now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</div>
            <div className="text-[10px] text-muted-foreground">{now.toLocaleDateString([], { month: "short", day: "numeric" })}</div>
          </button>
        </div>
      </div>
    </>
  );
}
