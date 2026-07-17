import { useState } from "react";
import { motion } from "framer-motion";
// import { Github, ExternalLink, Code2 } from "lucide-react";
import { Github, ExternalLink, Code2, X } from "lucide-react";

const PROJECTS = [
  {
    title: "RetailPulse",
    desc: "Real-time retail analytics platform for inventory tracking, sales forecasting, and store performance dashboards.",
    tech: ["React", "Node.js", "MongoDB", "Chart.js", "Express"],
    github: "https://github.com/harsimran-01/Smart-Retail-Optimization-System", live: "https://retail-ace-main.vercel.app/",
    challenges: "Implemented real-time inventory synchronization with Socket.IO, ensured automatic stock updates after every sale, designed analytics dashboards using MongoDB aggregation pipelines, and integrated JWT authentication with role-based access while maintaining responsive performance across the application.",
    arch: "React + Tailwind frontend → REST APIs & Socket.IO → Express.js backend → JWT Authentication → MongoDB Atlas (Products, Sales, Users) → Analytics using MongoDB Aggregation → AI Insights module → Real-time dashboard updates via WebSockets.",
    screenshots: [
      "/screenshots/retailpulse/dashboard.png",
      "/screenshots/retailpulse/inventory.png",
      "/screenshots/retailpulse/analytics.png",
      "/screenshots/retailpulse/sales.png",
    ],
  },
  {
    title: "Darshan Ease – SmartBridge",

    desc:
      "A smart temple management platform that streamlines online darshan booking, slot management, QR-based entry, parking reservations, prasad ordering, festival updates, and real-time notifications for devotees and temple administrators.",

    tech: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Socket.IO",
      "JWT Authentication",
      "Tailwind CSS"
    ],

    github: "https://github.com/harsimran-01/Darshan-Ease-SmartBridge",
    live: "https://darshan-ease-smart-bridge.vercel.app/",

    challenges:
      "Implemented slot-based booking with capacity validation to prevent overbooking, generated QR codes for secure entry verification, synchronized booking and notification updates using Socket.IO, integrated JWT authentication with role-based access, and designed scalable MongoDB schemas for temples, bookings, festivals, parking, and prasad management.",

    arch:
      "React + Tailwind frontend → Express.js REST APIs → JWT Authentication → MongoDB Atlas (Users, Temples, Slots, Bookings, Parking, Prasad, Festivals, Notifications) → Socket.IO for real-time booking & notification updates → QR Code generation for digital temple entry.",

    screenshots: [
      "/screenshots/darshan/home.png",
      "/screenshots/darshan/booking.png",
      "/screenshots/darshan/dashboard.png",
      "/screenshots/darshan/qr.png",
    ],
  },
  {
    title: "AI Travel Itinerary Planner",

    desc:
      "A full-stack travel planning application that helps users create personalized trip itineraries with destination suggestions, budget planning, weather insights, maps, and day-wise travel schedules through an intuitive interface.",

    tech: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Tailwind CSS",
      "OpenWeather API",
      "Google Maps API"
    ],

    github: "https://github.com/harsimran-01/Travel-Itinerary",
    live: "https://travel-itinerary-red.vercel.app/",

    challenges:
      "Integrated multiple travel-related APIs to generate meaningful itineraries, managed destination and itinerary data efficiently using MongoDB, designed a responsive UI for seamless trip planning, and optimized API requests to reduce loading time while providing a smooth user experience.",

    arch:
      "React + Tailwind frontend → Express.js REST APIs → Travel & Weather APIs → MongoDB Atlas for itinerary storage → Google Maps integration → Dynamic itinerary generation and budget planning.",

    screenshots: [
      "/screenshots/travel/home.png",
      "/screenshots/travel/planner.png",
      "/screenshots/travel/itinerary.png",
      "/screenshots/travel/budget.png",
    ],
  },
  {
    title: "SmartLab AI DSA Visualizer",
    desc: "An interactive DSA learning platform that visualizes algorithms step-by-step with real-time animations, code execution, complexity analysis, quizzes, and an integrated AI assistant for concept explanations.",

    tech: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Node.js",
      "Express",
      "MongoDB",
      "Socket.IO",
      "Piston API"
    ],

    github: "https://github.com/harsimran-01/SmartLab-AI-DSA-Visualizer",
    live: "https://drive.google.com/file/d/1F0KwbcWyIfFLsIKOxT42uYVssA2fELpx/view?usp=sharing",

    challenges:
      "Designed smooth real-time algorithm animations while keeping visualization synchronized with code execution. Integrated the Piston API for compiling multiple programming languages, implemented interactive quizzes, and built an AI-powered assistant capable of explaining DSA concepts and helping users understand algorithm execution step-by-step.",

    arch:
      "React + TypeScript + Tailwind frontend → Algorithm Visualization Engine → Framer Motion Animations → Express.js REST APIs → Piston API for Code Execution → MongoDB for Quiz & User Data → AI Assistant Module → Real-time updates with Socket.IO.",

    screenshots: [
      "https://github.com/user-attachments/assets/676efbcc-3c5c-4ceb-a33d-94b7ef9a3ed1",
      "https://github.com/user-attachments/assets/6a8888a3-13ad-43b5-a7fe-b63fd9d426e8",
      "/screenshots/smartlab/array.png",
      "/screenshots/smartlab/graph.png",
    ],
  },
  {
    title: "Tic-Tac-Toe & Binary Search Visualizer",

    desc:
      "A responsive web application featuring an interactive Tic-Tac-Toe game alongside a Binary Search visualizer that demonstrates the algorithm step-by-step, making learning both engaging and intuitive.",

    tech: [
      "React",
      "JavaScript",
      "HTML5",
      "CSS3",
      "Vite",
      "Tailwind CSS"
    ],

    github: "https://github.com/harsimran-01/Tic-Tac-toe-Binary-Search-Game-",
    live: "https://tic-tac-5zf24aher-harsimran-01s-projects.vercel.app/",

    challenges:
      "Implemented efficient game-state management with automatic win and draw detection, developed an interactive Binary Search visualization with step-by-step execution, and created a responsive interface with smooth user interactions for an engaging learning experience.",

    arch:
      "React + Vite frontend → Component-based UI → Tic-Tac-Toe Game Engine → Binary Search Visualization Module → State Management using React Hooks → Responsive UI with Tailwind CSS.",

    screenshots: [
      "/screenshots/tictactoe/home.png",
      "/screenshots/tictactoe/game.png",
      "/screenshots/tictactoe/binary-search.png",
      "/screenshots/tictactoe/result.png",
    ],
  },
];

const REPOSITORIES = [
  {
    title: "📚 DSA Master Repository",
    github: "https://github.com/harsimran-01/My-DSA-Journey.git",
  },
  {
    title: "🌐 Full Stack Web Development Repository",
    github: "https://github.com/harsimran-01/Sigma-Web-Development.git",
  },
];

export function ProjectsApp() {
  const [selected, setSelected] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const p = PROJECTS[selected];
  return (
    <div className="flex h-full">
      <div className="w-56 border-r border-white/10 p-3 overflow-auto">

  {/* Projects */}
  <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-2">
    Projects
  </h3>

  <div className="space-y-1">
    {PROJECTS.map((pr, i) => (
      <button
        key={pr.title}
        onClick={() => setSelected(i)}
        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition
        ${
          i === selected
            ? "bg-white/15"
            : "hover:bg-white/5"
        }`}
      >
        {pr.title}
      </button>
    ))}
  </div>

  {/* Divider */}
  <div className="my-5 border-t border-white/10" />

  {/* Knowledge Repositories */}
  <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-2">
    Knowledge Repositories
  </h3>

  <div className="space-y-2">

    <a
      href="https://github.com/harsimran-01/My-DSA-Journey.git"
      target="_blank"
      rel="noreferrer"
      className="block rounded-lg px-3 py-2 hover:bg-white/5 text-sm"
    >
      📚 DSA Master Repository
    </a>

    <a
      href="https://github.com/harsimran-01/Sigma-Web-Development.git"
      target="_blank"
      rel="noreferrer"
      className="block rounded-lg px-3 py-2 hover:bg-white/5 text-sm"
    >
      🌐 Full Stack Web Development
    </a>

  </div>
</div>
      <motion.div key={selected} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="flex-1 p-6 overflow-auto">
        <h2 className="text-2xl font-semibold mb-1">{p.title}</h2>
        <p className="text-sm text-muted-foreground mb-4">{p.desc}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {p.tech.map(t => <span key={t} className="px-2 py-1 text-xs rounded-md glass">{t}</span>)}
        </div>
        <div className="flex gap-2 mb-6">
          <a href={p.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass hover:bg-white/15 text-sm">
            <Github className="w-4 h-4" /> GitHub
          </a>
          <a href={p.live} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground hover:opacity-90 text-sm">
            <ExternalLink className="w-4 h-4" /> Live Demo
          </a>
        </div>
        <div className="grid gap-4">
          <section className="glass rounded-xl p-4">
            <h3 className="text-sm font-semibold mb-2 flex items-center gap-2"><Code2 className="w-4 h-4" /> Architecture</h3>
            <p className="text-sm text-muted-foreground font-mono">{p.arch}</p>
          </section>
          <section className="glass rounded-xl p-4">
            <h3 className="text-sm font-semibold mb-2">Challenges Solved</h3>
            <p className="text-sm text-muted-foreground">{p.challenges}</p>
          </section>
          <section className="glass rounded-xl p-4">
            <h3 className="text-sm font-semibold mb-3">Screenshots</h3>

            {p.screenshots ? (
              <div className="grid grid-cols-2 gap-4">
                {p.screenshots.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(image)}
                    className="overflow-hidden rounded-xl border border-white/10 group"
                  >
                    <img
                      src={image}
                      alt={`${p.title} Screenshot ${index + 1}`}
                      className="w-full aspect-video object-cover transition duration-300 group-hover:scale-105"
                    />
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Screenshots coming soon...
              </p>
            )}
          </section>
        </div>
      </motion.div>
      {selectedImage && (
        <div
          className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-sm flex items-center justify-center p-8"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 rounded-full bg-black/60 hover:bg-red-500 p-2 transition"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          <img
            src={selectedImage}
            alt="Project Screenshot"
            onClick={(e) => e.stopPropagation()}
            className="max-w-[95vw] max-h-[90vh] rounded-xl shadow-2xl"
          />
        </div>
      )}
    </div>
  );
}
