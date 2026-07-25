import { BrowserRouter as Router, Routes, Route } from 'react-router';
import { useState, useEffect } from 'react';
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

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [ageVerified, setAgeVerified] = useState(false);

  useEffect(() => {
    // ponytail: check localStorage on mount — skip age gate if already verified
    const verified = localStorage.getItem('ageVerified');
    if (verified === 'true') {
      setAgeVerified(true);
    }
  }, []);

  if (!ageVerified) {
    return <AgeGate onVerified={() => setAgeVerified(true)} />;
  }

  return (
    <Router>
      <CustomCursor />
      <GoldParticles />

      <div className="relative w-full overflow-x-hidden flex flex-col flex-1 min-h-screen">
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

      <CookieBanner />
      <Toaster theme="dark" position="top-center" />
    </Router>
  );
}

export default App;
