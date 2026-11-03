import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

interface NewsletterSectionProps {
  onShowToast: (msg: string) => void;
}

export const NewsletterSection: React.FC<NewsletterSectionProps> = ({ onShowToast }) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;

    setIsSubscribed(true);
    onShowToast(`Subscribed ${email} to the bi-weekly monograph dispatch`);
    setEmail('');
  };

  return (
    <section className="my-16 border-y border-neutral-200 dark:border-neutral-800 py-14 bg-neutral-50/50 dark:bg-neutral-900/40">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 text-center space-y-6">
        <div className="inline-block text-[11px] font-editorial-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
          EDITORIAL DISPATCH · ISSUED EVERY ALTERNATE MONDAY
        </div>

        <h2 className="font-editorial-serif text-3xl sm:text-4xl font-medium text-neutral-900 dark:text-neutral-100 tracking-tight">
          Receive The Printed & Digital Monograph
        </h2>

        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto font-editorial-sans leading-relaxed">
          Deep-dive structural essays, typographical criticism, and architectural analyses delivered without advertising, promotional fluff, or behavioral tracking algorithms.
        </p>

        {isSubscribed ? (
          <div className="inline-flex items-center gap-2 p-3 bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-sm text-xs font-editorial-mono text-neutral-900 dark:text-neutral-100">
            <Check className="w-4 h-4" />
            <span>You have been entered into the Issue 49 circulation registry.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address..."
              className="flex-1 px-4 py-2.5 text-xs bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-sm text-neutral-900 dark:text-neutral-100 focus:outline-hidden focus:border-neutral-900 dark:focus:border-neutral-100 transition-colors"
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-xs uppercase tracking-widest font-medium hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors rounded-sm cursor-pointer whitespace-nowrap flex items-center justify-center gap-1.5"
            >
              <span>Subscribe</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        )}

        <div className="text-[11px] font-editorial-mono text-neutral-400 dark:text-neutral-500">
          Strictly privacy-preserving · Unsubscribe at any time with one click
        </div>
      </div>
    </section>
  );
};
