import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Globe, ArrowDown } from 'lucide-react';
import { LogoIcon } from '@/components/Logo';
import { useTranslation } from 'react-i18next';

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useTranslation();

  useGSAP(() => {
    if (!sectionRef.current) return;

    // Scroll indicator bounce
    gsap.to('.scroll-indicator', {
      y: 8,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full flex flex-col items-center justify-center overflow-hidden bg-transparent hero-container"
    >
      {/* Dark panel for text contrast */}
      <div className="absolute inset-x-0 top-0 h-full -z-10 bg-gradient-to-b from-black/70 via-black/50 to-black/30 pointer-events-none" />

      <div className="relative z-20 flex flex-col items-center text-center px-4 sm:px-6 max-w-[800px] mx-auto w-full">
        {/* Text card with backdrop for contrast */}
        <div className="liquid-glass rounded-2xl sm:rounded-3xl px-6 sm:px-10 py-4 sm:py-8  shadow-2xl">
        {/* Logo */}
        <div className="mb-2 sm:mb-4">
          <LogoIcon className="w-10 h-10 sm:w-14 sm:h-14 text-gold mx-auto" />
          <p className="text-gold font-script text-sm sm:text-base italic mt-1">{t('hero.subtitle')}</p>
        </div>

        {/* Tagline */}
        <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.4em] text-gold font-medium mb-3 sm:mb-4 px-4 text-glow">
          {t('hero.tagline')}
        </p>
        
        <h1 className="font-script text-gold text-3xl sm:text-5xl md:text-6xl lg:text-7xl italic mb-4 sm:mb-6 leading-[1.1] sm:leading-[1.05] tracking-tight px-2 text-glow-strong">
          {t('hero.title')}
        </h1>

        <div className="max-w-[600px] mx-auto mb-6 sm:mb-8 px-4">
          <p className="text-sm sm:text-base md:text-lg text-white leading-relaxed font-light text-shadow-dark">
            {t('hero.descriptionPart1')}<span className="bg-gold text-dark px-1.5 py-0.5 rounded-sm font-bold uppercase tracking-wider mx-1">{t('hero.descriptionHighlight')}</span>{t('hero.descriptionPart2')}
          </p>
        </div>

        {/* CTA - No login required */}
        <a 
          href="#discover" 
          className="group relative flex items-center justify-center gap-3 px-6 sm:px-8 py-3 sm:py-3.5 bg-gold text-dark font-semibold text-xs sm:text-sm uppercase tracking-wider rounded-full hover:bg-gold-light transition-all duration-300"
        >
          <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12" />
          <Globe className="w-4 h-4 sm:w-5 sm:h-5 relative z-10 transition-transform group-hover:rotate-12" />
          <span className="relative z-10">{t('hero.cta')}</span>
        </a>
        </div>

        {/* Scroll indicator */}
        <div className="scroll-indicator mt-4 sm:mt-6 flex flex-col items-center gap-1 text-white/80">
          <span className="text-[10px] uppercase tracking-[0.2em]">{t('hero.scroll')}</span>
          <ArrowDown className="w-4 h-4" />
        </div>

        {/* Footer */}
        <p className="mt-6 sm:mt-8 text-[10px] uppercase tracking-[0.2em] text-white/70 font-medium">
          {t('hero.copyright')}
        </p>
      </div>
    </section>
  );
}
