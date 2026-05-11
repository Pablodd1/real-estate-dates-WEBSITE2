import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Globe, ArrowDown } from 'lucide-react';
import { LogoIcon } from '@/components/Logo';

// 3D Key Video Background Component
function KeyVideoBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-30"
        poster="/assets/key-poster.jpg"
      >
        <source src="https://cdn.coverr.co/videos/coverr-golden-key-in-the-lock-4865/1080p.mp4" type="video/mp4" />
      </video>
      
      {/* 3D Key Animation Overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="key-3d-container relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px]">
          {/* Animated golden key */}
          <div className="key-3d absolute inset-0 flex items-center justify-center">
            <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_0_30px_rgba(212,175,55,0.5)]">
              <defs>
                <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#D4AF37" />
                  <stop offset="50%" stopColor="#F4E4BC" />
                  <stop offset="100%" stopColor="#D4AF37" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              {/* Key head (circle) */}
              <circle cx="60" cy="100" r="35" fill="none" stroke="url(#goldGrad)" strokeWidth="4" filter="url(#glow)" />
              <circle cx="60" cy="100" r="20" fill="none" stroke="url(#goldGrad)" strokeWidth="3" />
              {/* Key shaft */}
              <rect x="90" y="95" width="80" height="10" rx="5" fill="url(#goldGrad)" filter="url(#glow)" />
              {/* Key teeth */}
              <rect x="140" y="105" width="15" height="20" rx="3" fill="url(#goldGrad)" />
              <rect x="155" y="105" width="12" height="15" rx="3" fill="url(#goldGrad)" />
              <rect x="167" y="105" width="10" height="10" rx="3" fill="url(#goldGrad)" />
              {/* Sparkle effects */}
              <circle cx="30" cy="70" r="2" fill="#F4E4BC" className="animate-pulse" />
              <circle cx="90" cy="60" r="1.5" fill="#F4E4BC" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
              <circle cx="170" cy="80" r="2" fill="#F4E4BC" className="animate-pulse" style={{ animationDelay: '1s' }} />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark/60 via-dark/40 to-dark" />
    </div>
  );
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    // Floating animation for 3D key
    gsap.to('.key-3d', {
      y: -15,
      rotation: 5,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    // Subtle rotation
    gsap.to('.key-3d-container', {
      rotationY: 15,
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    // Scroll indicator bounce
    gsap.to('.scroll-indicator', {
      y: 8,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden bg-dark"
    >
      {/* 3D Key Video Background */}
      <KeyVideoBackground />

      <div className="relative z-10 flex flex-col items-center text-center px-4 sm:px-6 max-w-[700px] mx-auto w-full">
        {/* Logo */}
        <div className="mb-4 sm:mb-6">
          <LogoIcon className="w-12 h-12 sm:w-16 sm:h-16 text-gold mx-auto" />
          <p className="text-gold font-script text-sm sm:text-base italic mt-2">Real Estate Dates</p>
        </div>

        {/* Tagline */}
        <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.4em] text-gold font-medium mb-4 sm:mb-6 px-4">
          Elite Real Estate Networking · Market Protocol Activated
        </p>
        
        <h1 className="font-script text-gold text-4xl sm:text-6xl md:text-7xl lg:text-8xl italic mb-6 sm:mb-8 leading-[1.1] sm:leading-[1.05] tracking-tight px-2">
          Unlock Your Empire
        </h1>

        <div className="max-w-[600px] mx-auto mb-8 sm:mb-10 px-6">
          <p className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed font-light">
            A dating app for real estate professionals who share similar interests and who are looking for that special someone to <span className="bg-gold text-dark px-1.5 py-0.5 rounded-sm font-bold uppercase tracking-wider mx-1">build an empire</span> with.
          </p>
        </div>

        {/* CTA - No login required */}
        <a 
          href="#discover" 
          className="group relative flex items-center justify-center gap-3 px-8 sm:px-10 py-3.5 sm:py-4 bg-gold text-dark font-semibold text-xs sm:text-sm uppercase tracking-wider rounded-full hover:bg-gold-light transition-all duration-300 overflow-hidden"
        >
          <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12" />
          <Globe className="w-4 h-4 sm:w-5 sm:h-5 relative z-10 transition-transform group-hover:rotate-12" />
          <span className="relative z-10">Explore Profiles</span>
        </a>

        {/* Scroll indicator */}
        <div className="scroll-indicator mt-12 sm:mt-16 flex flex-col items-center gap-2 text-white/30">
          <span className="text-[10px] uppercase tracking-[0.2em]">Scroll to explore</span>
          <ArrowDown className="w-4 h-4" />
        </div>

        {/* Footer */}
        <p className="mt-8 sm:mt-12 text-[10px] uppercase tracking-[0.2em] text-white/20 font-medium">
          Real Estate Dates © 2025
        </p>
      </div>
    </section>
  );
}
