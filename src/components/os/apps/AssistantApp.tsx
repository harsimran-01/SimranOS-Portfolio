import { useState } from "react";
import { Send, Bot, User } from "lucide-react";

const CANNED: { q: RegExp; a: string }[] = [
  // Greetings
  {
    q: /^(hi|hello|hey|hii)$/i,
    a: "Hi 👋 Welcome to SimranOS! I'm your AI assistant. Ask me about Harsimran's projects, skills, education, repositories, resume or achievements.",
  },

  // About
  {
    q: /who is harsimran|about harsimran|tell me about harsimran|introduce harsimran/i,
    a: "Harsimran Kaur is a Computer Science Engineering student (CGPA 9.1) passionate about Full Stack Development, Java, DSA and AI-powered applications. She enjoys building modern software with beautiful user experiences.",
  },

  // Education
  {
    q: /education|college|cgpa/i,
    a: "🎓 Chandigarh Group of Colleges (CGC), Jhanjeri\nB.Tech Computer Science Engineering\nCGPA: 9.1/10",
  },

  // Skills
  {
     q: /skill|technolog(y|ies)|stack|language(s)?|tech/i,
    a: `Frontend:
• React
• TypeScript
• Tailwind CSS

Backend:
• Node.js
• Express.js

Languages:
• Java
• JavaScript
• Python
• Kotlin

Database:
• MongoDB
• MySQL

Tools:
• Git
• GitHub
• Docker
• VS Code`,
  },

  // RetailPulse
  {
    q: /retailpulse|retail/i,
    a: "RetailPulse is a Smart Retail Optimization System developed using React, Node.js, Express, MongoDB and Socket.IO. It provides inventory management, analytics dashboards, real-time stock synchronization, JWT authentication and AI-powered business insights.",
  },

  // SmartLab
  {
    q: /smartlab|dsa visualizer/i,
    a: "SmartLab AI DSA Visualizer is an interactive learning platform built using React and TypeScript that visualizes sorting, searching and graph algorithms with step-by-step animations.",
  },

  // Travel Planner
  {
    q: /travel|itinerary/i,
    a: "AI Travel Itinerary Planner generates personalized travel plans with budgeting, destinations and AI-assisted recommendations using React and Node.js.",
  },

  // Darshan Ease
  {
    q: /darshan|temple|smartbridge/i,
    a: "Darshan Ease SmartBridge is a temple management platform that supports online darshan booking, QR verification, slot management, notifications, parking management and real-time updates.",
  },

  // Tic Tac Toe
  {
    q: /tic|binary search/i,
    a: "A fun educational project featuring Tic-Tac-Toe and Binary Search visualization built using React and JavaScript.",
  },

  // DSA Repository
  {
    q: /dsa repo|dsa repository|repository dsa/i,
    a: "The DSA Master Repository contains topic-wise Java implementations covering Arrays, Strings, Linked Lists, Trees, Graphs, Dynamic Programming, Backtracking, Greedy Algorithms and many interview problems from basic to advanced.",
  },

  // Web Repo
  {
    q: /web repo|web development repository|mern/i,
    a: "The Full Stack Web Development Repository contains complete learning resources and projects built using HTML, CSS, JavaScript, React, Node.js, Express and MongoDB from beginner to advanced.",
  },

  // Resume
  {
    q: /resume|cv/i,
    a: "You can open the Resume application from the desktop to view or download Harsimran's latest resume.",
  },

  // GitHub
  {
    q: /github/i,
    a: "GitHub: https://github.com/harsimran-01",
  },

  // LinkedIn
  {
    q: /linkedin/i,
    a: "LinkedIn: https://www.linkedin.com/in/harsimrankaur0121/",
  },

  // LeetCode
  {
    q: /leetcode/i,
    a: "Harsimran regularly practices Data Structures & Algorithms on LeetCode and other coding platforms to strengthen problem-solving skills.",
  },

  // Achievements
  {
    q: /achievement|award|certificate/i,
    a: "Achievements include solving hundreds of DSA problems, building multiple full-stack applications, maintaining a strong academic record (CGPA 9.1), and participating in AI, Android and Web Development projects.",
  },

  // Experience
  {
    q: /experience|internship/i,
    a: "Harsimran has worked on multiple real-world full-stack applications involving React, Node.js, MongoDB, Socket.IO, AI integration and Android Development.",
  },

  // Contact
  {
    q: /contact|email|reach/i,
    a: `📧 harsimran68694@gmail.com

GitHub:
https://github.com/harsimran-01

LinkedIn:
https://www.linkedin.com/in/harsimrankaur0121/`,
  },

  // Thanks
  {
    q: /thanks|thank you/i,
    a: "You're welcome! 😊 Feel free to ask anything about Harsimran's portfolio.",
  },
];

export function AssistantApp() {
  const [msgs, setMsgs] = useState<{ role: "user" | "bot"; text: string }[]>([
    { role: "bot", text: "Hi 👋 I'm your guide to SimranOS. Ask me anything about Harsimran's work." },
  ]);
  const [input, setInput] = useState("");

  const send = () => {
  if (!input.trim()) return;

  const question = input.trim();

  const match = CANNED.find((c) => c.q.test(question));

  const reply =
    match?.a ??
    `I don't have an exact answer for "${question}" yet.

Try asking about:
• Projects
• Skills
• Education
• GitHub
• LeetCode
• Resume
• DSA Repository
• Web Development Repository
• Contact`;

  setMsgs((m) => [
    ...m,
    { role: "user", text: question },
    { role: "bot", text: reply },
  ]);

  setInput("");
};

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto p-4 space-y-3">
        {msgs.map((m, i) => (
          <div key={i} className={`flex gap-2 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
            <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${m.role === "user" ? "bg-primary text-primary-foreground" : "glass"}`}>
              {m.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>
            <div className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm ${m.role === "user" ? "bg-primary text-primary-foreground" : "glass"}`}>
              {m.text}
            </div>
          </div>
        ))}
      </div>
      <div className="p-3 border-t border-white/10 flex gap-2">
        <input value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && send()}
          placeholder="Ask about projects, skills, resume..."
          className="flex-1 px-3 py-2 rounded-xl glass text-sm outline-none focus:ring-1 focus:ring-primary" />
        <button onClick={send} className="p-2 rounded-xl bg-primary text-primary-foreground hover:opacity-90">
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
