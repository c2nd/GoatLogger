import React from 'react';
import { X, Trash2, ArrowUpRight, BookOpen } from 'lucide-react';
import { Article } from '../types/blog';

interface BookmarksDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedArticles: Article[];
  onSelectArticle: (article: Article) => void;
  onRemoveBookmark: (articleId: string) => void;
  onClearAll: () => void;
}

export const BookmarksDrawer: React.FC<BookmarksDrawerProps> = ({
  isOpen,
  onClose,
  savedArticles,
  onSelectArticle,
  onRemoveBookmark,
  onClearAll,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-neutral-950/40 backdrop-blur-xs transition-opacity"
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md bg-white dark:bg-[#181818] border-l border-neutral-200 dark:border-neutral-800 h-full p-6 sm:p-8 flex flex-col justify-between shadow-2xl z-10 overflow-y-auto">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-neutral-200 dark:border-neutral-800">
            <div>
              <h2 className="font-editorial-serif text-2xl font-medium text-neutral-900 dark:text-neutral-100">
                Personal Reading Archive
              </h2>
              <p className="text-xs font-editorial-mono text-neutral-500 dark:text-neutral-400 mt-1">
                {savedArticles.length} {savedArticles.length === 1 ? 'essay' : 'essays'} preserved for later study
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          {savedArticles.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <BookOpen className="w-8 h-8 mx-auto text-neutral-300 dark:text-neutral-700" />
              <p className="text-sm font-editorial-serif text-neutral-600 dark:text-neutral-400">
                Your reading archive is currently empty.
              </p>
              <p className="text-xs text-neutral-400 dark:text-neutral-500 max-w-xs mx-auto">
                Bookmark essays from the index or while reading to preserve them in this private tray.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {savedArticles.map((article) => (
                <div
                  key={article.id}
                  className="group p-3 border border-neutral-200 dark:border-neutral-800/80 rounded-sm hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors space-y-2"
                >
                  <div className="flex items-center justify-between text-[11px] font-editorial-mono text-neutral-500 dark:text-neutral-400">
                    <span>{article.category}</span>
                    <span>{article.readTime}</span>
                  </div>

                  <h3
                    onClick={() => {
                      onSelectArticle(article);
                      onClose();
                    }}
                    className="font-editorial-serif text-base font-medium text-neutral-900 dark:text-neutral-100 hover:text-neutral-600 dark:hover:text-neutral-300 cursor-pointer line-clamp-2"
                  >
                    {article.title}
                  </h3>

                  <div className="flex items-center justify-between pt-2 border-t border-neutral-100 dark:border-neutral-800 text-xs">
                    <span className="text-neutral-500">by {article.author.name}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onRemoveBookmark(article.id)}
                        className="text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors"
                        title="Remove from saved"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          onSelectArticle(article);
                          onClose();
                        }}
                        className="flex items-center gap-0.5 text-neutral-800 dark:text-neutral-200 hover:underline font-medium text-xs"
                      >
                        <span>Open</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {savedArticles.length > 0 && (
          <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
            <button
              onClick={onClearAll}
              className="text-xs font-editorial-mono text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors"
            >
              Clear Reading List
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-xs uppercase tracking-wider font-medium rounded-sm hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
