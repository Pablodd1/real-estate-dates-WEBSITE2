import { LogoIcon } from './Logo';
import { useTranslation } from 'react-i18next';

interface LegendItem {
  term: string;
  def: string;
}

export default function Footer() {
  const { t } = useTranslation();
  const legend = t('footer.legend', { returnObjects: true }) as LegendItem[];

  return (
    <footer className="w-full py-6 sm:py-8 border-t ">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 flex flex-col gap-4 sm:gap-5">
        {/* Legend / glossary */}
        <div className="border-b border-white/[0.06] pb-5">
          <p className="text-center text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-gold/70 font-semibold mb-3">
            {t('footer.legendTitle')}
          </p>
          <p className="flex flex-wrap justify-center gap-x-4 gap-y-1.5 max-w-[900px] mx-auto text-[10px] sm:text-[11px] text-white/60 leading-relaxed">
            {legend.map((item, i) => (
              <span key={i}>
                <span className="text-gold/80 font-medium">{item.term}</span>
                <span className="text-white/40"> — {item.def}</span>
              </span>
            ))}
          </p>
        </div>

        {/* Happy Hour schedule strip */}
        <div className="flex justify-center">
          <a
            href="#events"
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/20 bg-gold/[0.06] text-[9px] sm:text-[10px] uppercase tracking-[0.15em] text-gold/80 hover:text-gold hover:border-gold/40 transition-colors"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-60" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-gold" />
            </span>
            {t('events.happyHour.footerLine')}
          </a>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-2">
            <LogoIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gold/60" />
            <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-white/70 font-medium">
              Real Estate Dates &copy; 2025
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            {['about', 'contact', 'terms', 'privacy'].map((id) => (
              <a
                key={id}
                href={`#${id}`}
                className="text-[9px] sm:text-[10px] uppercase tracking-[0.15em] text-white/75 hover:text-gold transition-colors"
              >
                {id}
              </a>
            ))}
            <a
              href="https://realestatedates.realty"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[9px] sm:text-[10px] uppercase tracking-[0.15em] text-gold/50 hover:text-gold transition-colors"
            >
              realestatedates.net
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
