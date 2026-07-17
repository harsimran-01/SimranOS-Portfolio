import { useOS, type Ambient } from "@/lib/os-store";
import { WALLPAPERS } from "../Wallpaper";
import { CloudRain, Snowflake, Sparkles, CircleOff } from "lucide-react";

const ACCENTS = ["#7c8cff", "#ec4899", "#22d3ee", "#10b981", "#f59e0b", "#a78bfa"];

const AMBIENTS: Array<{ id: Ambient; label: string; Icon: React.ComponentType<{ className?: string }> }> = [
  { id: "none", label: "None", Icon: CircleOff },
  { id: "rain", label: "Rain", Icon: CloudRain },
  { id: "snow", label: "Snow", Icon: Snowflake },
  { id: "particles", label: "Particles", Icon: Sparkles },
];

export function SettingsApp() {
  const {
    wallpaper, setWallpaper, accent, setAccent, theme, toggleTheme,
    animations, setAnimations, ambient, setAmbient, autoDayNight, setAutoDayNight,
  } = useOS();

  return (
    <div className="p-6 space-y-6">
      <section>
        <h3 className="text-sm font-semibold mb-3">Wallpaper</h3>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
          {WALLPAPERS.map((w, i) => (
            <button key={w.name} onClick={() => { setAutoDayNight(false); setWallpaper(i); }}
              className={`aspect-video rounded-lg border-2 ${i === wallpaper ? "border-primary" : "border-transparent"} overflow-hidden relative`}
              style={{ background: w.gradient }}>
              <span className="absolute bottom-1 left-1.5 text-[10px] font-medium text-white/90 drop-shadow">{w.name}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="glass rounded-xl p-4 flex items-center justify-between">
        <div>
          <div className="text-sm font-medium">Auto Day / Night</div>
          <div className="text-xs text-muted-foreground">Switches wallpaper by time of day</div>
        </div>
        <button onClick={() => setAutoDayNight(!autoDayNight)}
          className={`w-11 h-6 rounded-full transition ${autoDayNight ? "bg-primary" : "bg-white/20"}`}>
          <div className={`w-5 h-5 rounded-full bg-white transition ${autoDayNight ? "translate-x-5" : "translate-x-0.5"}`} />
        </button>
      </section>

      <section>
        <h3 className="text-sm font-semibold mb-3">Ambient Effects</h3>
        <div className="grid grid-cols-4 gap-2">
          {AMBIENTS.map(a => (
            <button key={a.id} onClick={() => setAmbient(a.id)}
              className={`flex flex-col items-center gap-1.5 py-3 rounded-lg border transition ${
                ambient === a.id ? "border-primary bg-primary/10" : "border-white/10 bg-white/5 hover:bg-white/10"
              }`}>
              <a.Icon className="w-5 h-5" />
              <span className="text-xs">{a.label}</span>
            </button>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-sm font-semibold mb-3">Accent Color</h3>
        <div className="flex gap-3">
          {ACCENTS.map(c => (
            <button key={c} onClick={() => setAccent(c)}
              className={`w-8 h-8 rounded-full ${c === accent ? "ring-2 ring-white ring-offset-2 ring-offset-background" : ""}`}
              style={{ background: c }} />
          ))}
        </div>
      </section>

      <section className="glass rounded-xl p-4 flex items-center justify-between">
        <div>
          <div className="text-sm font-medium">Theme</div>
          <div className="text-xs text-muted-foreground">Currently: {theme}</div>
        </div>
        <button onClick={toggleTheme} className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-sm">Toggle</button>
      </section>

      <section className="glass rounded-xl p-4 flex items-center justify-between">
        <div>
          <div className="text-sm font-medium">Window animations</div>
          <div className="text-xs text-muted-foreground">Smooth open/close motion</div>
        </div>
        <button onClick={() => setAnimations(!animations)}
          className={`w-11 h-6 rounded-full transition ${animations ? "bg-primary" : "bg-white/20"}`}>
          <div className={`w-5 h-5 rounded-full bg-white transition ${animations ? "translate-x-5" : "translate-x-0.5"}`} />
        </button>
      </section>
    </div>
  );
}
