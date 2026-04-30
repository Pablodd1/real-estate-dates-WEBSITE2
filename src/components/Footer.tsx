import { LogoIcon } from './Logo';

export default function Footer() {
  return (
    <footer className="w-full py-6 sm:py-8 bg-dark border-t border-white/5">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
        <div className="flex items-center gap-2">
          <LogoIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gold/60" />
          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-white/20 font-medium">
            Real Estate Dates &copy; 2025
          </span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          {['about', 'contact', 'terms', 'privacy'].map((id) => (
            <a
              key={id}
              href={`#${id}`}
              className="text-[9px] sm:text-[10px] uppercase tracking-[0.15em] text-white/30 hover:text-gold transition-colors"
            >
              {id}
            </a>
          ))}
          <a
            href="https://realestatedates.net"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[9px] sm:text-[10px] uppercase tracking-[0.15em] text-gold/50 hover:text-gold transition-colors"
          >
            realestatedates.net
          </a>
        </div>
      </div>
    </footer>
  );
}
