import React from 'react';
import { Bookmark, ArrowRight } from 'lucide-react';
import { Article } from '../types/blog';

interface ArchiveRowProps {
  article: Article;
  index: number;
  onSelect: (article: Article) => void;
  isBookmarked: boolean;
  onToggleBookmark: (e: React.MouseEvent, article: Article) => void;
}

export const ArchiveRow: React.FC<ArchiveRowProps> = ({
  article,
  index,
  onSelect,
  isBookmarked,
  onToggleBookmark,
}) => {
  const formattedIndex = String(index + 1).padStart(2, '0');

  return (
    <div className="group py-4 border-b border-neutral-200 dark:border-neutral-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-neutral-50/70 dark:hover:bg-neutral-800/40 px-2 -mx-2 transition-colors rounded">
      {/* Index and Category and Title */}
      <div className="flex items-start sm:items-center gap-4 min-w-0">
        <span className="font-editorial-mono text-xs text-neutral-400 dark:text-neutral-500 tabular-nums shrink-0 pt-0.5 sm:pt-0">
          № {formattedIndex}
        </span>

        <div className="min-w-0">
          <div className="flex items-center gap-2 text-[11px] font-editorial-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-1">
            <span>{article.category}</span>
            <span aria-hidden="true">·</span>
            <span>{article.date}</span>
          </div>

          <h3
            onClick={() => onSelect(article)}
            className="font-editorial-serif text-lg sm:text-xl font-medium text-neutral-900 dark:text-neutral-100 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors cursor-pointer truncate"
          >
            {article.title}
          </h3>
        </div>
      </div>

      {/* Metadata & Actions */}
      <div className="flex items-center gap-4 shrink-0 sm:pl-4 self-end sm:self-center">
        <span className="text-xs font-editorial-mono text-neutral-500 dark:text-neutral-400 hidden md:inline">
          {article.readTime}
        </span>

        <span className="text-xs text-neutral-600 dark:text-neutral-400 hidden lg:inline">
          by {article.author.name}
        </span>

        <button
          onClick={(e) => onToggleBookmark(e, article)}
          className={`p-1.5 rounded transition-colors ${
            isBookmarked
              ? 'text-neutral-900 dark:text-neutral-100 bg-neutral-200 dark:bg-neutral-700'
              : 'text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200'
          }`}
          title={isBookmarked ? 'Remove bookmark' : 'Bookmark essay'}
        >
          <Bookmark className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={() => onSelect(article)}
          className="flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white transition-colors"
        >
          <span>Read</span>
          <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
