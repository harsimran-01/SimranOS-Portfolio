import { motion } from "framer-motion";

const CATEGORIES = [
  { name: "Frontend", icon: "🎨", skills: [
    { n: "React", l: 92 }, { n: "TypeScript", l: 88 }, { n: "Tailwind", l: 90 }, { n: "Next.js", l: 82 },
  ]},
  { name: "Backend", icon: "⚙️", skills: [
    { n: "Node.js", l: 85 }, { n: "Express", l: 82 }, { n: "Spring Boot", l: 75 }, { n: "REST/GraphQL", l: 80 },
  ]},
  { name: "Languages", icon: "💬", skills: [
    { n: "Java", l: 88 }, { n: "JavaScript", l: 90 }, { n: "Python", l: 78 }, { n: "Kotlin", l: 72 },
  ]},
  { name: "Databases", icon: "🗄️", skills: [
    { n: "MongoDB", l: 85 }, { n: "PostgreSQL", l: 80 }, { n: "MySQL", l: 78 }, { n: "Redis", l: 70 },
  ]},
  { name: "Tools", icon: "🛠️", skills: [
    { n: "Git", l: 92 }, { n: "Docker", l: 75 }, { n: "AWS", l: 70 }, { n: "Figma", l: 78 },
  ]},
];

export function SkillsApp() {
  return (
    <div className="p-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {CATEGORIES.map(cat => (
        <div key={cat.name} className="glass rounded-xl p-4">
          <h3 className="text-lg font-semibold mb-3">{cat.icon} {cat.name}</h3>
          <div className="space-y-3">
            {cat.skills.map(s => (
              <div key={s.n}>
                <div className="flex justify-between text-xs mb-1">
                  <span>{s.n}</span><span className="text-muted-foreground">{s.l}%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }} animate={{ width: `${s.l}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-indigo-400 to-pink-400"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
