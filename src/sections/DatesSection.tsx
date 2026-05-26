import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeader from '@/components/SectionHeader';
import FeatureCard from '@/components/FeatureCard';
import { Calendar, Video } from 'lucide-react';
import { useTranslation } from 'react-i18next';

gsap.registerPlugin(ScrollTrigger);

// Move dateFeatures inside component

export default function DatesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useTranslation();

  const dateFeatures = [
    {
      icon: <Calendar className="w-full h-full" strokeWidth={1.5} />,
      iconColor: 'text-gold',
      title: t('dates.features.feature1.title'),
      description: t('dates.features.feature1.description'),
      tags: t('dates.features.feature1.tags', { returnObjects: true }) as string[],
      variant: 'glass' as const,
    },
    {
      icon: <Video className="w-full h-full" strokeWidth={1.5} />,
      iconColor: 'text-gold',
      title: t('dates.features.feature2.title'),
      description: t('dates.features.feature2.description'),
      tags: t('dates.features.feature2.tags', { returnObjects: true }) as string[],
      variant: 'glass' as const,
    },
  ];

  useGSAP(() => {
    if (!sectionRef.current) return;

    // Left image
    gsap.from('.dates-image', {
      x: -60,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    });

    // Right text content
    const textEls = sectionRef.current.querySelectorAll('.dates-text');
    gsap.from(textEls, {
      y: 30,
      duration: 0.7,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    // Feature cards
    const cards = sectionRef.current.querySelectorAll('.dates-card');
    gsap.from(cards, {
      y: 40,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current.querySelector('.dates-cards'),
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="dates" data-theme="dark" className="relative w-full py-6 sm:py-10">
      {/* Couple background image */}
      <div 
        className="absolute inset-0 -z-10 bg-cover bg-center opacity-12"
        style={{ backgroundImage: 'url(/images/key.png)' }}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-dark via-dark/95 to-dark" />
      <div className="max-w-[1280px] mx-auto px-6 relative z-10">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12">
          {/* Left - Image */}
          <div className="dates-image w-full lg:w-1/2">
            <div className="rounded-xl shadow-xl hover:scale-[1.02] transition-transform duration-400">
              <img
                src="/images/coffee.png"
                alt="Happy couple at open house date"
                className="w-full aspect-[4/3] object-cover"
              />
            </div>
          </div>

          {/* Right - Feature Stack */}
          <div className="w-full lg:w-1/2">
            <div className="dates-text">
              <SectionHeader
                eyebrow={t('dates.sectionTitle')}
                headline={t('dates.title')}
                subheadline={t('dates.subtitle')}
                theme="dark"
                centered={false}
              />
            </div>

            <div className="dates-cards space-y-6 -mt-4">
              {dateFeatures.map((feature) => (
                <div key={feature.title} className="dates-card">
                  <FeatureCard {...feature} />
                </div>
              ))}
            </div>

            <button className="dates-text mt-8 inline-flex items-center px-8 py-3 bg-gold hover:bg-gold-light text-dark font-semibold text-sm rounded-lg transition-all duration-200 hover:shadow-glow">
              {t('dates.cta')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
