import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-2 duration-200">
      <div className="bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 px-4 py-3 rounded-sm shadow-xl flex items-center gap-2.5 text-xs font-editorial-mono border border-neutral-700 dark:border-neutral-300">
        <CheckCircle2 className="w-4 h-4 text-neutral-300 dark:text-neutral-700 shrink-0" />
        <span>{message}</span>
      </div>
    </div>
  );
};
