import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Star, Zap, Crown } from 'lucide-react';
import { useTranslation } from 'react-i18next';

gsap.registerPlugin(ScrollTrigger);

// Move static tiers array inside the component

export default function PricingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useTranslation();

  const tiers = [
    {
      name: t('pricing.tiers.free.name'),
      icon: <Zap className="w-5 h-5" strokeWidth={1.5} />,
      price: t('pricing.tiers.free.price'),
      period: t('pricing.tiers.free.period'),
      desc: t('pricing.tiers.free.desc'),
      features: t('pricing.tiers.free.features', { returnObjects: true }) as string[],
      cta: t('pricing.tiers.free.cta'),
      popular: false,
    },
    {
      name: t('pricing.tiers.pro.name'),
      icon: <Star className="w-5 h-5" strokeWidth={1.5} />,
      price: t('pricing.tiers.pro.price'),
      period: t('pricing.tiers.pro.period'),
      desc: t('pricing.tiers.pro.desc'),
      features: t('pricing.tiers.pro.features', { returnObjects: true }) as string[],
      cta: t('pricing.tiers.pro.cta'),
      popular: true,
    },
    {
      name: t('pricing.tiers.empire.name'),
      icon: <Crown className="w-5 h-5" strokeWidth={1.5} />,
      price: t('pricing.tiers.empire.price'),
      period: t('pricing.tiers.empire.period'),
      desc: t('pricing.tiers.empire.desc'),
      features: t('pricing.tiers.empire.features', { returnObjects: true }) as string[],
      cta: t('pricing.tiers.empire.cta'),
      popular: false,
    },
  ];

  useGSAP(() => {
    if (!sectionRef.current) return;

    const cards = sectionRef.current.querySelectorAll('.pricing-card');
    gsap.from(cards, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    });

    gsap.from('.pricing-title', {
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="relative w-full pricing-container"
    >
      {/* Couple background image */}
      <div 
        className="absolute inset-0 -z-10 bg-cover bg-center opacity-15"
        style={{ backgroundImage: 'url(/images/couple.png)' }}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-dark via-dark/95 to-dark" />
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <p className="pricing-title text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-gold font-medium mb-3">
            {t('pricing.sectionTitle')}
          </p>
          <h2 className="pricing-title font-script text-gold text-3xl sm:text-4xl md:text-5xl italic mb-4 sm:mb-5">
            {t('pricing.title')}
          </h2>
          <p className="pricing-title text-base sm:text-lg text-white/80 max-w-[550px] mx-auto leading-relaxed">
            {t('pricing.subtitle')}
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-5 sm:gap-6 max-w-[1000px] mx-auto">
          {tiers.map((tier, i) => (
            <div
              key={i}
              className={`pricing-card relative p-6 sm:p-8 rounded-2xl border transition-all duration-300 ${
                tier.popular
                  ? 'border-gold/30 bg-gold/[0.03] hover:border-gold/50'
                  : 'border-white/[0.06] bg-white/[0.02] hover:'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gold text-dark text-[10px] font-bold uppercase tracking-wider rounded-full">
                  {t('pricing.popularBadge')}
                </div>
              )}

              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  tier.popular ? 'bg-gold/20 text-gold' : 'bg-white/5 text-white/75'
                }`}>
                  {tier.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-white">{tier.name}</h3>
              </div>

              <div className="mb-4">
                <span className="text-3xl sm:text-4xl font-bold text-white">{tier.price}</span>
                <span className="text-sm text-white/75">{tier.period}</span>
              </div>

              <p className="text-sm text-white/75 mb-6">{tier.desc}</p>

              <ul className="space-y-3 mb-8">
                {tier.features.map((feature, fi) => (
                  <li key={fi} className="flex items-start gap-2.5 text-sm">
                    <Check className={`w-4 h-4 shrink-0 mt-0.5 ${
                      tier.popular ? 'text-gold' : 'text-white/75'
                    }`} strokeWidth={2} />
                    <span className="text-white/85">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href="https://www.realestatedates.realty"
                target="_blank"
                rel="noopener noreferrer"
                className={`block w-full py-3 text-center rounded-xl text-sm font-semibold transition-all duration-200 ${
                  tier.popular
                    ? 'bg-gold text-dark hover:bg-gold-light'
                    : 'bg-white/5 text-white hover:bg-white/10 '
                }`}
              >
                {tier.cta}
              </a>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p className="text-center text-xs text-white/70 mt-10 sm:mt-12">
          {t('pricing.footerNote')}
        </p>
      </div>
    </section>
  );
}
