import { useState, useEffect } from 'react';
import { X, Cookie } from 'lucide-react';
import { loadAnalytics } from '@/lib/analytics';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const accept = (type: 'all' | 'essential') => {
    localStorage.setItem('cookieConsent', type);
    if (type === 'all') {
      loadAnalytics();
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] p-4">
      <div className="max-w-xl mx-auto bg-zinc-900/95 backdrop-blur-xl border border-zinc-700 rounded-2xl p-4 shadow-2xl">
        <div className="flex items-start gap-3">
          <Cookie className="w-5 h-5 text-gold shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <p className="text-white/80 text-xs leading-relaxed mb-3">
              We use cookies to enhance your experience, analyze site traffic, and for marketing purposes.
              By clicking Accept All, you consent to our use of cookies.
            </p>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => accept('all')}
                className="px-4 py-2 bg-gold hover:bg-gold-light text-dark text-xs font-bold rounded-lg transition-all"
              >
                Accept All
              </button>
              <button
                onClick={() => accept('essential')}
                className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-bold rounded-lg transition-all"
              >
                Essential Only
              </button>
              <a href="/#/privacy" className="px-3 py-2 text-zinc-500 hover:text-zinc-300 text-xs transition-colors self-center">
                Customize
              </a>
            </div>
          </div>
          <button onClick={() => setVisible(false)} className="text-zinc-500 hover:text-zinc-300 shrink-0">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
