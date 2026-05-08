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
import DownloadSection from '@/sections/DownloadSection';
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
      <Toaster theme="dark" position="top-center" />
    </>
  );
}

export default App;
