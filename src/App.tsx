import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import GoldParticles from '@/components/GoldParticles';
import CustomCursor from '@/components/CustomCursor';
import HeroSection from '@/sections/HeroSection';
import DiscoverSection from '@/sections/DiscoverSection';
import HowItWorksSection from '@/sections/HowItWorksSection';
import FeaturesSection from '@/sections/FeaturesSection';
import DownloadSection from '@/sections/DownloadSection';
import { LogoIcon } from '@/components/Logo';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [loading, setLoading] = useState(true);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Loading Overlay */}
      <div
        className={`fixed inset-0 z-[9999] bg-dark flex flex-col items-center justify-center transition-opacity duration-700 ${
          loading ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="animate-pulse">
          <LogoIcon className="w-20 h-20 text-gold" />
        </div>
        <p className="text-gold/60 text-lg font-script italic mt-4">Real Estate Dates</p>
      </div>

      {/* Custom Cursor */}
      <CustomCursor />

      {/* Gold Particles */}
      <GoldParticles />

      {/* Main Content */}
      <div className="relative">
        <Navigation />
        <main>
          <HeroSection />
          <DiscoverSection />
          <HowItWorksSection />
          <FeaturesSection />
          <DownloadSection />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
