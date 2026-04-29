import { useState, useCallback } from 'react';
import { Menu, X } from 'lucide-react';
import { LogoFull } from './Logo';

const navLinks = [
  { label: 'Discover', href: '#discover' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Features', href: '#features' },
  { label: 'Download', href: '#download' },
];

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollToSection = useCallback((href: string) => {
    setMobileOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[100] h-[60px] sm:h-[72px] flex items-center bg-dark/80 backdrop-blur-xl border-b border-white/5">
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => scrollToSection('#hero')} className="shrink-0">
            <LogoFull />
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="text-sm font-medium text-white/60 hover:text-gold transition-colors duration-200 relative group uppercase tracking-wider"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </div>

          {/* Desktop CTA */}
          <button
            onClick={() => scrollToSection('#download')}
            Get the App
          </button>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-gold"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[999] bg-dark/98 backdrop-blur-xl transition-all duration-500 md:hidden ${
          mobileOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-6 sm:gap-8 px-6">
          {navLinks.map((link, i) => (
            <button
              key={link.href}
              onClick={() => scrollToSection(link.href)}
              className="text-white text-xl sm:text-2xl font-medium hover:text-gold transition-colors duration-200 uppercase tracking-wider"
              style={{
                transitionDelay: mobileOpen ? `${i * 80}ms` : '0ms',
                opacity: mobileOpen ? 1 : 0,
                transform: mobileOpen ? 'translateY(0)' : 'translateY(30px)',
                transition: 'opacity 0.5s ease, transform 0.5s ease',
              }}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollToSection('#download')}
            className="mt-4 px-8 py-3 bg-gold text-dark text-base sm:text-lg font-semibold rounded-full hover:bg-gold-light transition-all duration-200"
            style={{
              transitionDelay: mobileOpen ? `${navLinks.length * 80}ms` : '0ms',
              opacity: mobileOpen ? 1 : 0,
              transform: mobileOpen ? 'translateY(0)' : 'translateY(30px)',
              transition: 'opacity 0.5s ease, transform 0.5s ease',
            }}
          >
            GET THE APP
          </button>
        </div>
      </div>
    </>
  );
}
