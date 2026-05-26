import { useState, useCallback } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { LogoFull } from './Logo';
import { useTranslation } from 'react-i18next';

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const navLinks = [
    { label: t('nav.browse'), href: '#discover' },
    { label: t('nav.howItWorks'), href: '#how-it-works' },
    { label: t('nav.events'), href: '#events' },
    { label: t('nav.pricing'), href: '#pricing' },
    { label: t('nav.features'), href: '#features' },
    { label: t('nav.safety'), href: '#legal' },
  ];

  const scrollToSection = useCallback((href: string) => {
    setMobileOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'en' ? 'es' : 'en';
    i18n.changeLanguage(nextLang);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[100] h-[60px] sm:h-[72px] flex items-center bg-transparent/80 backdrop-blur-xl border-b ">
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => scrollToSection('#hero')} className="shrink-0">
            <LogoFull />
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isExternal = link.href.startsWith('http');
              return isExternal ? (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-white/85 hover:text-gold transition-colors duration-200 relative group uppercase tracking-wider"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full" />
                </a>
              ) : (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="text-sm font-medium text-white/85 hover:text-gold transition-colors duration-200 relative group uppercase tracking-wider"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full" />
                </button>
              );
            })}
          </div>

          {/* Desktop CTA & Language Toggle */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 text-white/85 hover:text-gold transition-colors text-sm font-medium uppercase tracking-wider"
            >
              <Globe className="w-4 h-4" />
              {t('nav.language')}
            </button>
            <a
              href="https://realestatedates.realty"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 sm:px-6 py-2 sm:py-2.5 bg-gold text-dark text-xs sm:text-sm font-bold rounded-full hover:bg-gold-light transition-colors duration-200 uppercase tracking-wider"
            >
              {t('nav.exploreApp')}
            </a>
          </div>

          {/* Mobile Hamburger & Lang Toggle */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              className="p-2 text-white/85 hover:text-gold transition-colors flex items-center gap-1"
            >
              <Globe className="w-4 h-4" />
              <span className="text-xs font-medium">{t('nav.language')}</span>
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-gold"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[999] bg-transparent/98 backdrop-blur-xl transition-all duration-500 md:hidden ${
          mobileOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-6 sm:gap-8 px-6">
          {navLinks.map((link, i) => {
            const isExternal = link.href.startsWith('http');
            return isExternal ? (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="text-sm font-medium text-white/85 hover:text-gold transition-colors duration-200 uppercase tracking-wider"
                style={{
                  transitionDelay: mobileOpen ? `${i * 80}ms` : '0ms',
                  opacity: mobileOpen ? 1 : 0,
                  transform: mobileOpen ? 'translateY(0)' : 'translateY(30px)',
                  transition: 'opacity 0.5s ease, transform 0.5s ease',
                }}
              >
                {link.label}
              </a>
            ) : (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="text-sm font-medium text-white/85 hover:text-gold transition-colors duration-200 uppercase tracking-wider"
                style={{
                  transitionDelay: mobileOpen ? `${i * 80}ms` : '0ms',
                  opacity: mobileOpen ? 1 : 0,
                  transform: mobileOpen ? 'translateY(0)' : 'translateY(30px)',
                  transition: 'opacity 0.5s ease, transform 0.5s ease',
                }}
              >
                {link.label}
              </button>
            );
          })}
          
          <a
            href="https://realestatedates.realty"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileOpen(false)}
            className="mt-4 px-8 py-3 bg-gold text-dark text-base sm:text-lg font-semibold rounded-full hover:bg-gold-light transition-all duration-200 uppercase tracking-widest"
            style={{
              transitionDelay: mobileOpen ? `${navLinks.length * 80}ms` : '0ms',
              opacity: mobileOpen ? 1 : 0,
              transform: mobileOpen ? 'translateY(0)' : 'translateY(30px)',
              transition: 'opacity 0.5s ease, transform 0.5s ease',
            }}
          >
            {t('nav.exploreApp')}
          </a>
        </div>
      </div>
    </>
  );
}
