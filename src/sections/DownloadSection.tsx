import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Apple, Play, Search, Heart, MessageSquare, User, KeyRound } from 'lucide-react';
import { LogoIcon } from '@/components/Logo';

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  'Free to download',
  'No hidden fees',
  'Cancel anytime',
  'Verified professionals only',
];

export default function DownloadSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const textEls = sectionRef.current.querySelectorAll('.dl-reveal');
    gsap.from(textEls, {
      y: 30,
      opacity: 0,
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
      opacity: 0,
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
    <section ref={sectionRef} id="download" data-theme="dark" className="relative w-full py-20 sm:py-[120px] bg-dark overflow-hidden">
      {/* Floating orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
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
              Download the App
            </p>
            <h2 className="dl-reveal font-script text-gold text-3xl sm:text-4xl md:text-5xl italic mb-4 sm:mb-5">
              Your Empire Awaits
            </h2>
            <p className="dl-reveal text-base sm:text-lg text-white/60 leading-relaxed mb-6 sm:mb-8 max-w-[480px] mx-auto lg:mx-0">
              Join thousands of real estate professionals who are already building connections — and empires. Available on iOS and Android.
            </p>

            {/* Store Buttons */}
            <div className="dl-reveal flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 mb-6 sm:mb-8">
              <button className="w-full sm:w-auto flex items-center justify-center gap-3 px-5 sm:px-6 py-3 bg-white rounded-xl hover:bg-white/90 transition-all duration-200 group">
                <Apple className="w-5 h-5 sm:w-6 sm:h-6 text-dark" />
                <div className="text-left">
                  <p className="text-[9px] sm:text-[10px] text-dark/60 leading-none">Download on the</p>
                  <p className="text-xs sm:text-sm font-semibold text-dark leading-tight">App Store</p>
                </div>
              </button>
              <button className="w-full sm:w-auto flex items-center justify-center gap-3 px-5 sm:px-6 py-3 bg-white rounded-xl hover:bg-white/90 transition-all duration-200 group">
                <Play className="w-5 h-5 sm:w-6 sm:h-6 text-dark fill-dark" />
                <div className="text-left">
                  <p className="text-[9px] sm:text-[10px] text-dark/60 leading-none">Get it on</p>
                  <p className="text-xs sm:text-sm font-semibold text-dark leading-tight">Google Play</p>
                </div>
              </button>
            </div>

            {/* Benefits Legend */}
            <div className="dl-reveal mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-white/5 flex flex-wrap items-center justify-center lg:justify-start gap-x-4 sm:gap-x-6 gap-y-2 sm:gap-y-3">
              <span className="text-[9px] uppercase tracking-widest text-white/20 w-full mb-1">App Status Legend</span>
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-1.5 sm:gap-2">
                  <div className="w-1 h-1 rounded-full bg-gold/40" />
                  <span className="text-[10px] sm:text-xs text-white/40">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Phone Mockup */}
          <div className="dl-mockup w-full lg:w-[45%] flex justify-center" style={{ perspective: '1000px' }}>
            <div
              className="relative w-[220px] sm:w-[260px] md:w-[280px] h-[440px] sm:h-[520px] md:h-[560px] bg-dark-card rounded-[2rem] sm:rounded-[3rem] border-2 border-white/10 p-2 sm:p-3 shadow-2xl"
              style={{ transform: 'rotateY(-8deg) rotateX(5deg)' }}
            >
              {/* Screen */}
              <div className="w-full h-full bg-dark rounded-[1.5rem] sm:rounded-[2.5rem] overflow-hidden relative">
                {/* Status bar */}
                <div className="absolute top-0 left-0 right-0 h-6 sm:h-8 bg-dark-card/80 backdrop-blur-sm z-10 flex items-center justify-between px-4 sm:px-6">
                  <span className="text-[8px] sm:text-[10px] text-white/60">9:41</span>
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
                    <span className="text-[8px] sm:text-[10px] uppercase tracking-wider text-white/40">Elite</span>
                  </div>

                  {/* Profile card preview */}
                  <div className="relative rounded-xl sm:rounded-2xl overflow-hidden aspect-[3/4] mb-3 sm:mb-4">
                    <img
                      src="/assets/avatar-sarah.jpg"
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                      <h3 className="text-base sm:text-lg font-semibold text-white">Valentina Rossi</h3>
                      <p className="text-[10px] sm:text-xs text-gold">Luxury Broker</p>
                      <p className="text-[8px] sm:text-[10px] text-white/50 mt-0.5">Miami / Milan</p>
                    </div>
                  </div>

                  {/* Action bar */}
                  <div className="flex justify-center gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-dark-elevated border border-white/10 flex items-center justify-center">
                      <span className="text-white/60 text-base sm:text-lg">×</span>
                    </div>
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center">
                      <KeyRound className="w-5 h-5 sm:w-6 sm:h-6 text-gold" />
                    </div>
                  </div>
                </div>

                {/* Bottom nav */}
                <div className="absolute bottom-0 left-0 right-0 h-10 sm:h-14 bg-dark-card/90 backdrop-blur-sm border-t border-white/5 flex items-center justify-around px-3 sm:px-4">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 text-gold"><Search className="w-4 h-4 sm:w-5 sm:h-5" /></div>
                  <div className="w-4 h-4 sm:w-5 sm:h-5 text-white/30"><Heart className="w-4 h-4 sm:w-5 sm:h-5" /></div>
                  <div className="w-4 h-4 sm:w-5 sm:h-5 text-white/30"><MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" /></div>
                  <div className="w-4 h-4 sm:w-5 sm:h-5 text-white/30"><User className="w-4 h-4 sm:w-5 sm:h-5" /></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
