import { useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { KeyRound, Video, Shield, BadgeCheck, Eye, Lock, CalendarDays, MessageSquare } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: <BadgeCheck className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} />,
    title: 'Luxury Profiles',
    desc: 'View hand-picked luxury listings and verified elite professionals in your local market.',
  },
  {
    icon: <Eye className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} />,
    title: 'Market Intel',
    desc: 'Analyze real-time market data, past performance, and specialized asset classes before connecting.',
  },
  {
    icon: <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} />,
    title: 'Encrypted Logic',
    desc: 'Share leads and discuss high-level synergies in our ultra-secure messaging environment.',
  },
  {
    icon: <CalendarDays className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} />,
    title: 'Property Dating',
    desc: 'Matches coordinate meet-ups at local listings, coffee shops, or exclusive professional hubs.',
  },
  {
    icon: <KeyRound className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} />,
    title: 'Empire Building',
    desc: 'Our algorithm pairs you with professionals who share your investment vision and goals.',
  },
  {
    icon: <Video className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} />,
    title: 'Video Intro',
    desc: 'Conduct private 5-minute video intro calls to gauge chemistry before meeting in person.',
  },
  {
    icon: <Shield className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} />,
    title: 'Protocol Sync',
    desc: 'Synchronize your market protocol across all your real estate assets and connections.',
  },
  {
    icon: <Lock className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} />,
    title: 'Closed Deal',
    desc: 'The ultimate professional partnership. Go from matched to closed on your empire.',
  },
];

function TiltCard({ children }: { children: React.ReactNode }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // Only enable 3D tilt on desktop (hover + fine pointer)
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -12;
      const rotateY = ((x - centerX) / centerX) * 12;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    };

    const handleMouseLeave = () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="group p-5 sm:p-6 bg-dark-card rounded-xl border border-white/5 hover:border-gold/20 transition-all duration-300"
      style={{ transformStyle: 'preserve-3d', transition: 'transform 0.1s ease-out' }}
    >
      {children}
    </div>
  );
}

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const header = sectionRef.current.querySelectorAll('.feat-reveal');
    const cards = sectionRef.current.querySelectorAll('.feat-card');

    gsap.from(header, {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });

    gsap.from(cards, {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.06,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="features" className="relative w-full py-20 sm:py-[120px] bg-dark overflow-hidden">
      <div
        className="absolute top-1/2 left-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] pointer-events-none -translate-y-1/2"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.03) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-10 sm:mb-16">
          <p className="feat-reveal text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-gold font-medium mb-3">
            Features
          </p>
          <h2 className="feat-reveal font-script text-gold text-3xl sm:text-4xl md:text-5xl lg:text-6xl italic mb-4">
            Built for the Industry
          </h2>
          <p className="feat-reveal text-white/50 text-sm sm:text-base md:text-lg max-w-[520px] mx-auto px-2">
            Every feature speaks your language. We replaced dating clichés with real estate terminology you already know.
          </p>
        </div>

        <div className="feat-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {features.map((feature) => (
            <div key={feature.title} className="feat-card">
              <TiltCard>
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gold/10 flex items-center justify-center text-gold mb-3 sm:mb-4 group-hover:bg-gold/20 transition-colors duration-300">
                  {feature.icon}
                </div>
                <h4 className="text-sm sm:text-base font-semibold text-white mb-1 sm:mb-2">{feature.title}</h4>
                <p className="text-xs sm:text-sm text-white/40 leading-relaxed">{feature.desc}</p>
              </TiltCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
