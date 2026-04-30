import { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Globe, Shield, User, KeyRound } from 'lucide-react';
import { LogoIcon } from '@/components/Logo';


export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useGSAP(() => {
    if (!sectionRef.current || !loaded) return;

    // Removed entrance animations to ensure visibility even if browser hangs
    
    // Floating animation for logo
    gsap.to('.hero-logo-icon', {
      y: -5,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  }, { scope: sectionRef, dependencies: [loaded] });

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full min-h-[100dvh] flex flex-col items-center justify-start overflow-hidden bg-dark"
    >
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 30%, rgba(212,175,55,0.06) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center px-4 sm:px-6 max-w-[600px] mx-auto w-full pt-[100px] sm:pt-[120px] pb-16">
        {/* Logo */}
        <div className="hero-logo-icon mb-4 sm:mb-6">
          <LogoIcon className="w-14 h-14 sm:w-20 sm:h-20 text-gold mx-auto" />
          <p className="hero-logo-text text-gold font-script text-sm sm:text-base italic mt-2">Real Estate Dates</p>
        </div>

        {/* Tagline */}
        <p className="hero-tagline text-[10px] sm:text-[11px] uppercase tracking-[0.4em] text-gold font-medium mb-4 sm:mb-6 px-4">
          Elite Real Estate Networking &middot; Market Protocol Activated
        </p>
        
        <h1 className="hero-title font-script text-gold text-4xl sm:text-6xl md:text-7xl lg:text-8xl italic mb-6 sm:mb-8 leading-[1.1] sm:leading-[1.05] tracking-tight px-2">
          Real Estate Dates
        </h1>

        <div className="hero-desc max-w-[600px] mx-auto mb-10 sm:mb-12 px-6">
          <p className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed font-light">
            A dating app for real estate professionals who share similar interests and who are looking for that special someone to <span className="bg-gold text-dark px-1.5 py-0.5 rounded-sm font-bold uppercase tracking-wider mx-1">build an empire</span> with.
          </p>
        </div>

        {/* Primary CTA */}
        <button className="hero-cta-main group relative w-full max-w-[300px] sm:max-w-[320px] flex items-center justify-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 bg-gold text-dark font-semibold text-xs sm:text-sm uppercase tracking-wider rounded-full hover:bg-gold-light transition-all duration-300 overflow-hidden">
          <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12" />
          <Globe className="w-4 h-4 sm:w-5 sm:h-5 relative z-10 transition-transform group-hover:rotate-12" />
          <span className="relative z-10">Continue with Google</span>
        </button>

        {/* Divider */}
        <div className="hero-divider w-full max-w-[300px] sm:max-w-[320px] flex items-center gap-3 sm:gap-4 my-5 sm:my-6">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-medium whitespace-nowrap">Or Try Demo</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Demo Buttons */}
        <div className="w-full max-w-[300px] sm:max-w-[320px] space-y-2.5 sm:space-y-3">
          <button className="hero-demo-btn group w-full flex items-center justify-center gap-3 px-5 sm:px-6 py-3 sm:py-3.5 bg-dark-elevated text-white/80 font-semibold text-[11px] sm:text-xs uppercase tracking-wider rounded-full hover:bg-dark-border hover:text-white transition-all duration-300 border border-white/5 hover:border-gold/20 hover:shadow-glow">
            <Shield className="w-4 h-4 group-hover:scale-110 transition-transform" />
            Demo as Admin HQ
          </button>
          <button className="hero-demo-btn group w-full flex items-center justify-center gap-3 px-5 sm:px-6 py-3 sm:py-3.5 bg-dark-elevated text-white/80 font-semibold text-[11px] sm:text-xs uppercase tracking-wider rounded-full hover:bg-dark-border hover:text-white transition-all duration-300 border border-white/5 hover:border-gold/20">
            <User className="w-4 h-4 group-hover:scale-110 transition-transform" />
            Demo: Isabella (Standard)
          </button>
          <button className="hero-demo-btn group w-full flex items-center justify-center gap-3 px-5 sm:px-6 py-3 sm:py-3.5 bg-gold/10 text-gold font-semibold text-[11px] sm:text-xs uppercase tracking-wider rounded-full hover:bg-gold/20 transition-all duration-300 border border-gold/20 hover:border-gold/40 hover:shadow-glow">
            <KeyRound className="w-4 h-4 group-hover:scale-110 transition-transform" />
            Demo: Valentina (Elite)
          </button>
        </div>

        {/* Footer */}
        <p className="hero-footer mt-10 sm:mt-16 text-[10px] uppercase tracking-[0.2em] text-white/20 font-medium">
          Real Estate Dates &copy; 2025
        </p>
      </div>
    </section>
  );
}
