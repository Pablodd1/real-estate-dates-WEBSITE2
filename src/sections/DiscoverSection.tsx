import { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, Heart, MapPin, Home, Search, MessageCircle, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// We will move sampleProfiles inside the component so it has access to `t`

gsap.registerPlugin(ScrollTrigger);

export default function DiscoverSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragDirection, setDragDirection] = useState<'left' | 'right' | null>(null);
  const { t } = useTranslation();

  const sampleProfiles = [
    {
      id: '1',
      name: t('discover.profiles.p1.name'),
      role: t('discover.profiles.p1.role'),
      location: t('discover.profiles.p1.location'),
      image: '/images/coffee.png',
      bio: t('discover.profiles.p1.bio'),
      intel: t('discover.profiles.p1.intel', { returnObjects: true }) as string[],
    },
    {
      id: '2',
      name: t('discover.profiles.p2.name'),
      role: t('discover.profiles.p2.role'),
      location: t('discover.profiles.p2.location'),
      image: '/images/couple.png',
      bio: t('discover.profiles.p2.bio'),
      intel: t('discover.profiles.p2.intel', { returnObjects: true }) as string[],
    },
    {
      id: '3',
      name: t('discover.profiles.p3.name'),
      role: t('discover.profiles.p3.role'),
      location: t('discover.profiles.p3.location'),
      image: '/images/couple.png',
      bio: t('discover.profiles.p3.bio'),
      intel: t('discover.profiles.p3.intel', { returnObjects: true }) as string[],
    },
    {
      id: '4',
      name: t('discover.profiles.p4.name'),
      role: t('discover.profiles.p4.role'),
      location: t('discover.profiles.p4.location'),
      image: '/images/app.png',
      bio: t('discover.profiles.p4.bio'),
      intel: t('discover.profiles.p4.intel', { returnObjects: true }) as string[],
    },
  ];

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
      duration: 0.5,
      ease: 'power3.out',
      onComplete: () => {
        setCurrentIndex((prev) => prev + 1);
        gsap.set(card, { x: 0, rotation: 0, opacity: 1 });
      },
    });
  };

  const handleMatch = () => {
    const card = cardRef.current;
    if (!card) return;

    gsap.to(card, {
      x: window.innerWidth,
      rotation: 25,
      duration: 0.5,
      ease: 'power3.out',
      onComplete: () => {
        setCurrentIndex((prev) => prev + 1);
        gsap.set(card, { x: 0, rotation: 0, opacity: 1 });
      },
    });
  };


  return (
    <section ref={sectionRef} id="discover" className="relative w-full py-6 sm:py-10">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] sm:w-[800px] sm:h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.05) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-10">
          <p className="discover-reveal text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-gold font-medium mb-3">
            {t('discover.sectionTitle')}
          </p>
          <h2 className="discover-reveal font-script text-gold text-3xl sm:text-4xl md:text-5xl lg:text-6xl italic mb-4">
            {t('discover.title')}
          </h2>
          <p className="discover-reveal text-white/80 text-sm sm:text-base md:text-lg max-w-[480px] mx-auto px-2">
            {t('discover.subtitle')}
          </p>
        </div>

        {/* Card Stack / Phone Mockup */}
        <div className="discover-reveal flex justify-center mb-6 sm:mb-8 select-none relative">
          {/* Phone Frame */}
          <div className="relative w-full max-w-[320px] sm:max-w-[380px] bg-black border-[6px]  rounded-[2.5rem] shadow-2xl transition-all duration-700" style={{ perspective: '1000px' }}>
            
            {/* App Header */}
            <div className="absolute top-0 left-0 right-0 h-12 liquid-glass/90 backdrop-blur-md z-20 flex items-center justify-center border-b ">
              <span className="text-gold font-script text-xl italic">Dates</span>
            </div>

            {/* Main card (Swipeable) */}
            <div className="pt-14 pb-20 px-2 h-[650px] sm:h-[700px] flex items-center justify-center relative">
              <div
                ref={cardRef}
                className={`relative w-full h-full liquid-glass rounded-2xl  shadow-card cursor-grab active:cursor-grabbing transition-shadow ${
                  dragDirection === 'right' ? 'shadow-glow' : ''
                }`}
              >
              {/* Image */}
              <div className="relative aspect-[3/4.2]">
                <img
                  src={current.image}
                  alt={current.name}
                  className="w-full h-full object-cover pointer-events-none scale-[1.05]"
                  draggable={false}
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-dark via-dark/40 to-transparent" />

                {/* Top Right: Elite Badge */}
                <div className="absolute top-4 right-4 px-3 py-1 bg-gold/90 rounded-full">
                  <span className="text-[10px] uppercase tracking-wider text-dark font-bold">{t('discover.eliteBadge')}</span>
                </div>

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 pt-20">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-2xl font-bold text-white leading-tight">{current.name}</h3>
                      <div className="flex items-center gap-2 text-white/85 mt-1">
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
                        className="px-2.5 py-1 bg-white/5 rounded-md text-[10px] uppercase tracking-wider text-white/85 font-bold "
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
                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={handlePass}
                      className="flex-1 flex items-center justify-center gap-2 py-3 bg-white/5 backdrop-blur-md rounded-xl text-white/85 hover:text-white hover:bg-red-500/20 hover:border-red-500/30 transition-all duration-200  group"
                    >
                      <X className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform text-red-500" strokeWidth={3} />
                      <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest">{t('discover.pass')}</span>
                    </button>
                    <button
                      onClick={handleMatch}
                      className="flex-1 flex items-center justify-center gap-2 py-3 bg-gold/10 backdrop-blur-md rounded-xl text-gold hover:bg-gold/20 transition-all duration-200 border border-gold/30 hover:shadow-glow group"
                    >
                      <Heart className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform fill-current" />
                      <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest">{t('discover.connect')}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            </div>

            {/* Mock Bottom Navigation */}
            <div className="absolute bottom-0 left-0 right-0 h-16 liquid-glass border-t  flex items-center justify-between px-6 z-20">
              <button className="p-2 text-white/40 hover:text-gold transition-colors">
                <Home className="w-6 h-6" />
              </button>
              <button className="p-2 text-gold">
                <Search className="w-6 h-6" />
              </button>
              <button className="p-2 text-white/40 hover:text-gold transition-colors">
                <MessageCircle className="w-6 h-6" />
              </button>
              <button className="p-2 text-white/40 hover:text-gold transition-colors">
                <User className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Instruction */}
        <p className="discover-reveal text-center text-white/75 text-xs sm:text-sm px-4 mt-6">
          {t('discover.instruction')}
        </p>
      </div>
    </section>
  );
}
