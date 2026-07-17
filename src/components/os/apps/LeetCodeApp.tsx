import { useEffect, useMemo, useState } from "react";
import { Code2, Trophy, Flame, Loader2, ExternalLink, Target } from "lucide-react";
import { motion } from "framer-motion";

const USERNAME = "HarsimranDSA";

interface Stats {
  totalSolved: number;
  totalQuestions: number;
  easySolved: number; totalEasy: number;
  mediumSolved: number; totalMedium: number;
  hardSolved: number; totalHard: number;
  ranking: number;
  submissionCalendar?: Record<string, number>;
}
interface Contest {
  contestRating?: number;
  contestGlobalRanking?: number;
  contestAttend?: number;
  contestTopPercentage?: number;
}

export function LeetCodeApp() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [contest, setContest] = useState<Contest | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const s = await fetch(`https://leetcode-api-faisalshohag.vercel.app/${USERNAME}`).then(r => r.json());
        if (!s || s.errors) throw new Error("Profile not found");
        setStats(s);
        try {
          const c = await fetch(`https://alfa-leetcode-api.onrender.com/${USERNAME}/contest`).then(r => r.json());
          setContest(c || null);
        } catch { /* optional */ }
      } catch (e) {
        setErr(e instanceof Error ? e.message : "Failed");
      } finally { setLoading(false); }
    })();
  }, []);

  const streak = useMemo(() => {
    if (!stats?.submissionCalendar) return 0;
    const days = Object.keys(stats.submissionCalendar).map(Number).sort((a, b) => b - a);
    const oneDay = 86400;
    let s = 0, expected = Math.floor(Date.now() / 1000 / oneDay) * oneDay;
    for (const d of days) {
      const dayStart = Math.floor(d / oneDay) * oneDay;
      if (dayStart === expected) { s++; expected -= oneDay; }
      else if (dayStart < expected) break;
    }
    return s;
  }, [stats]);

  if (loading) return (
    <div className="h-full flex flex-col items-center justify-center gap-3 text-white/70">
      <Loader2 className="w-8 h-8 animate-spin" />
      <p className="text-sm">Loading LeetCode stats…</p>
    </div>
  );
  if (err || !stats) return (
    <div className="h-full flex flex-col items-center justify-center gap-2 text-white/70 p-6 text-center">
      <Code2 className="w-10 h-10 opacity-60" />
      <p className="text-sm">Could not load LeetCode data{err ? `: ${err}` : ""}.</p>
      <a href={`https://leetcode.com/u/${USERNAME}/`} target="_blank" rel="noreferrer" className="text-xs text-amber-400 underline">Open profile</a>
    </div>
  );

  const buckets: Array<{ label: string; solved: number; total: number; color: string; ring: string }> = [
    { label: "Easy", solved: stats.easySolved, total: stats.totalEasy, color: "text-emerald-400", ring: "#10b981" },
    { label: "Medium", solved: stats.mediumSolved, total: stats.totalMedium, color: "text-amber-400", ring: "#f59e0b" },
    { label: "Hard", solved: stats.hardSolved, total: stats.totalHard, color: "text-rose-400", ring: "#f43f5e" },
  ];

  const solvedPct = Math.min(100, Math.round((stats.totalSolved / (stats.totalQuestions || 1)) * 100));

  return (
    <div className="h-full overflow-auto p-5 text-white/90 space-y-5">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-400 to-orange-600 grid place-items-center">
          <Code2 className="w-7 h-7 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold">LeetCode</h2>
            <a href={`https://leetcode.com/u/${USERNAME}/`} target="_blank" rel="noreferrer" className="text-white/50 hover:text-white">
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
          <p className="text-xs text-white/60">@{USERNAME} · Rank #{stats.ranking?.toLocaleString?.() ?? "—"}</p>
        </div>
      </div>

      {/* Big ring */}
      <div className="rounded-xl bg-white/5 border border-white/10 p-5 flex items-center gap-6">
        <div className="relative w-32 h-32 shrink-0">
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
            <circle cx="50" cy="50" r="42" stroke="rgba(255,255,255,0.08)" strokeWidth="8" fill="none" />
            <motion.circle
              cx="50" cy="50" r="42" stroke="url(#lcg)" strokeWidth="8" fill="none"
              strokeLinecap="round" strokeDasharray={2 * Math.PI * 42}
              initial={{ strokeDashoffset: 2 * Math.PI * 42 }}
              animate={{ strokeDashoffset: 2 * Math.PI * 42 * (1 - solvedPct / 100) }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
            <defs>
              <linearGradient id="lcg" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#f43f5e" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-2xl font-bold">{stats.totalSolved}</div>
            <div className="text-[10px] text-white/60 uppercase tracking-wider">Solved</div>
          </div>
        </div>
        <div className="flex-1 space-y-2.5">
          {buckets.map(b => {
            const pct = Math.min(100, Math.round((b.solved / (b.total || 1)) * 100));
            return (
              <div key={b.label}>
                <div className="flex justify-between text-xs mb-1">
                  <span className={b.color}>{b.label}</span>
                  <span className="text-white/70">{b.solved} / {b.total}</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.9 }}
                    style={{ background: b.ring }} className="h-full rounded-full"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Extra stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <div className="rounded-xl bg-white/5 border border-white/10 p-3">
          <div className="flex items-center gap-2 text-[11px] text-white/60 uppercase tracking-wide">
            <Trophy className="w-3.5 h-3.5 text-yellow-400" /> Contest Rating
          </div>
          <div className="text-2xl font-semibold mt-1">
            {contest?.contestRating ? Math.round(contest.contestRating) : "—"}
          </div>
          {contest?.contestTopPercentage != null && (
            <div className="text-[10px] text-white/50">Top {contest.contestTopPercentage}%</div>
          )}
        </div>
        <div className="rounded-xl bg-white/5 border border-white/10 p-3">
          <div className="flex items-center gap-2 text-[11px] text-white/60 uppercase tracking-wide">
            <Flame className="w-3.5 h-3.5 text-orange-400" /> Current Streak
          </div>
          <div className="text-2xl font-semibold mt-1">{streak} <span className="text-sm text-white/50">days</span></div>
        </div>
        <div className="rounded-xl bg-white/5 border border-white/10 p-3 col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 text-[11px] text-white/60 uppercase tracking-wide">
            <Target className="w-3.5 h-3.5 text-sky-400" /> Global Rank
          </div>
          <div className="text-2xl font-semibold mt-1">
            {contest?.contestGlobalRanking ? `#${contest.contestGlobalRanking.toLocaleString()}` : `#${stats.ranking?.toLocaleString?.() ?? "—"}`}
          </div>
        </div>
      </div>

      <p className="text-[10px] text-white/40 text-center">Live via community LeetCode APIs</p>
    </div>
  );
}
