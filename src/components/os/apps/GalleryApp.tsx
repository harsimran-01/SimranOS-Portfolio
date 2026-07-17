import { ExternalLink, Github, Award } from "lucide-react";

const ITEMS = [
  {
    t: "RetailPulse Dashboard",
    cat: "Project",
    grad: "from-indigo-500 to-purple-600",
    image: "/screenshots/retailpulse/dashboard.png",
    demo: "https://retail-ace-main.vercel.app/",
    github: "https://github.com/harsimran-01/Smart-Retail-Optimization-System",
    tech: ["React", "Node.js", "MongoDB"]
  },

  {
    t: "Darshan Ease – SmartBridge",
    cat: "Project",
    grad: "from-pink-500 to-rose-600",
    image: "/screenshots/darshan/home.png",
    demo: "https://darshan-ease-smart-bridge.vercel.app/",
    github: "https://github.com/harsimran-01/Darshan-Ease-SmartBridge",
    tech: ["React", "TypeScript"]
  },
  {
    t: "AI Travel Itinerary Planner",
    cat: "Project",
    grad: "from-pink-500 to-rose-600",
    image: "/screenshots/travel/home.png",
    demo: "https://travel-itinerary-red.vercel.app/",
    github: "https://github.com/harsimran-01/Travel-Itinerary",
    tech: ["React", "TypeScript"]
  },
  {
    t: "Tic-Tac-Toe & Binary Search Visualizer",
    cat: "Project",
    grad: "from-pink-500 to-rose-600",
    image: "/screenshots/tictactoe/home.png",
    demo: "https://tic-tac-5zf24aher-harsimran-01s-projects.vercel.app/",
    github: "https://github.com/harsimran-01/Tic-Tac-toe-Binary-Search-Game-",
    tech: ["React", "TypeScript"]
  },

  {
    t: "SmartLab Visualizer",
    cat: "Project",
    grad: "from-pink-500 to-rose-600",
    image: "https://github.com/user-attachments/assets/676efbcc-3c5c-4ceb-a33d-94b7ef9a3ed1",
    demo: "https://drive.google.com/file/d/1F0KwbcWyIfFLsIKOxT42uYVssA2fELpx/view?usp=sharing",
    github: "https://github.com/harsimran-01/SmartLab-AI-DSA-Visualizer",
    tech: ["React", "TypeScript"]
  },

  {
  t: "📚 DSA Master Repository",
  cat: "Repository",
  grad: "from-green-500 to-emerald-600",
  github: "https://github.com/harsimran-01/My-DSA-Journey.git",
  tech: ["Java", "DSA", "Algorithms"]
},

{
  t: "🌐 Full Stack Web Development Repository",
  cat: "Repository",
  grad: "from-blue-500 to-cyan-600",
  github: "https://github.com/harsimran-01/Sigma-Web-Development.git",
  tech: ["React", "Node.js", "MongoDB"]
},
{
  t: "Full Stack Web Development Training",
  cat: "Certificate",
  grad: "from-purple-500 to-indigo-600",
  certificate:
    "https://drive.google.com/file/d/1km-GWNaM-0hc-cjD5yZypCQ0LjAPr2DI/view?usp=sharing",
  tech: ["Full Stack", "React", "Node.js", "MongoDB"]
},

{
  t: "Intel AI For Future Workforce Program",
  cat: "Certificate",
  grad: "from-blue-500 to-cyan-600",
  certificate:
    "https://drive.google.com/file/d/1oPw1dOafe7vGQBemDDEpXtzqydf1s7bA/view?usp=sharing",
  tech: ["AI", "Machine Learning"]
},

{
  t: "Infosys Springboard Database and SQL",
  cat: "Certificate",
  grad: "from-emerald-500 to-teal-600",
  certificate:
    "https://drive.google.com/file/d/126TfyNqr-u52A-VXykOsY3Y4-1fDEbD9/view?usp=sharing",
  tech: ["Project Based Learning"]
},

{
  t: "SmartBridge Certification",
  cat: "Certificate",
  grad: "from-pink-500 to-rose-600",
  certificate:
    "https://drive.google.com/file/d/1SJmps2b7HI1cpyyscRsccaQXI2erpxkO/view?usp=sharing",
  tech: ["Training", "Development"]
},

{
  t: "CompTIA Security+ Certification",
  cat: "Certificate",
  grad: "from-red-500 to-orange-600",
  certificate:
    "https://drive.google.com/file/d/1P1eLP2wtbX6_LqQqew5QD_0mRdqE6THV/view?usp=sharing",
  tech: ["Cyber Security", "Security Fundamentals"]
},

{
  t: "AWS Academy Graduate - Generative AI Foundations",
  cat: "Certificate",
  grad: "from-orange-500 to-yellow-600",
  certificate:
    "https://drive.google.com/file/d/1TarBqDJigJsKs0-Q07rkxSFoFQp2RqaA/view?usp=sharing",
  tech: ["AWS", "Generative AI"]
},

{
  t: "Android Development with Kotlin",
  cat: "Certificate",
  grad: "from-green-500 to-lime-600",
  certificate:
    "https://drive.google.com/file/d/1VhywZsljgZiy2BUdu8TByZJsxiiGVby5/view?usp=sharing",
  tech: ["Android", "Kotlin", "Jetpack Compose"]
},
];

export function GalleryApp() {
  return (
    <div className="p-4 grid grid-cols-2 md:grid-cols-3 gap-3">
      {ITEMS.map(i => (

        <div
          key={i.t}
          className="group rounded-xl overflow-hidden glass hover:scale-[1.03] transition"
        >

          <div className="aspect-video overflow-hidden">

            {
              i.image ? (
                <a
                  href={i.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={i.image}
                    alt={i.t}
                    className="w-full h-full object-cover cursor-pointer hover:scale-105 transition"
                  />
                </a>
              ) : (
                <div
                  className={`aspect-video bg-gradient-to-br ${i.grad} flex items-center justify-center text-white`}
                >
                  {i.t}
                </div>
              )
            }

          </div>


          <div className="p-3">

            <h3 className="font-medium">
              {i.t}
            </h3>

            <p className="text-xs text-muted-foreground">
              {i.cat}
            </p>



            <div className="flex gap-2 mt-3">

              {
                i.demo &&
                <a
                  href={i.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs px-3 py-1 rounded-lg bg-primary text-white flex items-center gap-1 hover:opacity-90"
                >
                  <ExternalLink size={12} />
                  Demo
                </a>
              }


              {
                i.github &&
                <a
                  href={i.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs px-3 py-1 rounded-lg glass flex items-center gap-1 hover:bg-white/10"
                >
                  <Github size={12} />
                  Code
                </a>
              }


              {
                i.certificate &&
                <a
                  href={i.certificate}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs px-3 py-1 rounded-lg glass flex items-center gap-1 hover:bg-white/10"
                >
                  <Award size={12} />
                  Certificate
                </a>
              }

            </div>


          </div>

        </div>

      ))}
    </div>
  );
}
