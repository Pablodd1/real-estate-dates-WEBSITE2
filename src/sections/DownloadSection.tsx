import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Globe, ArrowRight, Search, Heart, MessageSquare, User, KeyRound } from 'lucide-react';
import { LogoIcon } from '@/components/Logo';
import { useTranslation } from 'react-i18next';

gsap.registerPlugin(ScrollTrigger);

// Move benefits inside component

export default function DownloadSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useTranslation();

  const benefits = t('download.benefits', { returnObjects: true }) as string[];

  useGSAP(() => {
    if (!sectionRef.current) return;

    const textEls = sectionRef.current.querySelectorAll('.dl-reveal');
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

    gsap.from('.dl-mockup', {
      y: 60,
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
    <section ref={sectionRef} id="download" data-theme="dark" className="relative w-full py-6 sm:py-10">
      {/* Couple background image */}
      <div 
        className="absolute inset-0 -z-10 bg-cover bg-center opacity-12"
        style={{ backgroundImage: 'url(/images/coffee.png)' }}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-dark via-dark/95 to-dark" />
      {/* Floating orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] rounded-full animate-float opacity-[0.04]"
          style={{ background: '#D4AF37', filter: 'blur(100px)', top: '10%', left: '10%' }}
        />
        <div
          className="absolute w-[400px] sm:w-[500px] h-[400px] sm:h-[500px] rounded-full animate-float opacity-[0.03]"
          style={{ background: '#D4AF37', filter: 'blur(100px)', bottom: '10%', right: '5%', animationDelay: '3s' }}
        />
      </div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-10 sm:gap-16">
          {/* Left - Text */}
          <div className="w-full lg:w-[55%] text-center lg:text-left">
            <div className="dl-reveal flex items-center justify-center lg:justify-start gap-3 mb-6">
              <LogoIcon className="w-8 h-8 sm:w-10 sm:h-10 text-gold" />
              <span className="font-script text-gold text-xl sm:text-2xl italic">Real Estate Dates</span>
            </div>

            <p className="dl-reveal text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-gold font-medium mb-3">
              {t('download.sectionTitle')}
            </p>
            <h2 className="dl-reveal font-script text-gold text-3xl sm:text-4xl md:text-5xl italic mb-4 sm:mb-5">
              {t('download.title')}
            </h2>
            <p className="dl-reveal text-base sm:text-lg text-white/85 leading-relaxed mb-6 sm:mb-8 max-w-[480px] mx-auto lg:mx-0">
              {t('download.subtitle')}
            </p>

            {/* Web App CTA */}
            <div className="dl-reveal w-full mb-6 sm:mb-8">
              <a
                href="https://www.realestatedates.realty"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-gold text-dark text-sm sm:text-base font-bold rounded-xl hover:bg-gold-light hover:shadow-glow transition-all duration-200 group uppercase tracking-wider"
              >
                <Globe className="w-5 h-5 transition-transform group-hover:rotate-12" />
                <span>{t('download.cta')}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>

            {/* Benefits Legend */}
            <div className="dl-reveal mt-10 sm:mt-12 pt-8 sm:pt-10 border-t  flex flex-wrap items-center justify-start gap-x-6 sm:gap-x-8 gap-y-3 sm:gap-y-4">
              <span className="text-[10px] uppercase tracking-[0.3em] text-gold/40 w-full mb-2">{t('download.benefitsTitle')}</span>
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-2 sm:gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold/50 shadow-[0_0_8px_rgba(212,175,55,0.4)]" />
                  <span className="text-[11px] sm:text-xs text-white/80 font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Phone Mockup */}
          <div className="dl-mockup w-full lg:w-[45%] flex justify-center" style={{ perspective: '1000px' }}>
            <div
              className="relative w-[220px] sm:w-[260px] md:w-[280px] h-[440px] sm:h-[520px] md:h-[560px] liquid-glass rounded-[2rem] sm:rounded-[3rem] border-2  p-2 sm:p-3 shadow-2xl"
              style={{ transform: 'rotateY(-8deg) rotateX(5deg)' }}
            >
              {/* Screen */}
              <div className="w-full h-full bg-transparent rounded-[1.5rem] sm:rounded-[2.5rem] relative">
                {/* Status bar */}
                <div className="absolute top-0 left-0 right-0 h-6 sm:h-8 liquid-glass/80 backdrop-blur-sm z-10 flex items-center justify-between px-4 sm:px-6">
                  <span className="text-[8px] sm:text-[10px] text-white/85">9:41</span>
                  <div className="flex gap-1">
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-white/20" />
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-white/20" />
                  </div>
                </div>

                {/* App content */}
                <div className="pt-8 sm:pt-10 px-3 sm:px-4">
                  {/* Nav */}
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <LogoIcon className="w-5 h-5 sm:w-6 sm:h-6 text-gold" />
                    <span className="text-[8px] sm:text-[10px] uppercase tracking-wider text-white/75">Elite</span>
                  </div>

                  {/* Profile card preview */}
                  <div className="relative rounded-xl sm:rounded-2xl aspect-[3/4] mb-3 sm:mb-4">
                    <img
                      src="/images/app.png"
                      alt="Dating profile"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 -z-10 bg-gradient-to-t from-dark via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                      <h3 className="text-base sm:text-lg font-semibold text-white">{t('download.mockup.name')}</h3>
                      <p className="text-[10px] sm:text-xs text-gold">{t('download.mockup.profession')}</p>
                      <p className="text-[8px] sm:text-[10px] text-white/80 mt-0.5">{t('download.mockup.status')}</p>
                    </div>
                  </div>

                  {/* Action bar */}
                  <div className="flex justify-center gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-transparent-elevated  flex items-center justify-center">
                      <span className="text-white/85 text-base sm:text-lg">×</span>
                    </div>
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center">
                      <KeyRound className="w-5 h-5 sm:w-6 sm:h-6 text-gold" />
                    </div>
                  </div>
                </div>

                {/* Bottom nav */}
                <div className="absolute bottom-0 left-0 right-0 h-10 sm:h-14 liquid-glass/90 backdrop-blur-sm border-t  flex items-center justify-around px-3 sm:px-4">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 text-gold"><Search className="w-4 h-4 sm:w-5 sm:h-5" /></div>
                  <div className="w-4 h-4 sm:w-5 sm:h-5 text-white/75"><Heart className="w-4 h-4 sm:w-5 sm:h-5" /></div>
                  <div className="w-4 h-4 sm:w-5 sm:h-5 text-white/75"><MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" /></div>
                  <div className="w-4 h-4 sm:w-5 sm:h-5 text-white/75"><User className="w-4 h-4 sm:w-5 sm:h-5" /></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
