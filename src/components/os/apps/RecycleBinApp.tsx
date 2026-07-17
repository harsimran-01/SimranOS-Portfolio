import { Trash2, FileWarning } from "lucide-react";

const ITEMS = [
  { n: "index_old.js", d: "The one with 400 lines of commented-out code" },
  { n: "bug_404.txt", d: "Notes on a bug that was never actually a bug" },
  { n: "failed_design.fig", d: "The gradient purple hero from 2021" },
  { n: "infinite_loop.java", d: "while(true) { /* trust me */ }" },
  { n: "final_final_v3.docx", d: "Not actually final" },
  { n: "resume_backup_2019.pdf", d: "Nostalgia only" },
];

export function RecycleBinApp() {
  return (
    <div className="p-4">
      <div className="flex items-center gap-2 mb-4">
        <Trash2 className="w-5 h-5" />
        <h2 className="text-lg font-semibold">Recycle Bin</h2>
        <span className="text-xs text-muted-foreground ml-2">{ITEMS.length} items</span>
      </div>
      <div className="space-y-1">
        {ITEMS.map(i => (
          <div key={i.n} className="glass rounded-lg px-3 py-2 flex items-center gap-3 hover:bg-white/15">
            <FileWarning className="w-4 h-4 text-amber-400 shrink-0" />
            <div className="min-w-0 flex-1">
              <div className="text-sm font-medium truncate">{i.n}</div>
              <div className="text-xs text-muted-foreground truncate">{i.d}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
