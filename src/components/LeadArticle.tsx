import React from 'react';
import { Bookmark, ArrowUpRight, Clock, Heart } from 'lucide-react';
import { Article } from '../types/blog';

interface LeadArticleProps {
  article: Article;
  onSelect: (article: Article) => void;
  isBookmarked: boolean;
  onToggleBookmark: (e: React.MouseEvent, article: Article) => void;
  onClap: (e: React.MouseEvent, articleId: string) => void;
}

export const LeadArticle: React.FC<LeadArticleProps> = ({
  article,
  onSelect,
  isBookmarked,
  onToggleBookmark,
  onClap,
}) => {
  return (
    <article className="border-b border-neutral-200 dark:border-neutral-800 pb-12 mb-12">
      {/* Category kicker & Salience indicator */}
      <div className="flex items-center justify-between text-xs font-editorial-mono tracking-widest uppercase text-neutral-500 dark:text-neutral-400 mb-3">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-neutral-800 dark:text-neutral-200">COVER ESSAY</span>
          <span aria-hidden="true">·</span>
          <span>{article.category}</span>
          <span aria-hidden="true">·</span>
          <span>{article.readTime}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span>{article.date}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Dominant Headline & Deck - Left column */}
        <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6">
          <div className="space-y-4">
            <h1
              onClick={() => onSelect(article)}
              className="font-editorial-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-neutral-900 dark:text-neutral-50 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors cursor-pointer leading-[1.15]"
              style={{ textWrap: 'balance' }}
            >
              {article.title}
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400 text-base sm:text-lg leading-relaxed font-editorial-sans">
              {article.subtitle}
            </p>
          </div>

          <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 space-y-4">
            {/* Byline */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center font-editorial-mono text-xs font-medium text-neutral-800 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-700">
                  {article.author.initials}
                </div>
                <div>
                  <div className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                    {article.author.name}
                  </div>
                  <div className="text-xs text-neutral-500 dark:text-neutral-400">
                    {article.author.role}
                  </div>
                </div>
              </div>

              {/* Action utilities */}
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => onClap(e, article.id)}
                  className="flex items-center gap-1 text-xs text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200 px-2 py-1 rounded transition-colors"
                  title="Applaud essay"
                >
                  <Heart className="w-3.5 h-3.5" />
                  <span className="font-editorial-mono tabular-nums">{article.claps}</span>
                </button>
                <button
                  onClick={(e) => onToggleBookmark(e, article)}
                  className={`p-1.5 rounded transition-colors ${
                    isBookmarked
                      ? 'text-neutral-900 dark:text-neutral-100 bg-neutral-100 dark:bg-neutral-800'
                      : 'text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200'
                  }`}
                  title={isBookmarked ? 'Remove from saved' : 'Save for later'}
                >
                  <Bookmark className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Read Button */}
            <div>
              <button
                onClick={() => onSelect(article)}
                className="group inline-flex items-center gap-2 px-5 py-2.5 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-xs uppercase tracking-widest font-medium hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors cursor-pointer"
              >
                <span>Read Cover Essay</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Primary Photographic Visual - Right column */}
        <div
          onClick={() => onSelect(article)}
          className="lg:col-span-7 cursor-pointer group space-y-2"
        >
          <div className="aspect-16/9 overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 relative">
            <img
              src={article.coverImage}
              alt={article.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover grayscale contrast-105 group-hover:scale-[1.02] transition-transform duration-500 ease-out"
            />
          </div>
          <figcaption className="text-xs font-editorial-mono text-neutral-500 dark:text-neutral-400 tracking-tight">
            {article.imageCaption}
          </figcaption>
        </div>
      </div>
    </article>
  );
};
