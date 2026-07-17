import { useEffect } from "react";
import { useOS, type AppId } from "@/lib/os-store";
import { Wallpaper } from "./Wallpaper";
import { AmbientEffects } from "./AmbientEffects";
import { DesktopIcons } from "./DesktopIcons";
import { Taskbar } from "./Taskbar";
import { AppWindow } from "./AppWindow";
import { ProjectsApp } from "./apps/ProjectsApp";
import { ResumeApp } from "./apps/ResumeApp";
import { SkillsApp } from "./apps/SkillsApp";
import { VSCodeApp } from "./apps/VSCodeApp";
import { BrowserApp } from "./apps/BrowserApp";
import { AssistantApp } from "./apps/AssistantApp";
import { GalleryApp } from "./apps/GalleryApp";
import { ContactApp } from "./apps/ContactApp";
import { SettingsApp } from "./apps/SettingsApp";
import { TerminalApp } from "./apps/TerminalApp";
import { RecycleBinApp } from "./apps/RecycleBinApp";
import { GitHubStatsApp } from "./apps/GitHubStatsApp";
import { LeetCodeApp } from "./apps/LeetCodeApp";
import { SystemMonitorApp } from "./apps/SystemMonitorApp";
import { AchievementsApp } from "./apps/AchievementsApp";

const RENDERERS: Record<AppId, React.ComponentType> = {
  projects: ProjectsApp, resume: ResumeApp, skills: SkillsApp, vscode: VSCodeApp,
  browser: BrowserApp, assistant: AssistantApp, gallery: GalleryApp, contact: ContactApp,
  settings: SettingsApp, terminal: TerminalApp, recyclebin: RecycleBinApp,
  github: GitHubStatsApp, leetcode: LeetCodeApp,
  monitor: SystemMonitorApp, achievements: AchievementsApp,
};

export function Desktop() {
  const { wallpaper, windows, ambient, autoDayNight, setWallpaper } = useOS();

  // Day/night auto switch: Day wallpaper index 5, Night index 6
  useEffect(() => {
    if (!autoDayNight) return;
    const apply = () => {
      const h = new Date().getHours();
      setWallpaper(h >= 6 && h < 19 ? 5 : 6);
    };
    apply();
    const t = setInterval(apply, 60_000);
    return () => clearInterval(t);
  }, [autoDayNight, setWallpaper]);

  return (
    <div className="fixed inset-0 overflow-hidden">
      <Wallpaper index={wallpaper} />
      <AmbientEffects mode={ambient} />
      <div className="absolute inset-0 pb-14">
        <DesktopIcons />
        {windows.map(w => {
          const Comp = RENDERERS[w.appId];
          return (
            <AppWindow key={w.id} win={w}>
              <Comp />
            </AppWindow>
          );
        })}
      </div>
      <Taskbar />
    </div>
  );
}
