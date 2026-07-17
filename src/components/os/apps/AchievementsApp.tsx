import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Lock, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

interface Achievement {
  emoji: string;
  title: string;
  desc: string;
  rarity: "Common" | "Rare" | "Epic" | "Legendary";
  color: string;
}

const ACHIEVEMENTS: Achievement[] = [
  { emoji: "🧠", title: "500+ DSA Problems", desc: "Solved 500+ problems across LeetCode & GFG.", rarity: "Legendary", color: "#f59e0b" },
  { emoji: "🎓", title: "9.1 CGPA", desc: "Maintained top-tier academic performance.", rarity: "Epic", color: "#7c8cff" },
  { emoji: "🛡️", title: "CompTIA Security+", desc: "Certified in cybersecurity fundamentals.", rarity: "Epic", color: "#22d3ee" },
  { emoji: "🤖", title: "AI Internship", desc: "Hands-on experience shipping AI features.", rarity: "Rare", color: "#ec4899" },
  { emoji: "⚡", title: "Hackathon Winner", desc: "Ranked at multiple hackathons.", rarity: "Legendary", color: "#f43f5e" },
  { emoji: "🚀", title: "12+ Projects Shipped", desc: "Full-stack, mobile & AI projects deployed.", rarity: "Rare", color: "#10b981" },
  { emoji: "☕", title: "Java Ninja", desc: "Deep expertise in Java & object-oriented design.", rarity: "Rare", color: "#e76f00" },
  { emoji: "📱", title: "Android Developer", desc: "Native Android apps shipped to Play Store.", rarity: "Common", color: "#84cc16" },
];

export function AchievementsApp() {
  const [unlocked, setUnlocked] = useState<Set<number>>(new Set());
  const [popup, setPopup] = useState<Achievement | null>(null);

  useEffect(() => {
    // Staggered unlock reveal
    ACHIEVEMENTS.forEach((a, i) => {
      setTimeout(() => {
        setUnlocked(prev => new Set(prev).add(i));
        if (i < 3) {
          setPopup(a);
          setTimeout(() => setPopup(p => (p === a ? null : p)), 1800);
        }
      }, 400 + i * 350);
    });
  }, []);

  return (
    <div className="h-full overflow-auto p-5 text-white/90 relative">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-600 grid place-items-center">
          <Trophy className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-lg font-semibold">Achievement Locker</h2>
          <p className="text-xs text-white/60">{unlocked.size} / {ACHIEVEMENTS.length} unlocked</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {ACHIEVEMENTS.map((a, i) => {
          const isUnlocked = unlocked.has(i);
          return (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="relative rounded-xl p-4 border overflow-hidden"
              style={{
                background: isUnlocked
                  ? `linear-gradient(135deg, ${a.color}22, transparent)`
                  : "rgba(255,255,255,0.03)",
                borderColor: isUnlocked ? `${a.color}55` : "rgba(255,255,255,0.08)",
              }}
            >
              {isUnlocked && (
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  initial={{ opacity: 1 }} animate={{ opacity: 0 }} transition={{ duration: 1.2 }}
                  style={{ background: `radial-gradient(circle at 50% 50%, ${a.color}55, transparent 60%)` }}
                />
              )}
              <div className="relative flex items-start gap-3">
                <motion.div
                  animate={isUnlocked ? { rotate: [0, -10, 10, 0], scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 0.7 }}
                  className={`text-3xl grid place-items-center w-12 h-12 rounded-lg ${isUnlocked ? "" : "grayscale opacity-40"}`}
                  style={{ background: isUnlocked ? `${a.color}22` : "rgba(255,255,255,0.05)" }}
                >
                  {isUnlocked ? a.emoji : <Lock className="w-5 h-5 text-white/40" />}
                </motion.div>
                <div className="min-w-0">
                  <div className={`text-sm font-semibold ${isUnlocked ? "" : "text-white/40"}`}>
                    {isUnlocked ? a.title : "Locked"}
                  </div>
                  <div className="text-[11px] mt-0.5 line-clamp-2" style={{ color: isUnlocked ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.3)" }}>
                    {isUnlocked ? a.desc : "Keep exploring…"}
                  </div>
                  {isUnlocked && (
                    <span className="inline-block mt-2 text-[10px] px-2 py-0.5 rounded-full font-medium"
                      style={{ background: `${a.color}33`, color: a.color }}>
                      {a.rarity}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Unlock toast */}
      <AnimatePresence>
        {popup && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", damping: 18, stiffness: 220 }}
            className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl border shadow-2xl"
            style={{
              background: `linear-gradient(135deg, ${popup.color}44, rgba(20,20,30,0.9))`,
              borderColor: `${popup.color}66`,
              backdropFilter: "blur(20px)",
            }}
          >
            <Sparkles className="w-5 h-5" style={{ color: popup.color }} />
            <div>
              <div className="text-[10px] uppercase tracking-widest" style={{ color: popup.color }}>Achievement Unlocked</div>
              <div className="text-sm font-semibold">{popup.emoji} {popup.title}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
