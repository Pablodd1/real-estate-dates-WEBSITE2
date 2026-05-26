import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, Eye, KeyRound, Video, CalendarCheck, Lock } from 'lucide-react';
import { useTranslation } from 'react-i18next';

gsap.registerPlugin(ScrollTrigger);

// Removed compliance steps

export default function HowItWorksSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useTranslation();

  const steps = [
    {
      number: '01',
      title: t('howItWorks.step1.title'),
      desc: t('howItWorks.step1.desc'),
      icon: <Search className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2} />,
    },
    {
      number: '02',
      title: t('howItWorks.step2.title'),
      desc: t('howItWorks.step2.desc'),
      icon: <Eye className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2} />,
    },
    {
      number: '03',
      title: t('howItWorks.step3.title'),
      desc: t('howItWorks.step3.desc'),
      icon: <KeyRound className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2} />,
    },
    {
      number: '04',
      title: t('howItWorks.step4.title'),
      desc: t('howItWorks.step4.desc'),
      icon: <Video className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2} />,
    },
    {
      number: '05',
      title: t('howItWorks.step5.title'),
      desc: t('howItWorks.step5.desc'),
      icon: <CalendarCheck className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2} />,
    },
    {
      number: '06',
      title: t('howItWorks.step6.title'),
      desc: t('howItWorks.step6.desc'),
      icon: <Lock className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2} />,
    },
  ];

  useGSAP(() => {
    if (!sectionRef.current) return;

    const reveals = sectionRef.current.querySelectorAll('.hiw-reveal');
    gsap.from(reveals, {
      y: 30,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="how-it-works" className="relative w-full py-6 sm:py-10">
      {/* Removed static couple background so video shows through liquid glass */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-dark via-dark/95 to-dark" />
      <div className="max-w-[800px] mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-6">
          <p className="hiw-reveal text-[11px] uppercase tracking-[0.3em] text-gold font-medium mb-2">
            {t('howItWorks.journey')}
          </p>
          <h2 className="hiw-reveal font-script text-gold text-4xl sm:text-5xl md:text-6xl italic mb-3">
            {t('howItWorks.title')}
          </h2>
          <p className="hiw-reveal text-white/80 text-sm sm:text-base max-w-[520px] mx-auto">
            {t('howItWorks.subtitle')}
          </p>
        </div>

        {/* Step list */}
        <div className="space-y-3">
          {steps.map((step) => (
            <div
              key={step.number}
              className="hiw-reveal hiw-card liquid-glass rounded-xl  p-6 flex items-center gap-6 hover:border-gold/20 transition-all duration-300 group"
            >
              <div className="w-12 h-12 shrink-0 rounded-lg bg-gold/10 flex items-center justify-center text-gold group-hover:bg-gold/20 transition-colors duration-300">
                {step.icon}
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-white mb-1">{step.title}</h4>
                <p className="text-sm text-white/75 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
