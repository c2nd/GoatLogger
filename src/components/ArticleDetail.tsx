import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Bookmark, 
  Heart, 
  Share2, 
  Volume2, 
  VolumeX, 
  Type, 
  Printer, 
  MessageSquare,
  ThumbsUp,
  Send,
  Sparkles,
  Check
} from 'lucide-react';
import { Article, Comment } from '../types/blog';

interface ArticleDetailProps {
  article: Article;
  onBack: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (article: Article) => void;
  onClap: (articleId: string) => void;
  comments: Comment[];
  onAddComment: (articleId: string, authorName: string, content: string) => void;
  onLikeComment: (commentId: string) => void;
  allArticles: Article[];
  onSelectArticle: (article: Article) => void;
  onShowToast: (msg: string) => void;
}

export const ArticleDetail: React.FC<ArticleDetailProps> = ({
  article,
  onBack,
  isBookmarked,
  onToggleBookmark,
  onClap,
  comments,
  onAddComment,
  onLikeComment,
  allArticles,
  onSelectArticle,
  onShowToast,
}) => {
  // Reading preferences
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xl'>('normal');
  const [readingProgress, setReadingProgress] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [activeTocId, setActiveTocId] = useState<string>('');

  // Comment form state
  const [commentName, setCommentName] = useState('');
  const [commentText, setCommentText] = useState('');

  // Track scroll progress for reading depth indicator
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
        setReadingProgress(progress);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Text-to-Speech audio reader using browser SpeechSynthesis
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [article.id]);

  const toggleSpeech = () => {
    if (!('speechSynthesis' in window)) {
      onShowToast('Audio speech is not supported in this browser.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const plainText = [
        article.title,
        article.subtitle,
        ...article.sections.flatMap(s => s.body)
      ].join('. ');

      const utterance = new SpeechSynthesisUtterance(plainText);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
      onShowToast('Playing audio reading of essay');
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      onShowToast('Link copied to clipboard');
    } else {
      onShowToast('Sharing ready');
    }
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentName.trim() || !commentText.trim()) return;
    onAddComment(article.id, commentName.trim(), commentText.trim());
    setCommentName('');
    setCommentText('');
    onShowToast('Comment posted successfully');
  };

  const articleComments = comments.filter(c => c.articleId === article.id);

  // Related articles (matching IDs or other articles)
  const related = allArticles.filter(a => a.id !== article.id).slice(0, 2);

  // Font size classes
  const bodyTextClass = {
    normal: 'text-base sm:text-lg leading-relaxed',
    large: 'text-lg sm:text-xl leading-loose',
    xl: 'text-xl sm:text-2xl leading-loose',
  }[fontSize];

  return (
    <div className="min-h-screen pb-24">
      {/* Reading Progress Bar (Pattern E of §3) */}
      <div className="fixed top-0 left-0 w-full h-[3px] bg-neutral-200 dark:bg-neutral-800 z-50">
        <div
          className="h-full bg-neutral-900 dark:bg-neutral-100 transition-[width] duration-150 ease-out"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Floating / Sticky Utility Sub-bar */}
      <div className="border-b border-neutral-200 dark:border-neutral-800 bg-white/95 dark:bg-[#121212]/95 backdrop-blur-sm sticky top-[75px] z-30 px-4 sm:px-8 py-2.5 transition-colors">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs uppercase tracking-widest font-editorial-mono text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Index</span>
          </button>

          {/* Reading Controls */}
          <div className="flex items-center gap-2 sm:gap-3 text-xs">
            {/* Font size picker */}
            <div className="flex items-center gap-0.5 bg-neutral-100 dark:bg-neutral-800/80 p-0.5 rounded text-[11px] font-editorial-mono">
              <button
                onClick={() => setFontSize('normal')}
                className={`px-2 py-0.5 rounded ${fontSize === 'normal' ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 shadow-xs' : 'text-neutral-500'}`}
                title="Normal text size"
              >
                A
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-2 py-0.5 rounded ${fontSize === 'large' ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 shadow-xs' : 'text-neutral-500'}`}
                title="Large text size"
              >
                A+
              </button>
              <button
                onClick={() => setFontSize('xl')}
                className={`px-2 py-0.5 rounded ${fontSize === 'xl' ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 shadow-xs' : 'text-neutral-500'}`}
                title="Extra large text size"
              >
                A++
              </button>
            </div>

            {/* Audio Reader */}
            <button
              onClick={toggleSpeech}
              className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs border transition-colors ${
                isSpeaking
                  ? 'border-neutral-900 dark:border-neutral-100 bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900'
                  : 'border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white'
              }`}
              title={isSpeaking ? 'Stop narration' : 'Listen to article'}
            >
              {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{isSpeaking ? 'Stop' : 'Listen'}</span>
            </button>

            {/* Bookmark button */}
            <button
              onClick={() => onToggleBookmark(article)}
              className={`p-1.5 rounded border border-neutral-200 dark:border-neutral-800 transition-colors ${
                isBookmarked
                  ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white'
              }`}
              title={isBookmarked ? 'Saved to library' : 'Save essay'}
            >
              <Bookmark className="w-3.5 h-3.5" />
            </button>

            {/* Share button */}
            <button
              onClick={handleShare}
              className="p-1.5 rounded border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-colors"
              title="Copy share link"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>

            {/* Print button */}
            <button
              onClick={() => window.print()}
              className="p-1.5 rounded border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-colors hidden sm:inline-block"
              title="Print article"
            >
              <Printer className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Article Container */}
      <main className="max-w-5xl mx-auto px-4 sm:px-8 pt-10">
        {/* Editorial Metadata Header */}
        <div className="max-w-3xl mx-auto mb-10 text-center space-y-5">
          <div className="flex items-center justify-center gap-2 text-xs font-editorial-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
            <span>{article.category}</span>
            <span aria-hidden="true">·</span>
            <span>{article.date}</span>
            <span aria-hidden="true">·</span>
            <span>{article.readTime}</span>
          </div>

          <h1
            className="font-editorial-serif text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-neutral-950 dark:text-neutral-50 leading-[1.12]"
            style={{ textWrap: 'balance' }}
          >
            {article.title}
          </h1>

          <p className="text-neutral-600 dark:text-neutral-400 text-lg sm:text-xl font-editorial-sans leading-relaxed max-w-2xl mx-auto">
            {article.subtitle}
          </p>

          {/* Author Byline */}
          <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800 inline-flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center font-editorial-mono text-xs font-medium text-neutral-800 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-700">
              {article.author.initials}
            </div>
            <div className="text-left">
              <div className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                {article.author.name}
              </div>
              <div className="text-xs text-neutral-500 dark:text-neutral-400">
                {article.author.role}
              </div>
            </div>
          </div>
        </div>

        {/* Lead Cover Photography */}
        <div className="mb-14">
          <div className="aspect-16/9 overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
            <img
              src={article.coverImage}
              alt={article.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover grayscale contrast-105"
            />
          </div>
          <p className="text-xs font-editorial-mono text-neutral-500 dark:text-neutral-400 mt-2.5 text-center">
            {article.imageCaption}
          </p>
        </div>

        {/* Asymmetric Reading Layout: Main Narrative + Floating Table of Contents / Sidebar (Pattern D §3) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Reading Column (Measure 65-75ch optimal readability) */}
          <div className="lg:col-span-8 max-w-prose space-y-10">
            {article.sections.map((section, idx) => (
              <section key={section.id} id={section.id} className="space-y-6">
                {section.title && (
                  <h2 className="font-editorial-serif text-2xl sm:text-3xl font-medium text-neutral-900 dark:text-neutral-100 pt-4 border-t border-neutral-200 dark:border-neutral-800">
                    {section.title}
                  </h2>
                )}

                {/* Paragraphs with Drop Cap on the very first section paragraph */}
                {section.body.map((para, pIdx) => {
                  const isFirstPara = idx === 0 && pIdx === 0;
                  return (
                    <p
                      key={pIdx}
                      className={`text-neutral-800 dark:text-neutral-200 font-editorial-sans ${bodyTextClass} ${
                        isFirstPara
                          ? 'first-letter:text-5xl sm:first-letter:text-6xl first-letter:font-editorial-serif first-letter:font-semibold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-neutral-950 dark:first-letter:text-white'
                          : ''
                      }`}
                    >
                      {para}
                    </p>
                  );
                })}

                {/* Pull Quote with Top/Bottom Hairline Rule (No thick colored left borders §1.C) */}
                {section.pullQuote && (
                  <figure className="my-10 py-6 border-y border-neutral-200 dark:border-neutral-800 text-center px-4 sm:px-8">
                    <blockquote className="font-editorial-serif text-xl sm:text-2xl lg:text-3xl italic text-neutral-900 dark:text-neutral-100 leading-snug">
                      "{section.pullQuote}"
                    </blockquote>
                    {section.quoteAuthor && (
                      <figcaption className="text-xs uppercase tracking-widest font-editorial-mono text-neutral-500 dark:text-neutral-400 mt-3">
                        — {section.quoteAuthor}
                      </figcaption>
                    )}
                  </figure>
                )}

                {/* Captioned Image / Figure */}
                {section.captionedImage && (
                  <div className="my-8">
                    <div className="aspect-4/3 overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                      <img
                        src={section.captionedImage.src}
                        alt={section.captionedImage.caption}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover grayscale contrast-105"
                      />
                    </div>
                    <figcaption className="text-xs font-editorial-mono text-neutral-500 dark:text-neutral-400 mt-2">
                      {section.captionedImage.caption}
                    </figcaption>
                  </div>
                )}

                {/* Key takeaway box */}
                {section.keyTakeaway && (
                  <div className="p-5 bg-neutral-100/80 dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800 rounded-sm">
                    <span className="text-[11px] uppercase tracking-widest font-editorial-mono text-neutral-500 dark:text-neutral-400 block mb-1">
                      Salient Principle
                    </span>
                    <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100 font-editorial-sans">
                      {section.keyTakeaway}
                    </p>
                  </div>
                )}
              </section>
            ))}

            {/* Footnotes & Citations Section */}
            {article.footnotes && article.footnotes.length > 0 && (
              <div className="pt-8 border-t border-neutral-200 dark:border-neutral-800 space-y-2 text-xs font-editorial-mono text-neutral-500 dark:text-neutral-400">
                <div className="uppercase tracking-widest font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
                  Archival References & Citations
                </div>
                {article.footnotes.map((fn, fIdx) => (
                  <div key={fIdx} className="leading-relaxed">
                    {fn}
                  </div>
                ))}
              </div>
            )}

            {/* Clap / Reaction Bar */}
            <div className="pt-8 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onClap(article.id)}
                  className="flex items-center gap-2 px-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded-sm hover:border-neutral-900 dark:hover:border-neutral-200 transition-colors cursor-pointer group"
                >
                  <Heart className="w-4 h-4 group-hover:scale-110 transition-transform text-neutral-900 dark:text-neutral-100" />
                  <span className="font-editorial-mono text-xs font-medium tabular-nums text-neutral-900 dark:text-neutral-100">
                    {article.claps} Applauds
                  </span>
                </button>

                <button
                  onClick={() => onToggleBookmark(article)}
                  className="flex items-center gap-2 px-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded-sm hover:border-neutral-900 dark:hover:border-neutral-200 transition-colors cursor-pointer"
                >
                  <Bookmark className="w-4 h-4 text-neutral-900 dark:text-neutral-100" />
                  <span className="text-xs font-medium text-neutral-900 dark:text-neutral-100">
                    {isBookmarked ? 'Saved to Reading List' : 'Save Essay'}
                  </span>
                </button>
              </div>

              <button
                onClick={handleShare}
                className="text-xs font-editorial-mono uppercase tracking-wider text-neutral-500 hover:text-neutral-950 dark:hover:text-white transition-colors"
              >
                Copy Link
              </button>
            </div>

            {/* Author Extended Profile */}
            <div className="p-6 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center font-editorial-mono text-sm font-semibold text-neutral-800 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-700 shrink-0">
                {article.author.initials}
              </div>
              <div className="space-y-1">
                <h3 className="font-editorial-serif text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                  {article.author.name}
                </h3>
                <p className="text-xs font-editorial-mono text-neutral-500 dark:text-neutral-400">
                  {article.author.role}
                </p>
                <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 font-editorial-sans pt-1">
                  {article.author.bio}
                </p>
              </div>
            </div>

            {/* Comments & Curated Discourse Section */}
            <section className="pt-10 border-t border-neutral-200 dark:border-neutral-800 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-editorial-serif text-2xl font-medium text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-neutral-500" />
                  <span>Reader Perspectives</span>
                  <span className="font-editorial-mono text-sm text-neutral-400">
                    ({articleComments.length})
                  </span>
                </h3>
              </div>

              {/* Add Comment Form */}
              <form onSubmit={handleCommentSubmit} className="space-y-3 p-4 bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 rounded-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-editorial-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={commentName}
                      onChange={(e) => setCommentName(e.target.value)}
                      placeholder="e.g. Eleanor Rigby"
                      className="w-full px-3 py-1.5 text-xs bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-sm focus:outline-hidden focus:border-neutral-900 dark:focus:border-neutral-100 text-neutral-900 dark:text-neutral-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-editorial-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-1">
                    Perspective or Observation
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Contribute a thoughtful reflection on this essay..."
                    className="w-full px-3 py-2 text-xs bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-sm focus:outline-hidden focus:border-neutral-900 dark:focus:border-neutral-100 text-neutral-900 dark:text-neutral-100"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="flex items-center gap-1.5 px-4 py-2 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-xs uppercase tracking-wider font-medium hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors rounded-sm cursor-pointer"
                  >
                    <Send className="w-3 h-3" />
                    <span>Publish Reflection</span>
                  </button>
                </div>
              </form>

              {/* Comments List */}
              <div className="space-y-4">
                {articleComments.length === 0 ? (
                  <p className="text-xs font-editorial-mono text-neutral-500 italic py-4">
                    Be the first reader to submit a reflection on this dispatch.
                  </p>
                ) : (
                  articleComments.map((c) => (
                    <div
                      key={c.id}
                      className="p-4 border-b border-neutral-100 dark:border-neutral-800/80 space-y-2"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                            {c.authorName}
                          </span>
                          <span aria-hidden="true" className="text-neutral-400">·</span>
                          <span className="font-editorial-mono text-neutral-400">
                            {c.date}
                          </span>
                        </div>
                        <button
                          onClick={() => onLikeComment(c.id)}
                          className="flex items-center gap-1 text-[11px] font-editorial-mono text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors"
                        >
                          <ThumbsUp className="w-3 h-3" />
                          <span className="tabular-nums">{c.likes}</span>
                        </button>
                      </div>
                      <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 font-editorial-sans leading-relaxed">
                        {c.content}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </section>
          </div>

          {/* Right Column: Table of Contents & Editorial Sidebar */}
          <aside className="lg:col-span-4 space-y-8">
            {/* Sticky Table of Contents */}
            <div className="sticky top-32 space-y-6 p-5 border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 rounded-sm">
              <div>
                <span className="text-[11px] font-editorial-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500 block mb-2">
                  Essay Sections
                </span>
                <nav className="space-y-2">
                  {article.sections.map((sec, sIdx) => {
                    const secTitle = sec.title || `Section ${sIdx + 1}`;
                    return (
                      <a
                        key={sec.id}
                        href={`#${sec.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          const el = document.getElementById(sec.id);
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="block text-xs font-editorial-serif hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors text-neutral-600 dark:text-neutral-400 py-1 border-l-2 border-transparent hover:border-neutral-900 dark:hover:border-neutral-100 pl-2.5"
                      >
                        {secTitle}
                      </a>
                    );
                  })}
                </nav>
              </div>

              {/* Colophon Note */}
              <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 text-[11px] font-editorial-mono text-neutral-500 dark:text-neutral-400 leading-relaxed">
                <div>Published in Folio Volume 48.</div>
                <div>Typeset in Cormorant & Plus Jakarta.</div>
                <div className="mt-2 text-neutral-400">All rights reserved © 2026.</div>
              </div>
            </div>
          </aside>
        </div>

        {/* Curated Next Reads */}
        <section className="pt-16 mt-16 border-t border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-editorial-serif text-2xl font-medium text-neutral-900 dark:text-neutral-100">
              Further Inquiries
            </h2>
            <button
              onClick={onBack}
              className="text-xs uppercase tracking-widest font-editorial-mono text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
            >
              Browse Complete Archive →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {related.map((rel) => (
              <div
                key={rel.id}
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  onSelectArticle(rel);
                }}
                className="group cursor-pointer border border-neutral-200 dark:border-neutral-800 p-5 hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors space-y-3"
              >
                <div className="aspect-16/9 overflow-hidden bg-neutral-100 dark:bg-neutral-900">
                  <img
                    src={rel.coverImage}
                    alt={rel.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale contrast-105 group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="text-[11px] font-editorial-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                  {rel.category} · {rel.readTime}
                </div>
                <h3 className="font-editorial-serif text-xl font-medium text-neutral-900 dark:text-neutral-100 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors">
                  {rel.title}
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2">
                  {rel.subtitle}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};
