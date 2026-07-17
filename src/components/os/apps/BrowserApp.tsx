import { useState } from "react";
import {
  X,
  Plus,
  ArrowLeft,
  ArrowRight,
  RotateCw,
  Star,
  ExternalLink,
} from "lucide-react";

import {
  FaGithub,
  FaLinkedin,
  FaGlobe,
} from "react-icons/fa";

import { SiLeetcode } from "react-icons/si";

const BOOKMARKS = [
  {
    name: "GitHub",
    url: "https://github.com/harsimran-01",
    color: "from-gray-700 to-gray-900",
    icon: <FaGithub className="text-white text-3xl" />,
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/harsimrankaur0121",
    color: "from-blue-600 to-blue-800",
    icon: <FaLinkedin className="text-white text-3xl" />,
  },
  {
    name: "LeetCode",
    url: "https://leetcode.com/u/HarsimranDSA",
    color: "from-orange-500 to-yellow-500",
    icon: <SiLeetcode className="text-white text-3xl" />,
  },
  {
    name: "Portfolio",
    url: "https://blog.harsimran.dev",
    color: "from-purple-600 to-indigo-700",
    icon: <FaGlobe className="text-white text-3xl" />,
  },
];

export function BrowserApp() {
  const [tabs, setTabs] = useState([
    {
      id: 1,
      title: "New Tab",
      url: "",
    },
  ]);

  const [active, setActive] = useState(1);

  const currentTab = tabs.find((t) => t.id === active)!;

  const openBookmark = (bookmark: (typeof BOOKMARKS)[0]) => {
    setTabs((prev) =>
      prev.map((tab) =>
        tab.id === active
          ? {
              ...tab,
              title: bookmark.name,
              url: bookmark.url,
            }
          : tab
      )
    );

    // Open actual website
    window.open(bookmark.url, "_blank");
  };

  return (
    <div className="flex flex-col h-full bg-[#0f1220] text-white">

      {/* Tabs */}
      <div className="flex items-end gap-1 px-2 pt-2 bg-black/30">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`group flex items-center gap-2 px-3 py-1.5 rounded-t-lg text-xs max-w-[170px]
            ${
              tab.id === active
                ? "bg-white/10"
                : "hover:bg-white/5"
            }`}
          >
            <span className="truncate">{tab.title}</span>

            <X
              className="w-3 h-3 opacity-0 group-hover:opacity-100"
              onClick={(e) => {
                e.stopPropagation();

                const filtered = tabs.filter((t) => t.id !== tab.id);

                if (filtered.length) {
                  setTabs(filtered);
                  setActive(filtered[0].id);
                }
              }}
            />
          </button>
        ))}

        <button
          className="p-1.5 rounded hover:bg-white/10"
          onClick={() => {
            const id = Date.now();

            setTabs([
              ...tabs,
              {
                id,
                title: "New Tab",
                url: "",
              },
            ]);

            setActive(id);
          }}
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Address Bar */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-white/10">

        <ArrowLeft className="w-4 h-4 opacity-40 cursor-pointer hover:opacity-100" />

        <ArrowRight className="w-4 h-4 opacity-40 cursor-pointer hover:opacity-100" />

        <RotateCw className="w-4 h-4 opacity-40 cursor-pointer hover:opacity-100" />

        <div className="flex-1 glass rounded-full px-4 py-1.5 text-xs truncate">
          {currentTab.url || "simranos://new-tab"}
        </div>

        {currentTab.url && (
          <button
            onClick={() => window.open(currentTab.url, "_blank")}
            className="hover:text-blue-400"
          >
            <ExternalLink className="w-4 h-4" />
          </button>
        )}

        <Star className="w-4 h-4 opacity-40" />
      </div>

      {/* Homepage */}
      <div className="flex-1 overflow-auto p-10">

        <h1 className="text-4xl font-light text-center mb-2">
          Simran Browser
        </h1>

        <p className="text-center text-gray-400 mb-10">
          Quick access to my professional profiles
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">

          {BOOKMARKS.map((bookmark) => (
            <button
              key={bookmark.name}
              onClick={() => openBookmark(bookmark)}
              className="glass rounded-2xl p-6 hover:scale-105 transition-all duration-300 hover:shadow-2xl"
            >
              <div
                className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${bookmark.color}
                flex items-center justify-center shadow-lg`}
              >
                {bookmark.icon}
              </div>

              <h3 className="mt-4 font-semibold text-base">
                {bookmark.name}
              </h3>

              <p className="text-xs text-gray-400 mt-1 truncate">
                {bookmark.url.replace("https://", "")}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}