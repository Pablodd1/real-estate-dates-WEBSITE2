import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Heart } from 'lucide-react';
import { TagBadge } from '@/components/TagBadge';
import { useTranslation } from 'react-i18next';

gsap.registerPlugin(ScrollTrigger);

// Move features inside component

const tags = ['Single', 'Miami', 'Broker'];

export default function MatchingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useTranslation();

  const features = t('matching.features', { returnObjects: true }) as string[];

  useGSAP(() => {
    if (!sectionRef.current) return;

    // Left column card
    gsap.from('.matching-card-wrap', {
      x: -50,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    });

    // Right column text
    const textEls = sectionRef.current.querySelectorAll('.matching-text');
    gsap.from(textEls, {
      x: 50,
      duration: 0.7,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    });

    // Parallax on scroll
    gsap.to('.matching-card-main', {
      rotateY: 2,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="matching" className="relative w-full py-6 sm:py-10">
      {/* Decorative watermark */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 text-[200px] font-bold text-white/[0.03] -rotate-90 select-none pointer-events-none whitespace-nowrap">
        SWIPE
      </div>

      <div className="max-w-[1280px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left - Swipe Card */}
          <div className="matching-card-wrap w-full lg:w-[55%] flex justify-center" style={{ perspective: '1000px' }}>
            <div className="relative">
              {/* Ghost card */}
              <div
                className="absolute top-5 left-5 w-[280px] sm:w-[340px] lg:w-[400px] rounded-2xl shadow-xl opacity-30 blur-[2px]"
                style={{ transform: 'translate(20px, 20px)' }}
              >
                <div className="aspect-[4/5] liquid-glass" />
              </div>

              {/* Main card */}
              <div
                className="matching-card-main relative w-[280px] sm:w-[340px] lg:w-[400px] rounded-2xl shadow-xl liquid-glass "
                style={{ transform: 'rotateY(-5deg)' }}
              >
                {/* Image area */}
                <div className="relative aspect-[4/5]">
                  <img
                    src="/images/app.png"
                    alt="Happy couple"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/40 to-transparent" />
                  {/* Heart overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-80 transition-opacity duration-400">
                    <div className="w-16 h-16 rounded-full bg-gold flex items-center justify-center">
                      <Heart className="w-8 h-8 text-dark fill-dark" />
                    </div>
                  </div>
                </div>

                {/* Content area */}
                <div className="p-5 liquid-glass">
                  <h4 className="text-lg font-medium text-white mb-1">{t('matching.mockup.name')}</h4>
                  <p className="text-xs text-white/70 uppercase tracking-wide mb-3">{t('matching.mockup.profession')}</p>
                  <p className="text-sm text-white/80 mb-3">{t('matching.mockup.status')}</p>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <TagBadge key={tag} variant="category">{tag}</TagBadge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Text Content */}
          <div className="w-full lg:w-[45%]">
            <p className="matching-text text-xs font-medium uppercase tracking-[0.1em] text-gold mb-3">
              {t('matching.sectionTitle')}
            </p>
            <div className="matching-text w-10 h-0.5 bg-gold mb-6" />
            <h2 className="matching-text text-4xl md:text-5xl font-semibold text-white leading-tight tracking-tight mb-5">
              {t('matching.title')}
            </h2>
            <p className="matching-text text-lg text-white/80 leading-relaxed mb-8">
              {t('matching.subtitle')}
            </p>

            <ul className="matching-text space-y-4 mb-8">
              {features.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-gold flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-dark" strokeWidth={3} />
                  </span>
                  <span className="text-white/80">{feature}</span>
                </li>
              ))}
            </ul>

            <a
              href="https://realestatedates.realty"
              target="_blank"
              rel="noopener noreferrer"
              className="matching-text inline-flex items-center px-8 py-3 bg-gold hover:bg-gold-light text-dark font-semibold text-sm rounded-lg transition-all duration-200 hover:shadow-glow"
            >
              {t('matching.cta')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
