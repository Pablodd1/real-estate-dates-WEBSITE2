import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const trustIndicators = [
  'Free to use',
  'No hidden fees',
  'Cancel anytime',
];

export default function PricingCtaSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const textEls = sectionRef.current.querySelectorAll('.cta-text');
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

    gsap.from('.cta-mockup', {
      x: 60,
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
    <section ref={sectionRef} id="pricing" data-theme="dark" className="relative w-full py-[120px] bg-dark overflow-hidden">
      {/* Floating orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
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
              Download the App
            </p>
            <div className="cta-text w-10 h-0.5 bg-gold mb-6" />
            <h2 className="cta-text text-4xl md:text-5xl font-semibold text-white leading-tight tracking-tight mb-5">
              Your Dream Home Is One Swipe Away
            </h2>
            <p className="cta-text text-lg text-white/80 leading-relaxed mb-8 max-w-[520px]">
              Join over 50,000 happy home hunters. Available on iOS and Android. Free to download, free to swipe, free to match.
            </p>

            {/* App Store Buttons */}
            <div className="cta-text flex flex-wrap gap-4 mb-6">
              <div className="w-[140px] h-[48px] bg-white rounded-lg flex items-center justify-center cursor-pointer hover:brightness-110 transition-all duration-200">
                <div className="text-dark text-xs font-semibold flex items-center gap-2">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  App Store
                </div>
              </div>
              <div className="w-[140px] h-[48px] bg-white rounded-lg flex items-center justify-center cursor-pointer hover:brightness-110 transition-all duration-200">
                <div className="text-dark text-xs font-semibold flex items-center gap-2">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 20.5v-17c0-.83.67-1.5 1.5-1.5h.37L20.7 11.52c.37.28.37.68 0 .96L4.87 22h-.37c-.83 0-1.5-.67-1.5-1.5zM16.5 14.2L5.5 22V4.8l11 9.4zM19 4h-2v2h-2V4h-2V2h2V0h2v2h2v2z"/>
                  </svg>
                  Google Play
                </div>
              </div>
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
              className="relative rounded-3xl overflow-hidden shadow-2xl hover:scale-[1.02] transition-all duration-400"
              style={{ transform: 'rotateY(-8deg)' }}
            >
              <img
                src="/assets/cta-app-mockup.jpg"
                alt="Estate Match app"
                className="w-full max-w-[350px] rounded-3xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
