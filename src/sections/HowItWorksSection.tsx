import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, Eye, KeyRound, Heart, MessageCircle, Video, CalendarCheck, Lock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    title: 'Browse Pipeline',
    desc: 'Discover institutional-grade profiles in your market or across the globe. Filter by AUM, specialty, and experience.',
    icon: <Search className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2} />,
  },
  {
    number: '02',
    title: 'Turn Key',
    desc: 'Express institutional interest. Like a right swipe, but with professional weight and real estate flair.',
    icon: <KeyRound className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2} />,
  },
  {
    number: '03',
    title: 'Pending Offer',
    desc: 'Your interest is logged. An encrypted SMS and Email alert is dispatched instantly to the partner.',
    icon: <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2} />,
  },
  {
    number: '04',
    title: 'Active Asset',
    desc: 'Mutual match! When both parties Turn Key, the asset goes Active and triggers the inspection period.',
    icon: <Heart className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2} />,
  },
  {
    number: '05',
    title: 'Inspection Period',
    desc: 'A 2-week window where Secure Messaging, Voice Calls, and Private Video Intros are unlocked.',
    icon: <Eye className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2} />,
  },
  {
    number: '06',
    title: 'Virtual Ballroom',
    desc: 'Join real-time, high-speed networking Happy Hour events with automated video rotations.',
    icon: <Video className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2} />,
  },
  {
    number: '07',
    title: 'Synergy Rating',
    desc: 'View automated compatibility scores (e.g., 88% Business / 12% Fun) before finalizing the deal.',
    icon: <CalendarCheck className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2} />,
  },
  {
    number: '08',
    title: 'Lock Asset',
    desc: 'When the partnership is verified, lock the asset. Go exclusive and build your empire together.',
    icon: <Lock className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2} />,
  },
];

export default function HowItWorksSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const cards = sectionRef.current.querySelectorAll('.hiw-card');
    gsap.from(cards, {
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

  return (
    <section ref={sectionRef} id="how-it-works" className="relative w-full py-20 sm:py-[120px] bg-dark overflow-hidden">
      <div className="max-w-[800px] mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[11px] uppercase tracking-[0.3em] text-gold font-medium mb-3">
            The Process
          </p>
          <h2 className="font-script text-gold text-4xl sm:text-5xl md:text-6xl italic mb-4">
            From Browse to Close
          </h2>
          <p className="text-white/50 text-sm sm:text-base md:text-lg max-w-[520px] mx-auto">
            We have gamified the dating experience with real estate terminology. Every step feels familiar — yet exciting.
          </p>
        </div>

        {/* Step list */}
        <div className="space-y-4">
          {steps.map((step) => (
            <div
              key={step.number}
              className="hiw-card bg-dark-card rounded-xl border border-white/5 p-6 flex items-center gap-6 hover:border-gold/20 transition-all duration-300 group"
            >
              <div className="w-12 h-12 shrink-0 rounded-lg bg-gold/10 flex items-center justify-center text-gold group-hover:bg-gold/20 transition-colors duration-300">
                {step.icon}
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-white mb-1">{step.title}</h4>
                <p className="text-sm text-white/40 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
