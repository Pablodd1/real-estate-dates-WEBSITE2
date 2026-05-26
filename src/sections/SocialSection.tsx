import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, Handshake, Users, Coffee, Building2, MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

gsap.registerPlugin(ScrollTrigger);

// Data moved inside component for translation hooks

export default function SocialSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useTranslation();

  const socialPoints = [
    {
      icon: <Heart className="w-6 h-6" strokeWidth={1.5} />,
      title: t('social.points.p1.title'),
      desc: t('social.points.p1.desc'),
    },
    {
      icon: <Users className="w-6 h-6" strokeWidth={1.5} />,
      title: t('social.points.p2.title'),
      desc: t('social.points.p2.desc'),
    },
    {
      icon: <Coffee className="w-6 h-6" strokeWidth={1.5} />,
      title: t('social.points.p3.title'),
      desc: t('social.points.p3.desc'),
    },
    {
      icon: <Building2 className="w-6 h-6" strokeWidth={1.5} />,
      title: t('social.points.p4.title'),
      desc: t('social.points.p4.desc'),
    },
    {
      icon: <MessageCircle className="w-6 h-6" strokeWidth={1.5} />,
      title: t('social.points.p5.title'),
      desc: t('social.points.p5.desc'),
    },
    {
      icon: <Handshake className="w-6 h-6" strokeWidth={1.5} />,
      title: t('social.points.p6.title'),
      desc: t('social.points.p6.desc'),
    },
  ];

  useGSAP(() => {
    if (!sectionRef.current) return;

    const items = sectionRef.current.querySelectorAll('.social-item');
    gsap.from(items, {
      y: 30,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    });

    gsap.from('.social-title', {
      y: 20,
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
      id="social"
      className="relative w-full py-6 sm:py-10"
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
          <p className="social-title text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-gold font-medium mb-2">
            {t('social.sectionTitle')}
          </p>
          <h2 className="social-title font-script text-gold text-3xl sm:text-4xl md:text-5xl italic mb-3 sm:mb-4">
            {t('social.title')}
          </h2>
          <p className="social-title text-base sm:text-lg text-white/80 max-w-[600px] mx-auto leading-relaxed">
            {t('social.subtitle')}
          </p>
        </div>

        {/* Social Points Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 max-w-[1000px] mx-auto">
          {socialPoints.map((point, i) => (
            <div
              key={i}
              className="social-item p-5 sm:p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-gold/20 transition-all duration-300"
            >
              <div className="w-11 h-11 rounded-xl bg-gold/10 flex items-center justify-center text-gold mb-4">
                {point.icon}
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-white mb-2">
                {point.title}
              </h3>
              <p className="text-sm text-white/80 leading-relaxed">
                {point.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
