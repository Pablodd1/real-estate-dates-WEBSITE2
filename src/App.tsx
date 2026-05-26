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
        {/* Background Image (Golden Key) with Dynamic Zoom */}
        <div 
          className="fixed inset-0 w-full h-full bg-cover bg-center -z-50 pointer-events-none" 
          style={{ 
            backgroundImage: 'url(/images/key.png)',
            animation: 'pulseZoom 20s infinite alternate ease-in-out'
          }} 
        />
        <style>{`
          @keyframes pulseZoom {
            0% { transform: scale(1); }
            100% { transform: scale(1.05); }
          }
        `}</style>
        
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
