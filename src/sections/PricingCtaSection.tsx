import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Globe, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

gsap.registerPlugin(ScrollTrigger);

// Moved inside component

export default function PricingCtaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useTranslation();

  const trustIndicators = t('pricingCta.indicators', { returnObjects: true }) as string[];

  useGSAP(() => {
    if (!sectionRef.current) return;

    const textEls = sectionRef.current.querySelectorAll('.cta-text');
    gsap.from(textEls, {
      y: 30,
      duration: 0.7,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    });

    gsap.from('.cta-mockup', {
      x: 60,
      duration: 1,
      delay: 0.3,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="pricing" data-theme="dark" className="relative w-full py-6 sm:py-10">
      {/* Couple background image */}
      <div 
        className="absolute inset-0 -z-10 bg-cover bg-center opacity-12"
        style={{ backgroundImage: 'url(/images/couple.png)' }}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-dark via-dark/95 to-dark" />
      {/* Floating orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute w-[400px] h-[400px] rounded-full animate-float-1 opacity-[0.04]"
          style={{ background: '#D4AF37', filter: 'blur(100px)', top: '10%', left: '20%' }}
        />
        <div
          className="absolute w-[500px] h-[500px] rounded-full animate-float-2 opacity-[0.03]"
          style={{ background: '#D4AF37', filter: 'blur(100px)', top: '40%', right: '10%' }}
        />
        <div
          className="absolute w-[350px] h-[350px] rounded-full animate-float-3 opacity-[0.04]"
          style={{ background: '#D4AF37', filter: 'blur(100px)', bottom: '10%', left: '50%' }}
        />
      </div>

      <div className="max-w-[1280px] mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left - Text Content */}
          <div className="w-full lg:w-[55%]">
            <p className="cta-text text-xs font-medium uppercase tracking-[0.1em] text-gold mb-3">
              {t('pricingCta.sectionTitle')}
            </p>
            <div className="cta-text w-10 h-0.5 bg-gold mb-6" />
            <h2 className="cta-text text-4xl md:text-5xl font-semibold text-white leading-tight tracking-tight mb-5">
              {t('pricingCta.title')}
            </h2>
            <p className="cta-text text-lg text-white/80 leading-relaxed mb-8 max-w-[520px]">
              {t('pricingCta.subtitle')}
            </p>

            {/* Web App CTA */}
            <div className="cta-text flex flex-wrap gap-4 mb-6">
              <a
                href="https://www.realestatedates.realty"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gold text-dark text-sm font-bold rounded-xl hover:bg-gold-light hover:shadow-glow transition-all duration-200 group uppercase tracking-wider"
              >
                <Globe className="w-5 h-5 transition-transform group-hover:rotate-12" />
                <span>{t('pricingCta.cta')}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="cta-text flex flex-wrap gap-6">
              {trustIndicators.map((indicator) => (
                <div key={indicator} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-gold" strokeWidth={2.5} />
                  <span className="text-xs text-white/70">{indicator}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right - App Mockup */}
          <div className="cta-mockup w-full lg:w-[45%] flex justify-center" style={{ perspective: '1000px' }}>
            <div
              className="relative rounded-3xl shadow-2xl hover:scale-[1.02] transition-all duration-400"
              style={{ transform: 'rotateY(-8deg)' }}
            >
              <img
                src="/images/app.png"
                alt="Happy couple using dating app"
                className="w-full max-w-[350px] rounded-3xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
