import { create } from "zustand";

export type AppId =
  | "projects" | "resume" | "skills" | "vscode" | "browser"
  | "assistant" | "gallery" | "contact" | "settings" | "terminal" | "recyclebin"
  | "github" | "leetcode" | "monitor" | "achievements";

export type Ambient = "none" | "rain" | "snow" | "particles";

export interface WindowState {
  id: string;
  appId: AppId;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  minimized: boolean;
  maximized: boolean;
  zIndex: number;
  prev?: { x: number; y: number; width: number; height: number };
}

export type Stage = "boot" | "lock" | "desktop";

interface OSState {
  stage: Stage;
  setStage: (s: Stage) => void;
  windows: WindowState[];
  focusedId: string | null;
  zTop: number;
  wallpaper: number;
  accent: string;
  theme: "dark" | "light";
  animations: boolean;
  startOpen: boolean;
  ambient: Ambient;
  autoDayNight: boolean;
  setAmbient: (a: Ambient) => void;
  setAutoDayNight: (b: boolean) => void;
  setStartOpen: (b: boolean) => void;
  openApp: (appId: AppId) => void;
  closeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  toggleMaximize: (id: string) => void;
  updateWindow: (id: string, patch: Partial<WindowState>) => void;
  setWallpaper: (n: number) => void;
  setAccent: (c: string) => void;
  toggleTheme: () => void;
  setAnimations: (b: boolean) => void;
}

const APP_META: Record<AppId, { title: string; w: number; h: number }> = {
  projects: { title: "Projects", w: 900, h: 600 },
  resume: { title: "Resume", w: 720, h: 640 },
  skills: { title: "Skills", w: 820, h: 560 },
  vscode: { title: "VS Code", w: 900, h: 580 },
  browser: { title: "Browser", w: 880, h: 580 },
  assistant: { title: "AI Assistant", w: 420, h: 540 },
  gallery: { title: "Gallery", w: 820, h: 560 },
  contact: { title: "Contact", w: 560, h: 560 },
  settings: { title: "Settings", w: 640, h: 520 },
  terminal: { title: "Terminal", w: 680, h: 440 },
  recyclebin: { title: "Recycle Bin", w: 640, h: 460 },
  github: { title: "GitHub Stats", w: 820, h: 600 },
  leetcode: { title: "LeetCode Dashboard", w: 820, h: 600 },
  monitor: { title: "System Monitor", w: 780, h: 560 },
  achievements: { title: "Achievement Locker", w: 820, h: 580 },
};

export const useOS = create<OSState>((set, get) => ({
  stage: "boot",
  setStage: (s) => set({ stage: s }),
  windows: [],
  focusedId: null,
  zTop: 10,
  wallpaper: 0,
  accent: "#7c8cff",
  theme: "dark",
  animations: true,
  startOpen: false,
  ambient: "none",
  autoDayNight: false,
  setAmbient: (a) => set({ ambient: a }),
  setAutoDayNight: (b) => set({ autoDayNight: b }),
  setStartOpen: (b) => set({ startOpen: b }),
  openApp: (appId) => {
    const existing = get().windows.find((w) => w.appId === appId);
    if (existing) {
      get().focusWindow(existing.id);
      if (existing.minimized) set({ windows: get().windows.map(w => w.id === existing.id ? { ...w, minimized: false } : w) });
      return;
    }
    const meta = APP_META[appId];
    const z = get().zTop + 1;
    const w = Math.min(meta.w, window.innerWidth - 40);
    const h = Math.min(meta.h, window.innerHeight - 100);
    const id = `${appId}-${Date.now()}`;
    set({
      zTop: z,
      focusedId: id,
      startOpen: false,
      windows: [...get().windows, {
        id, appId, title: meta.title,
        x: Math.max(20, (window.innerWidth - w) / 2 + (Math.random() * 40 - 20)),
        y: Math.max(20, (window.innerHeight - h) / 2 - 30 + (Math.random() * 40 - 20)),
        width: w, height: h, minimized: false, maximized: false, zIndex: z,
      }],
    });
  },
  closeWindow: (id) => set({ windows: get().windows.filter(w => w.id !== id) }),
  focusWindow: (id) => {
    const z = get().zTop + 1;
    set({
      zTop: z, focusedId: id,
      windows: get().windows.map(w => w.id === id ? { ...w, zIndex: z, minimized: false } : w),
    });
  },
  minimizeWindow: (id) => set({
    windows: get().windows.map(w => w.id === id ? { ...w, minimized: true } : w),
  }),
  toggleMaximize: (id) => set({
    windows: get().windows.map(w => {
      if (w.id !== id) return w;
      if (w.maximized && w.prev) return { ...w, ...w.prev, maximized: false, prev: undefined };
      return { ...w, prev: { x: w.x, y: w.y, width: w.width, height: w.height }, x: 0, y: 0, width: window.innerWidth, height: window.innerHeight - 56, maximized: true };
    }),
  }),
  updateWindow: (id, patch) => set({
    windows: get().windows.map(w => w.id === id ? { ...w, ...patch } : w),
  }),
  setWallpaper: (n) => set({ wallpaper: n }),
  setAccent: (c) => {
    document.documentElement.style.setProperty("--primary", c);
    document.documentElement.style.setProperty("--accent", c);
    set({ accent: c });
  },
  toggleTheme: () => {
    const t = get().theme === "dark" ? "light" : "dark";
    document.documentElement.classList.toggle("light", t === "light");
    set({ theme: t });
  },
  setAnimations: (b) => set({ animations: b }),
}));
