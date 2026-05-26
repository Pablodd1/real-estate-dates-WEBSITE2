import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import GoldParticles from '@/components/GoldParticles';
import CustomCursor from '@/components/CustomCursor';
import HeroSection from '@/sections/HeroSection';
import DiscoverSection from '@/sections/DiscoverSection';
import HowItWorksSection from '@/sections/HowItWorksSection';
import FeaturesSection from '@/sections/FeaturesSection';
import MatchingSection from '@/sections/MatchingSection';
import DatesSection from '@/sections/DatesSection';
import EventsSection from '@/sections/EventsSection';
import PricingSection from '@/sections/PricingSection';
import SocialSection from '@/sections/SocialSection';
import TestimonialsSection from '@/sections/TestimonialsSection';
import { LegalProtectionSection } from '@/sections/LegalProtectionSection';
import BlogSection from '@/sections/BlogSection';
import PricingCtaSection from '@/sections/PricingCtaSection';
import { Toaster } from 'sonner';

gsap.registerPlugin(ScrollTrigger);

function App() {
  return (
    <>
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Gold Particles */}
      <GoldParticles />

      {/* Main Content */}
      <div className="relative w-full overflow-hidden flex flex-col flex-1">
        {/* Background Image (Golden Key) with Spinning Animation */}
        <div className="fixed inset-0 flex items-center justify-center -z-50 pointer-events-none overflow-hidden">
          <img 
            src="/images/key.png" 
            alt="" 
            className="w-[150vw] h-[150vw] sm:w-[150vh] sm:h-[150vh] object-cover opacity-10 animate-spin-slow"
          />
        </div>
        
        <Navigation />
        <main className="relative z-0 main-content">
          <HeroSection />
          <DiscoverSection />
          <HowItWorksSection />
          <FeaturesSection />
          <MatchingSection />
          <DatesSection />
          <EventsSection />
          <SocialSection />
          <PricingSection />
          <TestimonialsSection />
          <LegalProtectionSection />
          <BlogSection />
          <PricingCtaSection />
        </main>
        <Footer />
      </div>
      <Toaster theme="dark" position="top-center" />
    </>
  );
}

export default App;
