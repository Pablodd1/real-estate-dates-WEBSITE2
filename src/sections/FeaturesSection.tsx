import { useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { KeyRound, Video, Shield, BadgeCheck, Eye, Lock, CalendarDays, MessageSquare } from 'lucide-react';
import { useTranslation } from 'react-i18next';

gsap.registerPlugin(ScrollTrigger);

// We will move the static array inside the component so it has access to `t`

function TiltCard({ children }: { children: React.ReactNode }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // Only enable 3D tilt on desktop (hover + fine pointer)
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -12;
      const rotateY = ((x - centerX) / centerX) * 12;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    };

    const handleMouseLeave = () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="group p-5 sm:p-6 liquid-glass rounded-xl  hover:border-gold/20 transition-all duration-300"
      style={{ transformStyle: 'preserve-3d', transition: 'transform 0.1s ease-out' }}
    >
      {children}
    </div>
  );
}

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useTranslation();

  const features = [
    {
      icon: <BadgeCheck className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} />,
      title: t('features.items.feature1.title'),
      desc: t('features.items.feature1.desc'),
    },
    {
      icon: <Eye className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} />,
      title: t('features.items.feature2.title'),
      desc: t('features.items.feature2.desc'),
    },
    {
      icon: <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} />,
      title: t('features.items.feature3.title'),
      desc: t('features.items.feature3.desc'),
    },
    {
      icon: <CalendarDays className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} />,
      title: t('features.items.feature4.title'),
      desc: t('features.items.feature4.desc'),
    },
    {
      icon: <KeyRound className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} />,
      title: t('features.items.feature5.title'),
      desc: t('features.items.feature5.desc'),
    },
    {
      icon: <Video className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} />,
      title: t('features.items.feature6.title'),
      desc: t('features.items.feature6.desc'),
    },
    {
      icon: <Shield className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} />,
      title: t('features.items.feature7.title'),
      desc: t('features.items.feature7.desc'),
    },
    {
      icon: <Lock className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} />,
      title: t('features.items.feature8.title'),
      desc: t('features.items.feature8.desc'),
    },
  ];

  useGSAP(() => {
    if (!sectionRef.current) return;

    const header = sectionRef.current.querySelectorAll('.feat-reveal');
    const cards = sectionRef.current.querySelectorAll('.feat-card');

    gsap.from(header, {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });

    gsap.from(cards, {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.06,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="features" className="relative w-full py-6 sm:py-10">
      {/* Couple background image */}
      <div 
        className="absolute inset-0 -z-10 bg-cover bg-center opacity-15"
        style={{ backgroundImage: 'url(/images/couple.png)' }}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-dark via-dark/95 to-dark" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-10 sm:mb-10">
          <p className="feat-reveal text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-gold font-medium mb-3">
            {t('features.sectionTitle')}
          </p>
          <h2 className="feat-reveal font-script text-gold text-3xl sm:text-4xl md:text-5xl lg:text-6xl italic mb-4">
            {t('features.mainTitle')}
          </h2>
          <p className="feat-reveal text-white/80 text-sm sm:text-base md:text-lg max-w-[520px] mx-auto px-2">
            {t('features.subtitle')}
          </p>
        </div>

        <div className="feat-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {features.map((feature) => (
            <div key={feature.title} className="feat-card">
              <TiltCard>
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gold/10 flex items-center justify-center text-gold mb-3 sm:mb-4 group-hover:bg-gold/20 transition-colors duration-300">
                  {feature.icon}
                </div>
                <h4 className="text-sm sm:text-base font-semibold text-white mb-1 sm:mb-2">{feature.title}</h4>
                <p className="text-xs sm:text-sm text-white/75 leading-relaxed">{feature.desc}</p>
              </TiltCard>
            </div>
          ))}
        </div>

        {/* Admin & Guide Showcase */}
        <div className="mt-10 sm:mt-12">
          <div className="text-center mb-10 sm:mb-8">
            <p className="feat-reveal text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-gold font-medium mb-3">
              {t('features.admin.sectionTitle')}
            </p>
            <h3 className="feat-reveal font-script text-gold text-2xl sm:text-3xl md:text-4xl italic mb-4">
              {t('features.admin.title')}
            </h3>
            <p className="feat-reveal text-white/80 text-sm sm:text-base max-w-[600px] mx-auto px-2">
              {t('features.admin.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-[800px] mx-auto">
            <div className="feat-card">
              <TiltCard>
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gold/10 flex items-center justify-center text-gold mb-3 sm:mb-4 group-hover:bg-gold/20 transition-colors duration-300">
                  <Shield className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} />
                </div>
                <h4 className="text-sm sm:text-base font-semibold text-white mb-1 sm:mb-2">{t('features.admin.item1.title')}</h4>
                <p className="text-xs sm:text-sm text-white/75 leading-relaxed">{t('features.admin.item1.desc')}</p>
              </TiltCard>
            </div>
            <div className="feat-card">
              <TiltCard>
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gold/10 flex items-center justify-center text-gold mb-3 sm:mb-4 group-hover:bg-gold/20 transition-colors duration-300">
                  <BadgeCheck className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} />
                </div>
                <h4 className="text-sm sm:text-base font-semibold text-white mb-1 sm:mb-2">{t('features.admin.item2.title')}</h4>
                <p className="text-xs sm:text-sm text-white/75 leading-relaxed">{t('features.admin.item2.desc')}</p>
              </TiltCard>
            </div>
          </div>
        </div>

        {/* Compliance Features */}
        <div className="mt-10 sm:mt-12">
          <div className="text-center mb-10 sm:mb-8">
            <p className="feat-reveal text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-gold font-medium mb-3">
              {t('features.compliance.sectionTitle')}
            </p>
            <h3 className="feat-reveal font-script text-gold text-2xl sm:text-3xl md:text-4xl italic mb-4">
              {t('features.compliance.title')}
            </h3>
            <p className="feat-reveal text-white/80 text-sm sm:text-base max-w-[600px] mx-auto px-2">
              {t('features.compliance.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <div className="feat-card">
              <TiltCard>
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gold/10 flex items-center justify-center text-gold mb-3 sm:mb-4 group-hover:bg-gold/20 transition-colors duration-300">
                  <Shield className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} />
                </div>
                <h4 className="text-sm sm:text-base font-semibold text-white mb-1 sm:mb-2">{t('features.compliance.item1.title')}</h4>
                <p className="text-xs sm:text-sm text-white/75 leading-relaxed">{t('features.compliance.item1.desc')}</p>
              </TiltCard>
            </div>
            <div className="feat-card">
              <TiltCard>
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gold/10 flex items-center justify-center text-gold mb-3 sm:mb-4 group-hover:bg-gold/20 transition-colors duration-300">
                  <Lock className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} />
                </div>
                <h4 className="text-sm sm:text-base font-semibold text-white mb-1 sm:mb-2">{t('features.compliance.item2.title')}</h4>
                <p className="text-xs sm:text-sm text-white/75 leading-relaxed">{t('features.compliance.item2.desc')}</p>
              </TiltCard>
            </div>
            <div className="feat-card">
              <TiltCard>
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gold/10 flex items-center justify-center text-gold mb-3 sm:mb-4 group-hover:bg-gold/20 transition-colors duration-300">
                  <BadgeCheck className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} />
                </div>
                <h4 className="text-sm sm:text-base font-semibold text-white mb-1 sm:mb-2">{t('features.compliance.item3.title')}</h4>
                <p className="text-xs sm:text-sm text-white/75 leading-relaxed">{t('features.compliance.item3.desc')}</p>
              </TiltCard>
            </div>
            <div className="feat-card">
              <TiltCard>
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gold/10 flex items-center justify-center text-gold mb-3 sm:mb-4 group-hover:bg-gold/20 transition-colors duration-300">
                  <Eye className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} />
                </div>
                <h4 className="text-sm sm:text-base font-semibold text-white mb-1 sm:mb-2">{t('features.compliance.item4.title')}</h4>
                <p className="text-xs sm:text-sm text-white/75 leading-relaxed">{t('features.compliance.item4.desc')}</p>
              </TiltCard>
            </div>
            <div className="feat-card">
              <TiltCard>
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gold/10 flex items-center justify-center text-gold mb-3 sm:mb-4 group-hover:bg-gold/20 transition-colors duration-300">
                  <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} />
                </div>
                <h4 className="text-sm sm:text-base font-semibold text-white mb-1 sm:mb-2">{t('features.compliance.item5.title')}</h4>
                <p className="text-xs sm:text-sm text-white/75 leading-relaxed">{t('features.compliance.item5.desc')}</p>
              </TiltCard>
            </div>
            <div className="feat-card">
              <TiltCard>
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gold/10 flex items-center justify-center text-gold mb-3 sm:mb-4 group-hover:bg-gold/20 transition-colors duration-300">
                  <CalendarDays className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} />
                </div>
                <h4 className="text-sm sm:text-base font-semibold text-white mb-1 sm:mb-2">{t('features.compliance.item6.title')}</h4>
                <p className="text-xs sm:text-sm text-white/75 leading-relaxed">{t('features.compliance.item6.desc')}</p>
              </TiltCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
