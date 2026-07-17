import { useEffect, useMemo, useState } from "react";
import { Github, Star, GitFork, Users, BookOpen, ExternalLink, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

const USERNAME = "harsimran-01";

interface GHUser {
  login: string; name: string | null; avatar_url: string; bio: string | null;
  public_repos: number; followers: number; following: number; html_url: string;
  created_at: string; location: string | null;
}
interface GHRepo {
  id: number; name: string; html_url: string; description: string | null;
  stargazers_count: number; forks_count: number; language: string | null;
  fork: boolean; pushed_at: string;
}

export function GitHubStatsApp() {
  const [user, setUser] = useState<GHUser | null>(null);
  const [repos, setRepos] = useState<GHRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const [u, r] = await Promise.all([
          fetch(`https://api.github.com/users/${USERNAME}`).then(r => r.json()),
          fetch(`https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=updated`).then(r => r.json()),
        ]);
        if (u.message) throw new Error(u.message);
        setUser(u); setRepos(Array.isArray(r) ? r : []);
      } catch (e) {
        setErr(e instanceof Error ? e.message : "Failed to load");
      } finally { setLoading(false); }
    })();
  }, []);

  const stats = useMemo(() => {
    const owned = repos.filter(r => !r.fork);
    const stars = owned.reduce((s, r) => s + r.stargazers_count, 0);
    const forks = owned.reduce((s, r) => s + r.forks_count, 0);
    const langCount: Record<string, number> = {};
    owned.forEach(r => { if (r.language) langCount[r.language] = (langCount[r.language] || 0) + 1; });
    const total = Object.values(langCount).reduce((a, b) => a + b, 0) || 1;
    const languages = Object.entries(langCount)
      .sort((a, b) => b[1] - a[1]).slice(0, 6)
      .map(([name, count]) => ({ name, pct: Math.round((count / total) * 100) }));
    const top = [...owned].sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 5);
    return { stars, forks, languages, top, ownedCount: owned.length };
  }, [repos]);

  if (loading) return (
    <div className="h-full flex flex-col items-center justify-center gap-3 text-white/70">
      <Loader2 className="w-8 h-8 animate-spin" />
      <p className="text-sm">Fetching GitHub data…</p>
    </div>
  );
  if (err || !user) return (
    <div className="h-full flex flex-col items-center justify-center gap-2 text-white/70 p-6 text-center">
      <Github className="w-10 h-10 opacity-60" />
      <p className="text-sm">Could not load GitHub data{err ? `: ${err}` : ""}.</p>
      <a href={`https://github.com/${USERNAME}`} target="_blank" rel="noreferrer" className="text-xs text-sky-400 underline">Open profile</a>
    </div>
  );

  const LANG_COLORS: Record<string, string> = {
    JavaScript: "#f7df1e", TypeScript: "#3178c6", Java: "#e76f00", Python: "#3776ab",
    HTML: "#e34c26", CSS: "#563d7c", "C++": "#00599c", C: "#555", Kotlin: "#7f52ff",
    Dart: "#00b4ab", Go: "#00add8", Rust: "#dea584", Shell: "#89e051",
  };

  return (
    <div className="h-full overflow-auto p-5 text-white/90 space-y-5">
      {/* Header */}
      <div className="flex items-center gap-4">
        <img src={user.avatar_url} alt={user.login} className="w-16 h-16 rounded-full ring-2 ring-white/20" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold truncate">{user.name || user.login}</h2>
            <a href={user.html_url} target="_blank" rel="noreferrer" className="text-white/50 hover:text-white">
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
          <p className="text-xs text-white/60 truncate">@{user.login}{user.location ? ` · ${user.location}` : ""}</p>
          {user.bio && <p className="text-xs text-white/70 mt-1 line-clamp-2">{user.bio}</p>}
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { icon: BookOpen, label: "Repositories", value: user.public_repos, color: "text-amber-400" },
          { icon: Star, label: "Stars", value: stats.stars, color: "text-yellow-400" },
          { icon: GitFork, label: "Forks", value: stats.forks, color: "text-emerald-400" },
          { icon: Users, label: "Followers", value: user.followers, color: "text-sky-400" },
        ].map((s, i) => (
          <motion.div key={s.label}
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="rounded-xl bg-white/5 border border-white/10 backdrop-blur p-3">
            <div className="flex items-center gap-2 text-[11px] text-white/60 uppercase tracking-wide">
              <s.icon className={`w-3.5 h-3.5 ${s.color}`} /> {s.label}
            </div>
            <div className="text-2xl font-semibold mt-1">{s.value}</div>
          </motion.div>
        ))}
      </div>

      {/* Languages */}
      <div className="rounded-xl bg-white/5 border border-white/10 p-4">
        <h3 className="text-sm font-medium mb-3">Top Languages</h3>
        <div className="flex h-2 rounded-full overflow-hidden bg-white/5 mb-3">
          {stats.languages.map(l => (
            <div key={l.name} style={{ width: `${l.pct}%`, background: LANG_COLORS[l.name] || "#888" }} />
          ))}
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
          {stats.languages.map(l => (
            <div key={l.name} className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ background: LANG_COLORS[l.name] || "#888" }} />
              <span className="text-white/80">{l.name}</span>
              <span className="text-white/50">{l.pct}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Top repos */}
      <div className="rounded-xl bg-white/5 border border-white/10 p-4">
        <h3 className="text-sm font-medium mb-3">Top Repositories</h3>
        <div className="space-y-2">
          {stats.top.map(r => (
            <a key={r.id} href={r.html_url} target="_blank" rel="noreferrer"
              className="block rounded-lg p-3 bg-white/5 hover:bg-white/10 transition border border-white/5">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-sm font-medium truncate">{r.name}</div>
                  {r.description && <div className="text-xs text-white/60 truncate">{r.description}</div>}
                </div>
                <div className="flex items-center gap-3 text-xs text-white/70 shrink-0">
                  {r.language && <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full" style={{ background: LANG_COLORS[r.language] || "#888" }} />{r.language}
                  </span>}
                  <span className="flex items-center gap-1"><Star className="w-3 h-3" />{r.stargazers_count}</span>
                  <span className="flex items-center gap-1"><GitFork className="w-3 h-3" />{r.forks_count}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
      <p className="text-[10px] text-white/40 text-center">Live from api.github.com</p>
    </div>
  );
}
