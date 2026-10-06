import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Handshake } from 'lucide-react';
import { useTranslation } from 'react-i18next';

gsap.registerPlugin(ScrollTrigger);

/**
 * Sponsors / cross-marketing strip — deliberately understated:
 * monochrome chips, low on the page, after social proof.
 * Swap the placeholder names in locales (partners.list) for real sponsors;
 * replace chip text with <img> logos when assets exist.
 */
export default function PartnersStrip() {
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useTranslation();

  const partners = t('partners.list', { returnObjects: true }) as string[];

  useGSAP(() => {
    if (!sectionRef.current) return;
    gsap.from('.partner-chip', {
      opacity: 0,
      y: 14,
      duration: 0.5,
      stagger: 0.06,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 90%',
        toggleActions: 'play none none none',
      },
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="partners" className="relative w-full py-10 sm:py-14">
      {/* dark scrim so the strip reads as intentional, not washed out */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-dark via-dark/85 to-dark" />
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6">
        <p className="flex items-center justify-center gap-2 text-[9px] sm:text-[10px] uppercase tracking-[0.28em] text-white/40 font-semibold mb-6">
          <Handshake className="w-3.5 h-3.5 text-gold/50" />
          {t('partners.sectionTitle')}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:gap-x-12">
          {partners.map((name, i) => (
            <span
              key={i}
              className="partner-chip text-sm sm:text-base font-semibold tracking-wide text-white/45 hover:text-gold/80 transition-colors duration-300 cursor-default select-none"
            >
              {name}
            </span>
          ))}
        </div>
        <p className="text-center text-[9px] sm:text-[10px] text-white/35 mt-6">
          {t('partners.note')}
        </p>
      </div>
    </section>
  );
}
