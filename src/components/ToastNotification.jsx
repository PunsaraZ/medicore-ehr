import React, { useEffect } from 'react';
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from 'lucide-react';

export default function ToastNotification({ toast, onClose }) {
  if (!toast) return null;

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0" />,
    error: <XCircle className="w-5 h-5 text-rose-500 flex-shrink-0" />,
    info: <Info className="w-5 h-5 text-cyan-500 flex-shrink-0" />
  };

  const borderColors = {
    success: 'border-emerald-500/30 bg-emerald-50/90 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200',
    warning: 'border-amber-500/30 bg-amber-50/90 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200',
    error: 'border-rose-500/30 bg-rose-50/90 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200',
    info: 'border-cyan-500/30 bg-cyan-50/90 dark:bg-cyan-950/40 text-cyan-900 dark:text-cyan-200'
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fade-in max-w-md">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-xl backdrop-blur-md transition-all ${borderColors[toast.type || 'info']}`}>
        {icons[toast.type || 'info']}
        <div className="text-sm font-medium pr-2">
          {toast.message}
        </div>
        <button
          onClick={onClose}
          className="ml-auto p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
