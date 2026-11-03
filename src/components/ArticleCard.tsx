import React from 'react';
import { Bookmark, Heart, ArrowUpRight } from 'lucide-react';
import { Article } from '../types/blog';

interface ArticleCardProps {
  article: Article;
  onSelect: (article: Article) => void;
  isBookmarked: boolean;
  onToggleBookmark: (e: React.MouseEvent, article: Article) => void;
  onClap: (e: React.MouseEvent, articleId: string) => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  onSelect,
  isBookmarked,
  onToggleBookmark,
  onClap,
}) => {
  return (
    <article className="group flex flex-col justify-between h-full border-b border-neutral-200 dark:border-neutral-800 pb-8">
      <div>
        {/* Cover Thumbnail */}
        <div
          onClick={() => onSelect(article)}
          className="aspect-4/3 overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 mb-4 cursor-pointer"
        >
          <img
            src={article.coverImage}
            alt={article.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover grayscale contrast-105 group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        </div>

        {/* Clean Unboxed Metadata (Zero-pill rule §1.A) */}
        <div className="flex items-center gap-2 text-xs font-editorial-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2.5">
          <span>{article.category}</span>
          <span aria-hidden="true">·</span>
          <span>{article.readTime}</span>
        </div>

        {/* Title */}
        <h2
          onClick={() => onSelect(article)}
          className="font-editorial-serif text-xl sm:text-2xl font-medium text-neutral-900 dark:text-neutral-100 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors cursor-pointer mb-2.5 leading-snug"
          style={{ textWrap: 'balance' }}
        >
          {article.title}
        </h2>

        {/* Subtitle / Excerpt */}
        <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed font-editorial-sans line-clamp-3 mb-4">
          {article.subtitle}
        </p>
      </div>

      {/* Footer / Byline / Actions */}
      <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center font-editorial-mono text-[10px] text-neutral-800 dark:text-neutral-200">
            {article.author.initials}
          </div>
          <span className="text-xs font-medium text-neutral-800 dark:text-neutral-200 truncate max-w-[120px]">
            {article.author.name}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={(e) => onClap(e, article.id)}
            className="flex items-center gap-1 text-[11px] text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200 px-1.5 py-0.5 rounded transition-colors"
            title="Applaud essay"
          >
            <Heart className="w-3 h-3" />
            <span className="font-editorial-mono tabular-nums">{article.claps}</span>
          </button>

          <button
            onClick={(e) => onToggleBookmark(e, article)}
            className={`p-1.5 rounded transition-colors ${
              isBookmarked
                ? 'text-neutral-900 dark:text-neutral-100 bg-neutral-100 dark:bg-neutral-800'
                : 'text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200'
            }`}
            title={isBookmarked ? 'Remove bookmark' : 'Bookmark essay'}
          >
            <Bookmark className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => onSelect(article)}
            className="p-1.5 text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
            title="Read essay"
          >
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </article>
  );
};
