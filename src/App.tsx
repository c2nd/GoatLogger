import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  SlidersHorizontal, 
  ArrowUpDown, 
  BookOpen, 
  Sparkles,
  Archive,
  Compass,
  ArrowRight
} from 'lucide-react';

import { Article, Category, Comment, NeutralTheme } from './types/blog';
import { INITIAL_ARTICLES, INITIAL_COMMENTS } from './data/articles';
import { Header } from './components/Header';
import { LeadArticle } from './components/LeadArticle';
import { ArticleCard } from './components/ArticleCard';
import { ArchiveRow } from './components/ArchiveRow';
import { ArticleDetail } from './components/ArticleDetail';
import { BookmarksDrawer } from './components/BookmarksDrawer';
import { SubmitArticleModal } from './components/SubmitArticleModal';
import { NewsletterSection } from './components/NewsletterSection';
import { ColophonModal } from './components/ColophonModal';
import { Toast } from './components/Toast';

export default function App() {
  // Theme state: paper (warm alabaster), crisp (stark gallery white), charcoal (dark slate)
  const [theme, setTheme] = useState<NeutralTheme>(() => {
    const saved = localStorage.getItem('folio_theme') as NeutralTheme | null;
    return saved || 'paper';
  });

  // Articles state
  const [articles, setArticles] = useState<Article[]>(() => {
    const saved = localStorage.getItem('folio_articles');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved articles', e);
      }
    }
    return INITIAL_ARTICLES;
  });

  // Bookmarks state (list of article IDs)
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('folio_bookmarks');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse bookmarks', e);
      }
    }
    return ['art-1'];
  });

  // Comments state
  const [comments, setComments] = useState<Comment[]>(() => {
    const saved = localStorage.getItem('folio_comments');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse comments', e);
      }
    }
    return INITIAL_COMMENTS;
  });

  // Navigation: Selected article for reading mode
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [sortBy, setSortBy] = useState<'latest' | 'claps' | 'time'>('latest');

  // Modals state
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);
  const [isNewArticleOpen, setIsNewArticleOpen] = useState(false);
  const [isColophonOpen, setIsColophonOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Apply theme classes to HTML & Body
  useEffect(() => {
    localStorage.setItem('folio_theme', theme);
    const root = document.documentElement;
    const body = document.body;

    if (theme === 'charcoal') {
      root.classList.add('dark');
      body.className = 'bg-[#121212] text-neutral-100 antialiased selection:bg-neutral-800 selection:text-white transition-colors duration-200';
    } else if (theme === 'crisp') {
      root.classList.remove('dark');
      body.className = 'bg-[#FFFFFF] text-neutral-900 antialiased selection:bg-neutral-900 selection:text-white transition-colors duration-200';
    } else {
      // Paper (warm neutral alabaster)
      root.classList.remove('dark');
      body.className = 'bg-[#F9F8F6] text-neutral-900 antialiased selection:bg-neutral-900 selection:text-white transition-colors duration-200';
    }
  }, [theme]);

  // Persist articles
  useEffect(() => {
    localStorage.setItem('folio_articles', JSON.stringify(articles));
  }, [articles]);

  // Persist bookmarks
  useEffect(() => {
    localStorage.setItem('folio_bookmarks', JSON.stringify(bookmarkedIds));
  }, [bookmarkedIds]);

  // Persist comments
  useEffect(() => {
    localStorage.setItem('folio_comments', JSON.stringify(comments));
  }, [comments]);

  // Toast trigger
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  // Clap handler
  const handleClap = (e: React.MouseEvent | undefined, articleId: string) => {
    if (e) e.stopPropagation();
    setArticles((prev) =>
      prev.map((a) => (a.id === articleId ? { ...a, claps: a.claps + 1 } : a))
    );
    showToast('Applaud noted for this essay');
  };

  // Bookmark toggle
  const handleToggleBookmark = (
    e: React.MouseEvent | undefined,
    article: Article
  ) => {
    if (e) e.stopPropagation();
    const isSaved = bookmarkedIds.includes(article.id);
    if (isSaved) {
      setBookmarkedIds((prev) => prev.filter((id) => id !== article.id));
      showToast('Removed from reading archive');
    } else {
      setBookmarkedIds((prev) => [...prev, article.id]);
      showToast('Preserved in reading archive');
    }
  };

  // Add Comment
  const handleAddComment = (
    articleId: string,
    authorName: string,
    content: string
  ) => {
    const newComment: Comment = {
      id: `comm-${Date.now()}`,
      articleId,
      authorName,
      date: 'Just now',
      content,
      likes: 1,
    };
    setComments((prev) => [newComment, ...prev]);
  };

  // Like comment
  const handleLikeComment = (commentId: string) => {
    setComments((prev) =>
      prev.map((c) => (c.id === commentId ? { ...c, likes: c.likes + 1 } : c))
    );
  };

  // Publish new custom article
  const handlePublishArticle = (newArticle: Article) => {
    setArticles((prev) => [newArticle, ...prev]);
    showToast('Essay published to Folio index');
    setSelectedArticleId(newArticle.id);
  };

  // Filter & Sort logic
  const filteredArticles = useMemo(() => {
    let result = [...articles];

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.subtitle.toLowerCase().includes(q) ||
          a.author.name.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q) ||
          a.sections.some((s) => s.body.some((b) => b.toLowerCase().includes(q)))
      );
    }

    // Category filter
    if (selectedCategory !== 'All') {
      result = result.filter((a) => a.category === selectedCategory);
    }

    // Sorting
    if (sortBy === 'claps') {
      result.sort((a, b) => b.claps - a.claps);
    } else if (sortBy === 'time') {
      // parse approximate read time
      result.sort((a, b) => parseInt(b.readTime) - parseInt(a.readTime));
    }
    // Default 'latest' preserves array order (newest first)

    return result;
  }, [articles, searchQuery, selectedCategory, sortBy]);

  // Bookmarked articles list
  const savedArticlesList = useMemo(() => {
    return articles.filter((a) => bookmarkedIds.includes(a.id));
  }, [articles, bookmarkedIds]);

  // Find currently selected article
  const currentArticle = useMemo(() => {
    if (!selectedArticleId) return null;
    return articles.find((a) => a.id === selectedArticleId) || null;
  }, [articles, selectedArticleId]);

  // Lead article vs secondary grid vs archive list
  const leadArticle = useMemo(() => {
    if (filteredArticles.length === 0) return null;
    // If user is searching or filtered by category, show first as lead
    const featured = filteredArticles.find((a) => a.featured);
    return featured || filteredArticles[0];
  }, [filteredArticles]);

  const secondaryArticles = useMemo(() => {
    if (!leadArticle) return [];
    return filteredArticles.filter((a) => a.id !== leadArticle.id).slice(0, 3);
  }, [filteredArticles, leadArticle]);

  const archiveArticles = useMemo(() => {
    if (!leadArticle) return [];
    const excludeIds = new Set([leadArticle.id, ...secondaryArticles.map((a) => a.id)]);
    return filteredArticles.filter((a) => !excludeIds.has(a.id));
  }, [filteredArticles, leadArticle, secondaryArticles]);

  // Scroll to top on article change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [selectedArticleId]);

  return (
    <div className="min-h-screen flex flex-col font-editorial-sans">
      {/* Top Bar Navigation (Zone 1 - Zone 2 - Zone 3) */}
      <Header
        currentTheme={theme}
        onThemeChange={(newTheme) => {
          setTheme(newTheme);
          showToast(`Switched to ${newTheme} theme`);
        }}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
        onOpenNewArticle={() => setIsNewArticleOpen(true)}
        onOpenColophon={() => setIsColophonOpen(true)}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat as Category);
          setSelectedArticleId(null);
        }}
        onNavigateHome={() => {
          setSelectedArticleId(null);
          setSelectedCategory('All');
          setSearchQuery('');
        }}
        savedCount={bookmarkedIds.length}
      />

      {/* Main Content Area */}
      <div className="flex-1">
        {currentArticle ? (
          // Reading View
          <ArticleDetail
            article={currentArticle}
            onBack={() => setSelectedArticleId(null)}
            isBookmarked={bookmarkedIds.includes(currentArticle.id)}
            onToggleBookmark={() => handleToggleBookmark(undefined, currentArticle)}
            onClap={() => handleClap(undefined, currentArticle.id)}
            comments={comments}
            onAddComment={handleAddComment}
            onLikeComment={handleLikeComment}
            allArticles={articles}
            onSelectArticle={(art) => setSelectedArticleId(art.id)}
            onShowToast={showToast}
          />
        ) : (
          // Magazine Feed View
          <main className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 pb-20">
            {/* Editorial Lead In / Title Block */}
            <div className="pb-8 border-b border-neutral-200 dark:border-neutral-800 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <div className="text-xs font-editorial-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
                  VOL. XLVIII · AN INDEPENDENT MONOCHROME INQUIRY
                </div>
                <h1 className="font-editorial-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-neutral-900 dark:text-neutral-100">
                  The Architecture of Permanence
                </h1>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base leading-relaxed">
                  Essays examining the structural tension between material tactility, digital obsolescence, and timeless spatial proportion.
                </p>
              </div>

              {/* Quick stats ribbon */}
              <div className="text-right hidden sm:block shrink-0">
                <div className="text-xs font-editorial-mono text-neutral-500 dark:text-neutral-400">
                  TOTAL ESSAYS IN CATALOGUE
                </div>
                <div className="font-editorial-mono text-2xl font-bold tabular-nums text-neutral-900 dark:text-neutral-100">
                  {String(articles.length).padStart(2, '0')}
                </div>
              </div>
            </div>

            {/* Filter & Search Bar (§1.A: Interactive Filter Controls as segmented buttons) */}
            <div className="mb-10 space-y-4">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Segmented Category Buttons */}
                <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                  {(['All', 'Architecture', 'Design & Craft', 'Technology', 'Philosophy'] as Category[]).map(
                    (cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-3.5 py-1.5 text-xs font-medium tracking-wide uppercase transition-all rounded-xs whitespace-nowrap shrink-0 cursor-pointer ${
                          selectedCategory === cat
                            ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 shadow-xs'
                            : 'bg-neutral-100 dark:bg-neutral-800/80 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
                        }`}
                      >
                        {cat}
                      </button>
                    )
                  )}
                </div>

                {/* Search Box & Sort Controls */}
                <div className="flex items-center gap-3">
                  <div className="relative flex-1 sm:w-64">
                    <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search inquiries & authors..."
                      className="w-full pl-8 pr-3 py-1.5 text-xs bg-white dark:bg-neutral-800/90 border border-neutral-200 dark:border-neutral-700 rounded-xs text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-hidden focus:border-neutral-900 dark:focus:border-neutral-200"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 text-xs font-mono"
                      >
                        ×
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0 text-xs font-editorial-mono text-neutral-500">
                    <ArrowUpDown className="w-3 h-3" />
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="bg-transparent border border-neutral-200 dark:border-neutral-700 rounded-xs px-2 py-1.5 text-neutral-700 dark:text-neutral-300 focus:outline-hidden cursor-pointer text-xs"
                    >
                      <option value="latest">Latest</option>
                      <option value="claps">Most Applauded</option>
                      <option value="time">Read Time</option>
                    </select>
                  </div>
                </div>
              </div>

              {searchQuery && (
                <div className="text-xs font-editorial-mono text-neutral-500">
                  Showing {filteredArticles.length} results matching "{searchQuery}"
                </div>
              )}
            </div>

            {/* Empty Search State */}
            {filteredArticles.length === 0 ? (
              <div className="py-24 text-center space-y-4 border border-dashed border-neutral-300 dark:border-neutral-800 rounded-sm">
                <BookOpen className="w-10 h-10 mx-auto text-neutral-400" />
                <h3 className="font-editorial-serif text-2xl font-medium text-neutral-900 dark:text-neutral-100">
                  No Inquiries Located
                </h3>
                <p className="text-xs text-neutral-500 max-w-md mx-auto">
                  No essays match the query "{searchQuery}". Try broadening your search or resetting category filters.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                  }}
                  className="px-4 py-2 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-xs uppercase tracking-wider font-medium rounded-xs"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <>
                {/* Salience Tier 1: Lead Cover Story */}
                {leadArticle && (
                  <LeadArticle
                    article={leadArticle}
                    onSelect={(art) => setSelectedArticleId(art.id)}
                    isBookmarked={bookmarkedIds.includes(leadArticle.id)}
                    onToggleBookmark={(e, art) => handleToggleBookmark(e, art)}
                    onClap={(e, id) => handleClap(e, id)}
                  />
                )}

                {/* Salience Tier 2: Curated Secondary Grid */}
                {secondaryArticles.length > 0 && (
                  <section className="mb-14">
                    <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-neutral-800 mb-8">
                      <h2 className="text-xs uppercase tracking-widest font-editorial-mono font-semibold text-neutral-800 dark:text-neutral-200">
                        Curated Inquiries & Monographs
                      </h2>
                      <span className="text-xs font-editorial-mono text-neutral-400">
                        SECTION II
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {secondaryArticles.map((article) => (
                        <ArticleCard
                          key={article.id}
                          article={article}
                          onSelect={(art) => setSelectedArticleId(art.id)}
                          isBookmarked={bookmarkedIds.includes(article.id)}
                          onToggleBookmark={(e, art) => handleToggleBookmark(e, art)}
                          onClap={(e, id) => handleClap(e, id)}
                        />
                      ))}
                    </div>
                  </section>
                )}

                {/* Salience Tier 3: Department / Archive Compact Rows */}
                {archiveArticles.length > 0 && (
                  <section className="mb-14">
                    <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-neutral-800 mb-6">
                      <h2 className="text-xs uppercase tracking-widest font-editorial-mono font-semibold text-neutral-800 dark:text-neutral-200">
                        Historical Archive & Department Register
                      </h2>
                      <span className="text-xs font-editorial-mono text-neutral-400">
                        SECTION III
                      </span>
                    </div>

                    <div className="divide-y divide-transparent">
                      {archiveArticles.map((article, index) => (
                        <ArchiveRow
                          key={article.id}
                          article={article}
                          index={index}
                          onSelect={(art) => setSelectedArticleId(art.id)}
                          isBookmarked={bookmarkedIds.includes(article.id)}
                          onToggleBookmark={(e, art) => handleToggleBookmark(e, art)}
                        />
                      ))}
                    </div>
                  </section>
                )}
              </>
            )}

            {/* Newsletter Subscription Box */}
            <NewsletterSection onShowToast={showToast} />
          </main>
        )}
      </div>

      {/* Editorial Footer */}
      <footer className="border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121212] py-12 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-neutral-100 dark:border-neutral-800/80">
            <div>
              <div className="font-editorial-serif text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
                FOLIO JOURNAL
              </div>
              <p className="text-xs font-editorial-mono text-neutral-500 dark:text-neutral-400 mt-1">
                An editorial inquiry into material culture, typography, and architectural permanence.
              </p>
            </div>

            <div className="flex items-center gap-6 text-xs font-editorial-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              <button
                onClick={() => setIsColophonOpen(true)}
                className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
              >
                Colophon & Typeface
              </button>
              <button
                onClick={() => setIsNewArticleOpen(true)}
                className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
              >
                Submit Essay
              </button>
              <button
                onClick={() => setIsBookmarksOpen(true)}
                className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
              >
                Reading Archive ({bookmarkedIds.length})
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-editorial-mono text-neutral-400 dark:text-neutral-500">
            <div>
              ISSUED UNDER EDITORIAL STEWARDSHIP · ALL RIGHTS RESERVED © 2026
            </div>
            <div>
              DESIGNED IN STRICT MONOCHROME · NO EXTERNAL ADVERTISING
            </div>
          </div>
        </div>
      </footer>

      {/* Modals & Drawers */}
      <BookmarksDrawer
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
        savedArticles={savedArticlesList}
        onSelectArticle={(art) => setSelectedArticleId(art.id)}
        onRemoveBookmark={(id) => {
          setBookmarkedIds((prev) => prev.filter((bId) => bId !== id));
          showToast('Removed from saved list');
        }}
        onClearAll={() => {
          setBookmarkedIds([]);
          showToast('Reading archive cleared');
        }}
      />

      <SubmitArticleModal
        isOpen={isNewArticleOpen}
        onClose={() => setIsNewArticleOpen(false)}
        onSubmit={handlePublishArticle}
      />

      <ColophonModal
        isOpen={isColophonOpen}
        onClose={() => setIsColophonOpen(false)}
      />

      {/* Clean Toast notification */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
}
