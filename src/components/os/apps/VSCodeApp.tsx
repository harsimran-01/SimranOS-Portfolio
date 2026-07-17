import { useState } from "react";
import { FileCode, Folder, ChevronDown, ChevronRight } from "lucide-react";

const FILES: Record<string, string> = {
  "About.jsx": `const developer = {
  name: "Harsimran Kaur",
  role: "Software Engineer",
  cgpa: "9.1",
  location: "India",
  skills: ["React", "Java", "Node.js", "MongoDB"],
  passions: ["Clean UI", "System design", "Open source"],
};

export default function About() {
  return <Profile data={developer} />;
}`,
"Projects.jsx": `const projects = [
  {
    name: "RetailPulse",
    stack: ["React", "Node.js", "Express", "MongoDB", "Socket.IO"],
    live: "https://retail-ace-main.vercel.app/",
    github: "https://github.com/harsimran-01/Smart-Retail-Optimization-System",
  },

  {
    name: "Darshan Ease – SmartBridge",
    stack: ["React", "Node.js", "MongoDB", "Socket.IO"],
    live: "https://darshan-ease-smart-bridge.vercel.app/",
    github: "https://github.com/harsimran-01/Darshan-Ease-SmartBridge.git",
  },

  {
    name: "AI Travel Itinerary Planner",
    stack: ["React", "Node.js", "MongoDB", "Gemini AI"],
    live: "https://travel-itinerary-red.vercel.app/",
    github: "https://github.com/harsimran-01/Travel-Itinerary.git",
  },

  {
    name: "SmartLab AI DSA Visualizer",
    stack: ["React", "TypeScript", "Tailwind"],
    github: "https://github.com/harsimran-01/SmartLab-AI-DSA-Visualizer.git",
  },

  {
    name: "Tic-Tac-Toe & Binary Search Visualizer",
    stack: ["React", "JavaScript", "CSS"],
    live: "https://tic-tac-5zf24aher-harsimran-01s-projects.vercel.app/",
    github: "https://github.com/harsimran-01/Tic-Tac-toe-Binary-Search-Game-.git",
  },
];

export default projects;`,

"Repositories.jsx": `const repositories = [
  {
    name: "DSA Master Repository",
    description: "Complete Java DSA from Basics to Advanced with topic-wise solutions and interview questions.",
    tech: ["Java", "DSA", "Algorithms", "LeetCode"],
    github: "https://github.com/harsimran-01/My-DSA-Journey.git",
  },

  {
    name: "Full Stack Web Development",
    description: "Complete web development roadmap including HTML, CSS, JavaScript, React, Node.js, Express and MongoDB.",
    tech: [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "Node.js",
      "Express",
      "MongoDB"
    ],
    github: "https://github.com/harsimran-01/Sigma-Web-Development.git",
  },
];

export default repositories;`,

  "Skills.jsx": `export const skills = {
  frontend:  ["React", "TypeScript", "Tailwind", "Next.js"],
  backend:   ["Node.js", "Express", "Spring Boot"],
  languages: ["Java", "JavaScript", "Python", "Kotlin"],
  databases: ["MongoDB", "PostgreSQL", "MySQL", "Redis"],
  tools:     ["Git", "Docker", "AWS", "Figma"],
};`,
  "Contact.jsx": `export const contact = {
  email:    "harsimran68694@gmail.com",
  github:   "https://github.com/harsimran-01",
  linkedin: "https://www.linkedin.com/in/harsimrankaur0121",
  location: "India",
};`,
};

function highlight(code: string) {
  return code
    .replace(/(\/\/.*)/g, '<span class="text-emerald-400/70">$1</span>')
    .replace(/(".*?")/g, '<span class="text-amber-300">$1</span>')
    .replace(/\b(const|export|default|function|return|import|from)\b/g, '<span class="text-pink-400">$1</span>')
    .replace(/\b(true|false|null)\b/g, '<span class="text-cyan-300">$1</span>');
}

export function VSCodeApp() {
  const [file, setFile] = useState("About.jsx");
  const [open, setOpen] = useState(true);
  return (
    <div className="flex h-full bg-[#1e1e2e] text-sm">
      <div className="w-56 border-r border-white/10 p-2 shrink-0 overflow-auto">
        <div className="text-xs uppercase tracking-wider text-muted-foreground px-2 mb-2">Explorer</div>
        <button onClick={() => setOpen(!open)} className="flex items-center gap-1 px-2 py-1 w-full hover:bg-white/5 rounded">
          {open ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
          <Folder className="w-4 h-4 text-blue-400" />
          <span className="text-xs">portfolio</span>
        </button>
        {open && (
          <div className="pl-3">
            <div className="flex items-center gap-1 px-2 py-1 text-xs text-muted-foreground">
              <ChevronDown className="w-3 h-3" /><Folder className="w-4 h-4 text-blue-400" /> src
            </div>
            <div className="pl-4 space-y-0.5">
              {Object.keys(FILES).map(f => (
                <button key={f} onClick={() => setFile(f)}
                  className={`flex items-center gap-1.5 w-full text-left px-2 py-1 rounded text-xs ${f === file ? "bg-white/15" : "hover:bg-white/5"}`}>
                  <FileCode className="w-3.5 h-3.5 text-yellow-400" />{f}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex items-center border-b border-white/10 shrink-0">
          <div className="px-3 py-2 bg-[#181825] text-xs flex items-center gap-1.5 border-r border-white/10">
            <FileCode className="w-3.5 h-3.5 text-yellow-400" />{file}
          </div>
        </div>
        <pre className="flex-1 overflow-auto p-4 font-mono text-xs leading-6"
          dangerouslySetInnerHTML={{ __html: highlight(FILES[file]) }}
        />
      </div>
    </div>
  );
}
