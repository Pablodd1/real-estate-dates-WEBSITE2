import { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, KeyRound, MapPin } from 'lucide-react';

// Sample profiles data (no auth required)
const sampleProfiles = [
  {
    id: '1',
    name: 'Valentina Rossi',
    role: 'Luxury Broker',
    location: 'Miami / Milan',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600',
    bio: 'Specializing in waterfront luxury properties. 15 years connecting elite buyers with dream homes across Miami and Europe.',
    intel: ['Luxury', 'Waterfront'],
  },
  {
    id: '2',
    name: 'Marcus Chen',
    role: 'Investment Analyst',
    location: 'New York / Singapore',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=600',
    bio: 'Data-driven real estate investor with $500M+ in transactions. Looking for strategic partnerships in emerging markets.',
    intel: ['Investment', 'Global'],
  },
  {
    id: '3',
    name: 'Isabella Santos',
    role: 'Development Director',
    location: 'São Paulo / Lisbon',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=600',
    bio: 'Leading mixed-use developments across LATAM and Europe. Passionate about sustainable urban design and community building.',
    intel: ['Development', 'Sustainable'],
  },
  {
    id: '4',
    name: 'James Whitfield',
    role: 'Commercial Broker',
    location: 'London / Dubai',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600',
    bio: 'Commercial real estate specialist focusing on office and retail spaces. $1B+ in lifetime transactions.',
    intel: ['Commercial', 'Retail'],
  },
];

gsap.registerPlugin(ScrollTrigger);

export default function DiscoverSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragDirection, setDragDirection] = useState<'left' | 'right' | null>(null);

  const current = sampleProfiles[currentIndex % sampleProfiles.length];

  // Touch swipe support
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    let startX = 0;
    let currentX = 0;
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (!isTouchDevice) {
      // Desktop: Mouse drag
      const handleMouseDown = (e: MouseEvent) => {
        startX = e.clientX;
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
      };

      const handleMouseMove = (e: MouseEvent) => {
        currentX = e.clientX - startX;
        const rotation = currentX * 0.08;
        gsap.set(card, { x: currentX, rotation });
        
        if (currentX > 60) setDragDirection('right');
        else if (currentX < -60) setDragDirection('left');
        else setDragDirection(null);
      };

      const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);

        if (currentX > 100) {
          gsap.to(card, {
            x: window.innerWidth,
            rotation: 30,
            opacity: 0,
            duration: 0.4,
            ease: 'power2.out',
            onComplete: () => {
              setCurrentIndex((prev) => prev + 1);
              gsap.set(card, { x: 0, rotation: 0, opacity: 1 });
              setDragDirection(null);
            },
          });
        } else if (currentX < -100) {
          gsap.to(card, {
            x: -window.innerWidth,
            rotation: -30,
            opacity: 0,
            duration: 0.4,
            ease: 'power2.out',
            onComplete: () => {
              setCurrentIndex((prev) => prev + 1);
              gsap.set(card, { x: 0, rotation: 0, opacity: 1 });
              setDragDirection(null);
            },
          });
        } else {
          gsap.to(card, { x: 0, rotation: 0, duration: 0.4, ease: 'elastic.out(1, 0.5)' });
          setDragDirection(null);
        }
        currentX = 0;
      };

      card.addEventListener('mousedown', handleMouseDown);

      return () => {
        card.removeEventListener('mousedown', handleMouseDown);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    } else {
      // Mobile: Touch events
      const handleTouchStart = (e: TouchEvent) => {
        startX = e.touches[0].clientX;
      };

      const handleTouchMove = (e: TouchEvent) => {
        currentX = e.touches[0].clientX - startX;
        const rotation = currentX * 0.08;
        gsap.set(card, { x: currentX, rotation });
        
        if (currentX > 60) setDragDirection('right');
        else if (currentX < -60) setDragDirection('left');
        else setDragDirection(null);
      };

      const handleTouchEnd = () => {
        if (currentX > 100) {
          gsap.to(card, {
            x: window.innerWidth,
            rotation: 30,
            opacity: 0,
            duration: 0.4,
            ease: 'power2.out',
            onComplete: () => {
              setCurrentIndex((prev) => prev + 1);
              gsap.set(card, { x: 0, rotation: 0, opacity: 1 });
              setDragDirection(null);
            },
          });
        } else if (currentX < -100) {
          gsap.to(card, {
            x: -window.innerWidth,
            rotation: -30,
            opacity: 0,
            duration: 0.4,
            ease: 'power2.out',
            onComplete: () => {
              setCurrentIndex((prev) => prev + 1);
              gsap.set(card, { x: 0, rotation: 0, opacity: 1 });
              setDragDirection(null);
            },
          });
        } else {
          gsap.to(card, { x: 0, rotation: 0, duration: 0.4, ease: 'elastic.out(1, 0.5)' });
          setDragDirection(null);
        }
        currentX = 0;
      };

      card.addEventListener('touchstart', handleTouchStart, { passive: true });
      card.addEventListener('touchmove', handleTouchMove, { passive: true });
      card.addEventListener('touchend', handleTouchEnd);

      return () => {
        card.removeEventListener('touchstart', handleTouchStart);
        card.removeEventListener('touchmove', handleTouchMove);
        card.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [currentIndex]);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const els = sectionRef.current.querySelectorAll('.discover-reveal');
    gsap.from(els, {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });
  }, { scope: sectionRef });

  const handlePass = () => {
    const card = cardRef.current;
    if (!card) return;

    gsap.to(card, {
      x: -window.innerWidth,
      rotation: -25,
      opacity: 0,
      duration: 0.5,
      ease: 'power3.out',
      onComplete: () => {
        setCurrentIndex((prev) => prev + 1);
        gsap.set(card, { x: 0, rotation: 0, opacity: 1 });
      },
    });
  };

  const handleSubmitKey = () => {
    const card = cardRef.current;
    if (!card) return;

    gsap.to(card, {
      x: window.innerWidth,
      rotation: 25,
      opacity: 0,
      duration: 0.5,
      ease: 'power3.out',
      onComplete: () => {
        setCurrentIndex((prev) => prev + 1);
        gsap.set(card, { x: 0, rotation: 0, opacity: 1 });
      },
    });
  };


  return (
    <section ref={sectionRef} id="discover" className="relative w-full py-20 sm:py-[120px] bg-dark overflow-hidden">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] sm:w-[800px] sm:h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.05) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-16">
          <p className="discover-reveal text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-gold font-medium mb-3">
            Discover
          </p>
          <h2 className="discover-reveal font-script text-gold text-3xl sm:text-4xl md:text-5xl lg:text-6xl italic mb-4">
            Browse Elite Profiles
          </h2>
          <p className="discover-reveal text-white/50 text-sm sm:text-base md:text-lg max-w-[480px] mx-auto px-2">
            Swipe through verified real estate professionals. Submit your key to connect. Lock the asset to make it exclusive.
          </p>
        </div>

        {/* Card Stack */}
        <div className="discover-reveal flex justify-center mb-6 sm:mb-8 select-none relative">
          <div className={`relative w-full max-w-[320px] sm:max-w-[380px] transition-all duration-700`} style={{ perspective: '1000px' }}>
            {/* Background cards (stack effect) */}
            <div className="absolute top-2 sm:top-3 left-2 sm:left-3 right-2 sm:right-3 h-full bg-dark-card rounded-2xl border border-white/5 opacity-60" />
            <div className="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 h-full bg-dark-elevated rounded-2xl border border-white/5 opacity-40" />

            {/* Main card */}
            <div
              ref={cardRef}
              className={`relative bg-dark-card rounded-2xl overflow-hidden border border-white/10 shadow-card cursor-grab active:cursor-grabbing transition-shadow ${
                dragDirection === 'right' ? 'shadow-glow' : ''
              }`}
            >
              {/* Image */}
              <div className="relative aspect-[3/4.2] overflow-hidden">
                <img
                  src={current.image}
                  alt={current.name}
                  className="w-full h-full object-cover pointer-events-none scale-[1.05]"
                  draggable={false}
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent" />

                {/* Top Right: Elite Badge */}
                <div className="absolute top-4 right-4 px-3 py-1 bg-gold/90 rounded-full">
                  <span className="text-[10px] uppercase tracking-wider text-dark font-bold">Elite</span>
                </div>

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 pt-20">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-2xl font-bold text-white leading-tight">{current.name}</h3>
                      <div className="flex items-center gap-2 text-white/60 mt-1">
                        <MapPin className="w-3.5 h-3.5" />
                        <span className="text-xs font-medium uppercase tracking-wider">{current.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2.5 py-1 bg-gold/10 rounded-md text-[10px] uppercase tracking-wider text-gold font-bold border border-gold/20">
                      {current.role}
                    </span>
                    {current.intel.map((item: string) => (
                      <span
                        key={item}
                        className="px-2.5 py-1 bg-white/5 rounded-md text-[10px] uppercase tracking-wider text-white/60 font-bold border border-white/10"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  {/* Bio quote */}
                  <div className="mb-6">
                    <p className="text-xs sm:text-sm text-white/70 italic leading-relaxed line-clamp-3">
                      &ldquo;{current.bio}&rdquo;
                    </p>
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={handlePass}
                      className="flex-1 flex items-center justify-center gap-2 py-3 bg-white/5 backdrop-blur-md rounded-xl text-white/60 hover:text-white hover:bg-red-500/20 hover:border-red-500/30 transition-all duration-200 border border-white/10 group"
                    >
                      <X className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" strokeWidth={3} />
                      <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest">Pass</span>
                    </button>
                    <button
                      onClick={handleSubmitKey}
                      className="flex-1 flex items-center justify-center gap-2 py-3 bg-gold rounded-xl text-dark hover:bg-gold-light transition-all duration-200 border border-gold hover:shadow-glow group"
                    >
                      <KeyRound className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
                      <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest">Submit Key</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Instruction */}
        <p className="discover-reveal text-center text-white/30 text-xs sm:text-sm px-4">
          <span className="hidden sm:inline">Drag the card left or right, or click the buttons below. </span>
          Submit a key to express interest. Lock the asset when you are ready to close.
        </p>
      </div>
    </section>
  );
}
