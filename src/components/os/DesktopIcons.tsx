import { motion } from "framer-motion";
import { useOS, type AppId } from "@/lib/os-store";
import {
  FolderOpen, FileText, Brain, Code, Globe, MessageSquare,
  Image as ImageIcon, Mail, Settings, Terminal, Trash2, Github, Code2,
  Activity, Trophy,
} from "lucide-react";

interface Icon { id: AppId; label: string; Icon: React.ComponentType<{ className?: string }>; color: string }

export const APP_ICONS: Icon[] = [
  { id: "projects", label: "Projects", Icon: FolderOpen, color: "text-amber-400" },
  { id: "resume", label: "Resume", Icon: FileText, color: "text-sky-400" },
  { id: "skills", label: "Skills", Icon: Brain, color: "text-pink-400" },
  { id: "github", label: "GitHub", Icon: Github, color: "text-white" },
  { id: "leetcode", label: "LeetCode", Icon: Code2, color: "text-orange-400" },
  { id: "monitor", label: "System Monitor", Icon: Activity, color: "text-cyan-300" },
  { id: "achievements", label: "Achievements", Icon: Trophy, color: "text-yellow-400" },
  { id: "vscode", label: "VS Code", Icon: Code, color: "text-blue-400" },
  { id: "browser", label: "Browser", Icon: Globe, color: "text-cyan-400" },
  { id: "assistant", label: "AI Assistant", Icon: MessageSquare, color: "text-violet-400" },
  { id: "gallery", label: "Gallery", Icon: ImageIcon, color: "text-emerald-400" },
  { id: "contact", label: "Contact", Icon: Mail, color: "text-rose-400" },
  { id: "settings", label: "Settings", Icon: Settings, color: "text-slate-300" },
  { id: "terminal", label: "Terminal", Icon: Terminal, color: "text-green-400" },
  { id: "recyclebin", label: "Recycle Bin", Icon: Trash2, color: "text-neutral-300" },
];

export function DesktopIcons() {
  const openApp = useOS(s => s.openApp);
  return (
    <div className="absolute inset-0 p-4 pt-6 pointer-events-none">
      <div className="grid grid-flow-col grid-rows-6 auto-cols-max gap-2 pointer-events-auto">
        {APP_ICONS.map(({ id, label, Icon, color }, i) => (
          <motion.button
            key={id}
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.02 * i }}
            onDoubleClick={() => openApp(id)}
            onClick={(e) => { if (e.detail === 1 && window.innerWidth < 768) openApp(id); }}
            className="group w-20 h-20 flex flex-col items-center justify-center gap-1 rounded-lg hover:bg-white/10 active:bg-white/20 focus:bg-white/15 transition p-2 text-center"
          >
            <Icon className={`w-8 h-8 ${color} drop-shadow-lg group-hover:scale-110 transition-transform`} />
            <span className="text-[11px] text-white leading-tight drop-shadow-md line-clamp-2">{label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
