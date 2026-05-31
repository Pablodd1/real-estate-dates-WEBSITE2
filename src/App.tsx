import { BrowserRouter as Router, Routes, Route } from 'react-router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import GoldParticles from '@/components/GoldParticles';
import CustomCursor from '@/components/CustomCursor';
import Home from '@/pages/Home';
import BlogPost from '@/pages/BlogPost';
import { Toaster } from 'sonner';

gsap.registerPlugin(ScrollTrigger);

function App() {
  return (
    <Router>
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Gold Particles */}
      <GoldParticles />

      {/* Main Content */}
      <div className="relative w-full overflow-hidden flex flex-col flex-1 min-h-screen">
        {/* Background Image (Golden Key) with Spinning Animation */}
        <div className="fixed inset-0 flex items-center justify-center -z-50 pointer-events-none overflow-hidden">
          <img 
            src="/images/key.png" 
            alt="" 
            className="w-[150vw] h-[150vw] sm:w-[150vh] sm:h-[150vh] object-cover opacity-10 animate-spin-slow"
          />
        </div>
        
        <Navigation />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
        </Routes>

        <Footer />
      </div>
      <Toaster theme="dark" position="top-center" />
    </Router>
  );
}

export default App;
