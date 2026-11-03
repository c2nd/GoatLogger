import React from 'react';
import { X } from 'lucide-react';

interface ColophonModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ColophonModal: React.FC<ColophonModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-neutral-950/50 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#181818] border border-neutral-300 dark:border-neutral-800 rounded-sm shadow-2xl p-6 sm:p-8 z-10 my-8 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-neutral-200 dark:border-neutral-800">
          <div>
            <span className="text-[11px] font-editorial-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
              COLOPHON & MANIFESTO
            </span>
            <h2 className="font-editorial-serif text-3xl font-medium text-neutral-900 dark:text-neutral-100 mt-1">
              About Folio Journal
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6 text-xs sm:text-sm font-editorial-sans text-neutral-700 dark:text-neutral-300 leading-relaxed">
          <div className="space-y-2">
            <h3 className="font-editorial-serif text-lg font-medium text-neutral-900 dark:text-neutral-100">
              I. The Curatorial Premise
            </h3>
            <p>
              Folio was founded on a singular conviction: that the modern internet suffers not from a scarcity of information, but from a catastrophic surplus of sensory noise. By adhering strictly to a monochrome neutral palette—shades of stone, alabaster, raw linen, and carbon ink—we remove cognitive friction and allow ideas to be judged solely by the clarity of their arguments.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-editorial-serif text-lg font-medium text-neutral-900 dark:text-neutral-100">
              II. Typographic Architecture
            </h3>
            <p>
              Headlines are composed in <span className="font-editorial-serif italic font-medium">Cormorant Garamond</span>, a classical high-contrast serif drawn with historic French Renaissance proportions. Body text is set in <span className="font-editorial-sans font-medium">Plus Jakarta Sans</span> for crisp digital readability. Marginalia, figure captions, and catalog indices utilize <span className="font-editorial-mono font-medium">JetBrains Mono</span> with tabular numeral alignment.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-editorial-serif text-lg font-medium text-neutral-900 dark:text-neutral-100">
              III. The Neutral Palette
            </h3>
            <p>
              In accordance with our anti-distraction charter, no bright synthetic colors or marketing badges are permitted. All illustrations are produced as high-contrast documentary photographs, architectural cross-sections, or tactile stoneware studies.
            </p>
          </div>

          <div className="p-4 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-sm space-y-2">
            <h4 className="font-editorial-serif text-base font-semibold text-neutral-900 dark:text-neutral-100 flex items-center justify-between">
              <span>IV. Local Deployment & Source Code</span>
              <a
                href="/folio-journal-project.zip"
                download="folio-journal-project.zip"
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-xs uppercase tracking-wider font-medium rounded-xs hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
              >
                Download .ZIP Archive
              </a>
            </h4>
            <p className="text-xs text-neutral-600 dark:text-neutral-400">
              To run this project on your machine after downloading, extract the ZIP and run:
            </p>
            <pre className="p-2.5 bg-neutral-100 dark:bg-neutral-800/80 rounded-xs font-editorial-mono text-[11px] text-neutral-800 dark:text-neutral-200 select-all overflow-x-auto">
              npm install{"\n"}npm run dev
            </pre>
          </div>

          <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 text-[11px] font-editorial-mono text-neutral-500 dark:text-neutral-400 flex flex-col sm:flex-row justify-between gap-2">
            <span>EDITORIAL BOARD: LONDON · BASEL · KYOTO</span>
            <span>ISSN 2984-1029 · VOLUME XLVIII</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <a
            href="/folio-journal-project.zip"
            download="folio-journal-project.zip"
            className="text-xs font-editorial-mono text-neutral-600 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white underline underline-offset-4"
          >
            Direct download: folio-journal-project.zip
          </a>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-xs uppercase tracking-wider font-medium rounded-sm hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
          >
            Acknowledge & Return
          </button>
        </div>
      </div>
    </div>
  );
};
