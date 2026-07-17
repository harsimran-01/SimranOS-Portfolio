import { motion } from "framer-motion";
import { Cpu, Activity, HardDrive, Zap, Code2, Layers, GraduationCap } from "lucide-react";
import { useEffect, useState } from "react";

const STATS = [
  { icon: Layers, label: "Projects", value: 12, color: "#7c8cff" },
  { icon: Code2, label: "Languages", value: 8, color: "#22d3ee" },
  { icon: GraduationCap, label: "CGPA", value: 9.1, color: "#f59e0b", max: 10 },
];

const EXPERIENCE = [
  { label: "Frontend", pct: 90, color: "#7c8cff" },
  { label: "Backend", pct: 75, color: "#22d3ee" },
  { label: "Android", pct: 70, color: "#10b981" },
  { label: "DSA / Java", pct: 88, color: "#f59e0b" },
  { label: "AI / ML", pct: 65, color: "#ec4899" },
];

function useLiveTicker(base: number, jitter = 6, interval = 1400) {
  const [v, setV] = useState(base);
  useEffect(() => {
    const t = setInterval(() => {
      setV(Math.max(3, Math.min(97, base + (Math.random() - 0.5) * jitter * 2)));
    }, interval);
    return () => clearInterval(t);
  }, [base, jitter, interval]);
  return Math.round(v);
}

function LiveBar({ label, base, color, Icon }: { label: string; base: number; color: string; Icon: React.ComponentType<{ className?: string; color?: string }> }) {
  const v = useLiveTicker(base);
  return (
    <div>
      <div className="flex items-center justify-between text-xs mb-1.5">
        <span className="flex items-center gap-2 text-white/80"><Icon className="w-3.5 h-3.5" color={color} />{label}</span>
        <span className="tabular-nums text-white/70">{v}%</span>
      </div>
      <div className="h-2 rounded-full bg-white/5 overflow-hidden">
        <motion.div className="h-full rounded-full" style={{ background: color }}
          animate={{ width: `${v}%` }} transition={{ duration: 1.2, ease: "easeOut" }} />
      </div>
    </div>
  );
}

export function SystemMonitorApp() {
  return (
    <div className="h-full overflow-auto p-5 space-y-5 text-white/90">
      <div>
        <h2 className="text-lg font-semibold">Developer Stats</h2>
        <p className="text-xs text-white/50">Live system utilization — Simran.exe</p>
      </div>

      {/* Big numbers */}
      <div className="grid grid-cols-3 gap-3">
        {STATS.map((s, i) => (
          <motion.div key={s.label}
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className="rounded-xl bg-white/5 border border-white/10 p-4">
            <div className="flex items-center gap-2 text-[11px] text-white/60 uppercase tracking-wide">
              <s.icon className="w-3.5 h-3.5" style={{ color: s.color }} />{s.label}
            </div>
            <div className="text-3xl font-bold mt-1" style={{ color: s.color }}>{s.value}</div>
            {s.max && (
              <div className="mt-2 h-1 rounded-full bg-white/5 overflow-hidden">
                <motion.div className="h-full" style={{ background: s.color }}
                  initial={{ width: 0 }} animate={{ width: `${(s.value / s.max) * 100}%` }} transition={{ duration: 1 }} />
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Live meters */}
      <div className="rounded-xl bg-white/5 border border-white/10 p-4 space-y-3">
        <h3 className="text-sm font-medium mb-1">System Load</h3>
        <LiveBar label="CPU — coding.exe" base={62} color="#7c8cff" Icon={Cpu} />
        <LiveBar label="Memory — ideas.dll" base={48} color="#22d3ee" Icon={Activity} />
        <LiveBar label="Disk — projects/" base={71} color="#f59e0b" Icon={HardDrive} />
        <LiveBar label="Network — learning.io" base={55} color="#ec4899" Icon={Zap} />
      </div>

      {/* Experience bars */}
      <div className="rounded-xl bg-white/5 border border-white/10 p-4">
        <h3 className="text-sm font-medium mb-3">Experience</h3>
        <div className="space-y-3">
          {EXPERIENCE.map((e, i) => (
            <div key={e.label}>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-white/80">{e.label}</span>
                <span className="text-white/60">{e.pct}%</span>
              </div>
              <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                <motion.div className="h-full rounded-full"
                  style={{ background: `linear-gradient(90deg, ${e.color}, ${e.color}aa)` }}
                  initial={{ width: 0 }} animate={{ width: `${e.pct}%` }}
                  transition={{ duration: 1.1, delay: 0.1 * i, ease: "easeOut" }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
