import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import SectionHeader from '@/components/SectionHeader';

gsap.registerPlugin(ScrollTrigger);

const KEYS = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8'] as const;

/**
 * Help Center / FAQ — the visible user-reference counterpart to the
 * FAQPage schema in index.html. Accordion, one open at a time.
 */
export default function FaqSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { t } = useTranslation();

  useGSAP(() => {
    if (!sectionRef.current) return;
    gsap.from('.faq-item', {
      y: 24,
      opacity: 0,
      duration: 0.5,
      stagger: 0.06,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="faq" className="relative w-full py-6 sm:py-10">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-dark via-dark/95 to-dark" />

      <div className="max-w-[820px] mx-auto px-4 sm:px-6 relative z-10">
        <SectionHeader
          eyebrow={t('faq.sectionTitle')}
          headline={t('faq.title')}
          subheadline={t('faq.subtitle')}
          theme="dark"
        />

        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
          {KEYS.map((key, i) => (
            <div key={key} className="faq-item border-b border-white/[0.05] last:border-b-0">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center gap-3 px-5 sm:px-6 py-4 sm:py-5 text-left hover:bg-white/[0.02] transition-colors"
                aria-expanded={openIndex === i}
              >
                <HelpCircle className="w-4 h-4 text-gold/70 shrink-0" />
                <span className="flex-1 text-sm sm:text-base font-medium text-white leading-snug">
                  {t(`faq.items.${key}.q`)}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-gold/60 shrink-0 transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${openIndex === i ? 'max-h-96' : 'max-h-0'}`}
              >
                <p className="px-5 sm:px-6 pb-5 pl-[3.25rem] sm:pl-[3.5rem] text-sm text-white/75 leading-relaxed">
                  {t(`faq.items.${key}.a`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
