// import { useEffect, useRef, useState } from "react";
// import { useOS } from "@/lib/os-store";

// const COMMANDS: Record<string, string | (() => string)> = {
//   help: `Available: help, about, skills, projects, resume, github, linkedin, leetcode, contact, theme, clear`,
//   about: `Harsimran Kaur — Software Engineer, CGPA 9.1. Builds premium web/mobile experiences.`,
//   skills: `Frontend: React, TS, Tailwind\nBackend: Node, Express, Spring\nLanguages: Java, JS, Python, Kotlin\nDB: MongoDB, Postgres, MySQL\nTools: Git, Docker, AWS`,
//   projects: `1. RetailPulse\n2. SmartLab DSA Visualizer\n3. Travel Planner\n4. Android Apps\n5. Java Projects`,
//   resume: `Open the Resume app from the desktop, or run: open resume`,
//   github: `https://github.com/harsimran`,
//   linkedin: `https://linkedin.com/in/harsimran`,
//   leetcode: `https://leetcode.com/harsimran`,
//   contact: `email: harsimran68694@gmail.com.com\nlocation: India`,
// };

// export function TerminalApp() {
//   const { toggleTheme } = useOS();
//   const [lines, setLines] = useState<string[]>([
//     "SimranOS Terminal v1.0",
//     "Type 'help' to get started.",
//     "",
//   ]);
//   const [input, setInput] = useState("");
//   const inputRef = useRef<HTMLInputElement>(null);
//   const scrollRef = useRef<HTMLDivElement>(null);

//   useEffect(() => { inputRef.current?.focus(); }, []);
//   useEffect(() => { scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight); }, [lines]);

//   const run = (raw: string) => {
//     const cmd = raw.trim().toLowerCase();
//     if (!cmd) return setLines(l => [...l, "$ "]);
//     if (cmd === "clear") return setLines([]);
//     if (cmd === "theme") { toggleTheme(); return setLines(l => [...l, `$ ${cmd}`, "Theme toggled."]); }
//     const out = COMMANDS[cmd];
//     setLines(l => [...l, `$ ${cmd}`, typeof out === "function" ? out() : out ?? `command not found: ${cmd}`]);
//   };

//   return (
//     <div ref={scrollRef} onClick={() => inputRef.current?.focus()}
//       className="h-full bg-black/80 font-mono text-xs text-green-300 p-3 overflow-auto">
//       {lines.map((l, i) => <pre key={i} className="whitespace-pre-wrap">{l}</pre>)}
//       <div className="flex items-center">
//         <span className="text-emerald-400">simran@os</span>
//         <span className="text-white/50">:~$&nbsp;</span>
//         <input
//           ref={inputRef}
//           value={input}
//           onChange={e => setInput(e.target.value)}
//           onKeyDown={e => {
//             if (e.key === "Enter") { run(input); setInput(""); }
//           }}
//           className="flex-1 bg-transparent outline-none text-green-200 caret-green-300"
//           autoFocus
//         />
//       </div>
//     </div>
//   );
// }


import { useEffect, useRef, useState } from "react";
import { useOS, type AppId } from "@/lib/os-store";

const COMMANDS: Record<string, string | (() => string)> = {
  help: `Available:
help
about
skills
projects
resume
github
linkedin
leetcode
contact
theme
clear
open resume
open browser
open contact
open terminal
open settings
open projects`,

  about:
    "Harsimran Kaur — Software Engineer, CGPA 9.1. Builds premium web/mobile experiences.",

  skills: `Frontend: React, TS, Tailwind
Backend: Node, Express, Spring
Languages: Java, JS, Python, Kotlin
DB: MongoDB, PostgreSQL, MySQL
Tools: Git, Docker, AWS`,

  projects: `1. RetailPulse
2. SmartLab DSA Visualizer
3. Travel Planner
4. Android Apps
5. Java Projects`,

  resume: "Type: open resume",

  github: "https://github.com/harsimran-01",

  linkedin:
    "https://www.linkedin.com/in/harsimrankaur0121",

  leetcode:
    "https://leetcode.com/u/HarsimranDSA",

  contact:
    "Email: harsimran68694@gmail.com\nLocation: India",
};

export function TerminalApp() {
  const { toggleTheme, openApp } = useOS();

  const [lines, setLines] = useState<string[]>([
    "SimranOS Terminal v1.0",
    "Type 'help' to get started.",
    "",
  ]);

  const [input, setInput] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [lines]);

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase();

    if (!cmd) return;

    if (cmd === "clear") {
      setLines([]);
      return;
    }

    if (cmd === "theme") {
      toggleTheme();
      setLines((l) => [...l, "$ theme", "Theme toggled."]);
      return;
    }

    // -------- OPEN COMMANDS --------
    if (cmd.startsWith("open ")) {
      const app = cmd.replace("open ", "") as AppId;

      const validApps: AppId[] = [
        "resume",
        "browser",
        "projects",
        "skills",
        "contact",
        "settings",
        "terminal",
        "gallery",
        "assistant",
        "github",
        "leetcode",
        "monitor",
        "achievements",
        "recyclebin",
        "vscode",
      ];

      if (validApps.includes(app)) {
        openApp(app);

        setLines((l) => [
          ...l,
          `$ ${cmd}`,
          `Opening ${app}...`,
        ]);
      } else {
        setLines((l) => [
          ...l,
          `$ ${cmd}`,
          `Unknown app: ${app}`,
        ]);
      }

      return;
    }

    // -----------------------------

    const output = COMMANDS[cmd];

    setLines((l) => [
      ...l,
      `$ ${cmd}`,
      typeof output === "function"
        ? output()
        : output ?? `command not found: ${cmd}`,
    ]);
  };

  return (
    <div
      ref={scrollRef}
      onClick={() => inputRef.current?.focus()}
      className="h-full bg-black/80 text-green-300 font-mono text-xs overflow-auto p-3"
    >
      {lines.map((line, index) => (
        <pre key={index} className="whitespace-pre-wrap">
          {line}
        </pre>
      ))}

      <div className="flex items-center">
        <span className="text-emerald-400">
          simran@os
        </span>

        <span className="text-white/50">:~$&nbsp;</span>

        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              run(input);
              setInput("");
            }
          }}
          className="flex-1 bg-transparent outline-none text-green-300 caret-green-300"
          autoFocus
        />
      </div>
    </div>
  );
}