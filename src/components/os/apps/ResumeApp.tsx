// import { Download, Printer, ZoomIn, ZoomOut } from "lucide-react";
// import { useState } from "react";

// export function ResumeApp() {
//   const [zoom, setZoom] = useState(1);
//   return (
//     <div className="flex flex-col h-full">
//       <div className="flex items-center gap-2 px-3 py-2 border-b border-white/10">
//         <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass hover:bg-white/15 text-sm">
//           <Download className="w-4 h-4" /> Download
//         </button>
//         <button onClick={() => setZoom(z => Math.min(1.6, z + 0.1))} className="p-1.5 rounded-lg glass hover:bg-white/15"><ZoomIn className="w-4 h-4" /></button>
//         <button onClick={() => setZoom(z => Math.max(0.6, z - 0.1))} className="p-1.5 rounded-lg glass hover:bg-white/15"><ZoomOut className="w-4 h-4" /></button>
//         <button onClick={() => window.print()} className="p-1.5 rounded-lg glass hover:bg-white/15"><Printer className="w-4 h-4" /></button>
//         <span className="text-xs text-muted-foreground ml-auto">{Math.round(zoom*100)}%</span>
//       </div>
//       <div className="flex-1 overflow-auto p-6 bg-black/20">
//         <div className="mx-auto bg-white text-neutral-900 shadow-2xl p-10 origin-top" style={{ width: 700, transform: `scale(${zoom})` }}>
//           <h1 className="text-3xl font-bold">Harsimran Kaur</h1>
//           <p className="text-sm text-neutral-600">Software Engineer · CGPA 9.1</p>
//           <p className="text-sm text-neutral-600 mb-4">harsimran@example.com · linkedin.com/in/harsimran · github.com/harsimran</p>
//           <hr className="my-4" />
//           <h2 className="font-semibold mb-1">Summary</h2>
//           <p className="text-sm mb-4">Software engineer focused on full-stack web, mobile, and developer tools. Loves shipping polished UX with strong engineering fundamentals.</p>
//           <h2 className="font-semibold mb-1">Experience</h2>
//           <ul className="text-sm list-disc pl-5 mb-4 space-y-1">
//             <li>Built RetailPulse — real-time retail analytics, 10k SKUs, WebSocket architecture.</li>
//             <li>Created SmartLab — DSA visualizer used by 3k+ students.</li>
//             <li>Shipped multiple Android apps in Jetpack Compose.</li>
//           </ul>
//           <h2 className="font-semibold mb-1">Skills</h2>
//           <p className="text-sm mb-4">React, TypeScript, Node.js, Java, Kotlin, Python, MongoDB, PostgreSQL, Docker, AWS.</p>
//           <h2 className="font-semibold mb-1">Education</h2>
//           <p className="text-sm">B.Tech in Computer Science — CGPA 9.1</p>
//         </div>
//       </div>
//     </div>
//   );
// }


import {
  Download,
  Printer,
  ZoomIn,
  ZoomOut,
  Maximize2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

import type { PDFDocumentProxy } from "pdfjs-dist";

// PDF Worker (Vite)
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

export function ResumeApp() {
  const [zoom, setZoom] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = (pdf: PDFDocumentProxy) => {
    setNumPages(pdf.numPages);
  };

  const handlePrint = () => {
    const win = window.open("/resume.pdf", "_blank");

    if (win) {
      win.onload = () => {
        win.print();
      };
    }
  };

  const handleFullscreen = () => {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    }
  };

  return (
    <div className="flex flex-col h-full bg-neutral-900">

      {/* Toolbar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-neutral-800">

        {/* Download */}
        <a
          href="/resume.pdf"
          download="Harsimran_Kaur_Resume.pdf"
          className="inline-flex items-center gap-2 px-3 py-2 rounded-lg glass hover:bg-white/10 transition"
        >
          <Download className="w-4 h-4" />
          Download
        </a>

        {/* Zoom Out */}
        <button
          onClick={() => setZoom((z) => Math.max(0.5, z - 0.1))}
          className="p-2 rounded-lg glass hover:bg-white/10 transition"
        >
          <ZoomOut className="w-4 h-4" />
        </button>

        {/* Zoom Percentage */}
        <span className="text-sm text-white w-14 text-center">
          {Math.round(zoom * 100)}%
        </span>

        {/* Zoom In */}
        <button
          onClick={() => setZoom((z) => Math.min(2.5, z + 0.1))}
          className="p-2 rounded-lg glass hover:bg-white/10 transition"
        >
          <ZoomIn className="w-4 h-4" />
        </button>

        {/* Previous Page */}
        <button
          disabled={pageNumber <= 1}
          onClick={() => setPageNumber((p) => p - 1)}
          className="p-2 rounded-lg glass hover:bg-white/10 disabled:opacity-40"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Page Counter */}
        <span className="text-sm text-white">
          {pageNumber} / {numPages || "--"}
        </span>

        {/* Next Page */}
        <button
          disabled={pageNumber >= numPages}
          onClick={() => setPageNumber((p) => p + 1)}
          className="p-2 rounded-lg glass hover:bg-white/10 disabled:opacity-40"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Print */}
        <button
          onClick={handlePrint}
          className="p-2 rounded-lg glass hover:bg-white/10 transition"
        >
          <Printer className="w-4 h-4" />
        </button>

        {/* Fullscreen */}
        <button
          onClick={handleFullscreen}
          className="p-2 rounded-lg glass hover:bg-white/10 transition"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>

      {/* Viewer */}
      <div className="flex-1 overflow-auto bg-neutral-700 p-8">

        <div
          className="flex justify-center"
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: "top center",
            transition: "transform 0.25s ease",
          }}
        >
          <Document
            file="/resume.pdf"
            onLoadSuccess={onDocumentLoadSuccess}
            loading={
              <div className="text-white text-lg p-10">
                Loading Resume...
              </div>
            }
            onLoadError={(error) => {
              console.error(error);
            }}
          >
            <Page
              pageNumber={pageNumber}
              renderAnnotationLayer={false}
              renderTextLayer={false}
            />
          </Document>
        </div>

      </div>
    </div>
  );
}