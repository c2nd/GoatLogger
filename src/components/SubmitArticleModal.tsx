import React, { useState } from 'react';
import { X, Plus, Sparkles } from 'lucide-react';
import { Article, Category } from '../types/blog';

interface SubmitArticleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (article: Article) => void;
}

const COVER_OPTIONS = [
  { label: 'Brutalist Concrete Atrium', url: '/src/assets/images/lead_hero_architecture_1793667651926.jpg' },
  { label: 'Letterpress & Slate Table', url: '/src/assets/images/feature_industrial_design_1793667653327.jpg' },
  { label: 'Minimalist Stone Corridor', url: '/src/assets/images/feature_interior_space_1793667652768.jpg' },
  { label: 'Obsidian Compute Monoliths', url: '/src/assets/images/feature_cybernetics_monochrome_1793667653437.jpg' },
  { label: 'Tactile Unglazed Ceramics', url: '/src/assets/images/feature_ceramic_craft_1793667653665.jpg' },
];

export const SubmitArticleModal: React.FC<SubmitArticleModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState<Exclude<Category, 'All'>>('Architecture');
  const [authorName, setAuthorName] = useState('');
  const [authorRole, setAuthorRole] = useState('Contributing Essayist');
  const [readTime, setReadTime] = useState('5 min read');
  const [selectedImage, setSelectedImage] = useState(COVER_OPTIONS[0].url);
  const [paragraph1, setParagraph1] = useState('');
  const [paragraph2, setParagraph2] = useState('');
  const [pullQuote, setPullQuote] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !authorName.trim() || !paragraph1.trim()) return;

    const initials = authorName
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || 'ED';

    const newArticle: Article = {
      id: `art-${Date.now()}`,
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 40),
      title: title.trim(),
      subtitle: subtitle.trim() || 'A new essay published to the Folio archive.',
      category,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      readTime: readTime || '5 min read',
      coverImage: selectedImage,
      imageCaption: `Fig. — Visual study supporting the inquiry into ${category.toLowerCase()}.`,
      claps: 1,
      bookmarksCount: 0,
      author: {
        name: authorName.trim(),
        role: authorRole.trim(),
        initials,
        bio: `${authorName.trim()} writes on ${category.toLowerCase()} and material culture.`
      },
      sections: [
        {
          id: 'opening',
          title: 'I. The Core Thesis',
          body: [paragraph1.trim()],
          pullQuote: pullQuote.trim() || undefined,
          quoteAuthor: pullQuote.trim() ? authorName.trim() : undefined,
        },
        ...(paragraph2.trim()
          ? [
              {
                id: 'synthesis',
                title: 'II. Critical Observations',
                body: [paragraph2.trim()],
              },
            ]
          : []),
      ],
    };

    onSubmit(newArticle);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-neutral-950/50 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#181818] border border-neutral-300 dark:border-neutral-800 rounded-sm shadow-2xl p-6 sm:p-8 z-10 my-8">
        <div className="flex items-center justify-between pb-4 border-b border-neutral-200 dark:border-neutral-800">
          <div>
            <h2 className="font-editorial-serif text-2xl font-medium text-neutral-900 dark:text-neutral-100">
              Submit Essay to the Dispatch
            </h2>
            <p className="text-xs font-editorial-mono text-neutral-500 dark:text-neutral-400 mt-1">
              Draft an original contribution formatted to the Folio editorial standards.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 pt-4 text-xs font-editorial-sans">
          {/* Title & Subtitle */}
          <div>
            <label className="block text-[11px] font-editorial-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-1">
              Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. The Quiet Geometry of Hand-Carved Timber"
              className="w-full px-3 py-2 text-sm bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-sm text-neutral-900 dark:text-neutral-100 focus:outline-hidden focus:border-neutral-900"
            />
          </div>

          <div>
            <label className="block text-[11px] font-editorial-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-1">
              Subtitle / Deck
            </label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="A one-sentence editorial thesis articulating the argument."
              className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-sm text-neutral-900 dark:text-neutral-100 focus:outline-hidden focus:border-neutral-900"
            />
          </div>

          {/* Category & Read Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-editorial-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-sm text-neutral-900 dark:text-neutral-100 focus:outline-hidden"
              >
                <option value="Architecture">Architecture</option>
                <option value="Design & Craft">Design & Craft</option>
                <option value="Technology">Technology</option>
                <option value="Culture">Culture</option>
                <option value="Philosophy">Philosophy</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-editorial-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-1">
                Estimated Reading Time
              </label>
              <input
                type="text"
                value={readTime}
                onChange={(e) => setReadTime(e.target.value)}
                placeholder="e.g. 6 min read"
                className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-sm text-neutral-900 dark:text-neutral-100 focus:outline-hidden"
              />
            </div>
          </div>

          {/* Author info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-editorial-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-1">
                Author Name *
              </label>
              <input
                type="text"
                required
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="e.g. Katherine Thorne"
                className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-sm text-neutral-900 dark:text-neutral-100 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-[11px] font-editorial-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-1">
                Author Role / Affiliation
              </label>
              <input
                type="text"
                value={authorRole}
                onChange={(e) => setAuthorRole(e.target.value)}
                placeholder="e.g. Architectural Historian"
                className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-sm text-neutral-900 dark:text-neutral-100 focus:outline-hidden"
              />
            </div>
          </div>

          {/* Cover Image Selection */}
          <div>
            <label className="block text-[11px] font-editorial-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-1">
              Select Monochrome Photographic Study
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {COVER_OPTIONS.map((opt) => (
                <button
                  type="button"
                  key={opt.url}
                  onClick={() => setSelectedImage(opt.url)}
                  className={`border rounded-xs overflow-hidden text-left p-1 transition-all ${
                    selectedImage === opt.url
                      ? 'border-neutral-900 dark:border-white ring-1 ring-neutral-900 dark:ring-white'
                      : 'border-neutral-200 dark:border-neutral-700 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={opt.url} alt={opt.label} className="w-full h-12 object-cover grayscale" />
                  <span className="block text-[10px] truncate text-neutral-600 dark:text-neutral-300 mt-1">
                    {opt.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Lead Paragraph */}
          <div>
            <label className="block text-[11px] font-editorial-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-1">
              Opening Paragraph (Will feature drop cap) *
            </label>
            <textarea
              required
              rows={3}
              value={paragraph1}
              onChange={(e) => setParagraph1(e.target.value)}
              placeholder="Begin the inquiry with measured precision..."
              className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-sm text-neutral-900 dark:text-neutral-100 focus:outline-hidden leading-relaxed"
            />
          </div>

          {/* Pull Quote */}
          <div>
            <label className="block text-[11px] font-editorial-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-1">
              Pull Quote (Optional)
            </label>
            <input
              type="text"
              value={pullQuote}
              onChange={(e) => setPullQuote(e.target.value)}
              placeholder="A memorable statement that crystallizes the core paradox."
              className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-sm text-neutral-900 dark:text-neutral-100 focus:outline-hidden"
            />
          </div>

          {/* Paragraph 2 */}
          <div>
            <label className="block text-[11px] font-editorial-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-1">
              Second Section / Conclusion (Optional)
            </label>
            <textarea
              rows={3}
              value={paragraph2}
              onChange={(e) => setParagraph2(e.target.value)}
              placeholder="Expand the critical horizon..."
              className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-sm text-neutral-900 dark:text-neutral-100 focus:outline-hidden leading-relaxed"
            />
          </div>

          {/* Modal Actions */}
          <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-neutral-300 dark:border-neutral-700 text-xs font-medium text-neutral-700 dark:text-neutral-300 rounded-sm hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-xs uppercase tracking-wider font-medium rounded-sm hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
            >
              Publish Essay
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
