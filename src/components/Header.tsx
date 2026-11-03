import React from 'react';
import { Bookmark, PenLine, Sun, Moon, Feather, Download } from 'lucide-react';
import { NeutralTheme } from '../types/blog';

interface HeaderProps {
  currentTheme: NeutralTheme;
  onThemeChange: (theme: NeutralTheme) => void;
  onOpenBookmarks: () => void;
  onOpenNewArticle: () => void;
  onOpenColophon: () => void;
  onSelectCategory: (cat: string) => void;
  onNavigateHome: () => void;
  savedCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentTheme,
  onThemeChange,
  onOpenBookmarks,
  onOpenNewArticle,
  onOpenColophon,
  onSelectCategory,
  onNavigateHome,
  savedCount,
}) => {
  return (
    <header className="border-b border-neutral-200 dark:border-neutral-800 bg-white/95 dark:bg-[#121212]/95 backdrop-blur-sm sticky top-0 z-40 transition-colors">
      {/* Editorial Utility Ticker / Issue Strip */}
      <div className="border-b border-neutral-100 dark:border-neutral-800/80 px-4 sm:px-8 py-1.5 text-[11px] font-editorial-mono tracking-wider text-neutral-500 dark:text-neutral-400 flex items-center justify-between">
        <div className="flex items-center gap-2 truncate">
          <span>ISSUE № 48</span>
          <span aria-hidden="true">·</span>
          <span>AUTUMN 2026</span>
          <span aria-hidden="true" className="hidden sm:inline">·</span>
          <span className="hidden sm:inline">AN INQUIRY INTO MATERIAL PERMANENCE</span>
        </div>
        
        {/* Neutral Mode Palette Switcher */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-1 bg-neutral-100 dark:bg-neutral-800/80 p-0.5 rounded text-[10px]">
            <button
              onClick={() => onThemeChange('paper')}
              title="Paper Neutral (Soft Ivory)"
              className={`px-2 py-0.5 rounded transition-all ${
                currentTheme === 'paper'
                  ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 shadow-xs font-medium'
                  : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200'
              }`}
            >
              Paper
            </button>
            <button
              onClick={() => onThemeChange('crisp')}
              title="Gallery Crisp (Pure White & Ink)"
              className={`px-2 py-0.5 rounded transition-all ${
                currentTheme === 'crisp'
                  ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 shadow-xs font-medium'
                  : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200'
              }`}
            >
              Crisp
            </button>
            <button
              onClick={() => onThemeChange('charcoal')}
              title="Charcoal Monolith (Dark Slate)"
              className={`px-2 py-0.5 rounded transition-all ${
                currentTheme === 'charcoal'
                  ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 shadow-xs font-medium'
                  : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200'
              }`}
            >
              Charcoal
            </button>
          </div>

          <button
            onClick={onOpenColophon}
            className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors hidden md:inline"
          >
            About & Manifesto
          </button>

          <a
            href="/folio-journal-project.zip"
            download="folio-journal-project.zip"
            className="flex items-center gap-1 text-neutral-600 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white transition-colors cursor-pointer border border-neutral-300 dark:border-neutral-700 px-2 py-0.5 rounded text-[10px]"
            title="Download full project source code archive as .ZIP"
          >
            <Download className="w-3 h-3" />
            <span>Download ZIP</span>
          </a>
        </div>
      </div>

      {/* Main Top Bar Contract: Zone 1 (Brand) — Zone 2 (4-5 Nav links) — Zone 3 (1 Primary Action) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <button
          onClick={onNavigateHome}
          className="text-left group cursor-pointer focus-visible:outline-hidden"
        >
          <span className="font-editorial-serif text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 transition-colors">
            FOLIO
          </span>
        </button>

        {/* Zone 2: 4-5 Concise Single-Line Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-medium uppercase tracking-widest text-neutral-600 dark:text-neutral-400">
          <button
            onClick={() => onSelectCategory('All')}
            className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            All Essays
          </button>
          <button
            onClick={() => onSelectCategory('Architecture')}
            className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Architecture
          </button>
          <button
            onClick={() => onSelectCategory('Design & Craft')}
            className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Design & Craft
          </button>
          <button
            onClick={() => onSelectCategory('Technology')}
            className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Technology
          </button>
          <button
            onClick={() => onSelectCategory('Philosophy')}
            className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Philosophy
          </button>
        </nav>

        {/* Zone 3: Primary Action & Utilities */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Saved reading list */}
          <button
            onClick={onOpenBookmarks}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white transition-colors cursor-pointer border border-neutral-200 dark:border-neutral-800 rounded-sm"
            title="Saved reading list"
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Saved</span>
            {savedCount > 0 && (
              <span className="font-editorial-mono text-[11px] text-neutral-500 dark:text-neutral-400">
                ({savedCount})
              </span>
            )}
          </button>

          {/* Write / Submit Essay */}
          <button
            onClick={onOpenNewArticle}
            className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-medium tracking-wide text-white bg-neutral-900 dark:bg-neutral-100 dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors rounded-sm cursor-pointer whitespace-nowrap"
          >
            <PenLine className="w-3.5 h-3.5" />
            <span>Write Essay</span>
          </button>
        </div>
      </div>
    </header>
  );
};
