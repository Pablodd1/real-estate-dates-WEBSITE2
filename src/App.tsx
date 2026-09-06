import { BrowserRouter as Router, Routes, Route } from 'react-router';
import { useState, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import GoldParticles from '@/components/GoldParticles';
import CustomCursor from '@/components/CustomCursor';
import AgeGate from '@/components/AgeGate';
import CookieBanner from '@/components/CookieBanner';
import Home from '@/pages/Home';
import BlogPost from '@/pages/BlogPost';
import { Toaster } from 'sonner';
import { initAnalytics } from '@/lib/analytics';

gsap.registerPlugin(ScrollTrigger);

function App() {
  // Start verified:true so the full site content mounts in the DOM on first
  // render — crawlers and no-JS fetchers always see the real content. The
  // gate then covers it as an overlay (pre-paint via useLayoutEffect) for
  // unverified human visitors.
  const [ageVerified, setAgeVerified] = useState(true);

  useLayoutEffect(() => {
    // ponytail: check localStorage before first paint — skip age gate if already verified
    const verified = localStorage.getItem('ageVerified');
    if (verified !== 'true') {
      setAgeVerified(false);
      document.body.style.overflow = 'hidden';
    } else {
      initAnalytics();
    }
  }, []);

  const handleVerified = () => {
    localStorage.setItem('ageVerified', 'true');
    localStorage.setItem('ageVerifiedAt', new Date().toISOString());
    setAgeVerified(true);
    document.body.style.overflow = '';
    initAnalytics();
  };

  return (
    <Router>
      <CustomCursor />
      <GoldParticles />

      <div
        className="relative w-full overflow-x-hidden flex flex-col flex-1 min-h-screen"
        inert={!ageVerified ? true : undefined}
      >
        <div className="fixed inset-0 flex items-center justify-center -z-50 pointer-events-none overflow-hidden">
          <img
            src="/images/key.png"
            alt=""
            className="w-[150vh] h-[150vh] sm:w-[150vh] sm:h-[150vh] max-w-[120vw] max-h-[120vw] object-cover opacity-[0.22] brightness-[3.5] contrast-125 animate-spin-slow"
          />
        </div>
        
        <Navigation />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
        </Routes>

        <Footer />
      </div>

      {/* Age gate renders as an overlay — site content stays in the DOM
          underneath so search engines and AI crawlers can read it. */}
      {!ageVerified && <AgeGate onVerified={handleVerified} />}

      <CookieBanner />
      <Toaster theme="dark" position="top-center" />
    </Router>
  );
}

export default App;
