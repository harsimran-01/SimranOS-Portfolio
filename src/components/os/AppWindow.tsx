import { Rnd } from "react-rnd";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Square, X, Copy } from "lucide-react";
import { useOS, type WindowState } from "@/lib/os-store";
import type { ReactNode } from "react";

interface Props {
  win: WindowState;
  children: ReactNode;
}

export function AppWindow({ win, children }: Props) {
  const { focusWindow, closeWindow, minimizeWindow, toggleMaximize, updateWindow, focusedId } = useOS();
  const focused = focusedId === win.id;

  return (
    <AnimatePresence>
      {!win.minimized && (
        <Rnd
          size={{ width: win.width, height: win.height }}
          position={{ x: win.x, y: win.y }}
          minWidth={360}
          minHeight={240}
          bounds="parent"
          dragHandleClassName="window-drag-handle"
          disableDragging={win.maximized}
          enableResizing={!win.maximized}
          onDragStop={(_, d) => updateWindow(win.id, { x: d.x, y: d.y })}
          onResizeStop={(_e, _dir, ref, _delta, pos) =>
            updateWindow(win.id, {
              width: parseInt(ref.style.width),
              height: parseInt(ref.style.height),
              x: pos.x, y: pos.y,
            })
          }
          onMouseDown={() => focusWindow(win.id)}
          style={{ zIndex: win.zIndex }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className={`w-full h-full rounded-xl overflow-hidden flex flex-col glass-strong shadow-2xl ${focused ? "ring-1 ring-white/20" : "opacity-95"}`}
          >
            <div className="window-drag-handle flex items-center justify-between px-3 h-10 border-b border-white/10 select-none cursor-grab active:cursor-grabbing shrink-0">
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-sm font-medium truncate">{win.title}</span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={(e) => { e.stopPropagation(); minimizeWindow(win.id); }}
                  className="p-1.5 rounded hover:bg-white/10 transition-colors"
                  aria-label="Minimize"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); toggleMaximize(win.id); }}
                  className="p-1.5 rounded hover:bg-white/10 transition-colors"
                  aria-label="Maximize"
                >
                  {win.maximized ? <Copy className="w-3.5 h-3.5" /> : <Square className="w-3 h-3" />}
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); closeWindow(win.id); }}
                  className="p-1.5 rounded hover:bg-red-500/70 transition-colors"
                  aria-label="Close"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-auto">{children}</div>
          </motion.div>
        </Rnd>
      )}
    </AnimatePresence>
  );
}
