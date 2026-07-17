import { createFileRoute } from "@tanstack/react-router";
import { useOS } from "@/lib/os-store";
import { BootScreen } from "@/components/os/BootScreen";
import { LockScreen } from "@/components/os/LockScreen";
import { Desktop } from "@/components/os/Desktop";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const stage = useOS(s => s.stage);
  return (
    <div className="w-screen h-screen overflow-hidden bg-black text-foreground">
      {stage === "boot" && <BootScreen />}
      {stage === "lock" && <LockScreen />}
      {stage === "desktop" && <Desktop />}
    </div>
  );
}
