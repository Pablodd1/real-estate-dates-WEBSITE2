import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, Eye, KeyRound, Video, CalendarCheck, Lock, Shield } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    title: 'Browse Listings',
    desc: 'Discover professionals by location, specialty, and experience. Tailored filters find your perfect match.',
    icon: <Search className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2} />,
  },
  {
    number: '02',
    title: 'Preview Profiles',
    desc: 'View portfolios, current listings, and past performance stats before you even think about connecting.',
    icon: <Eye className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2} />,
  },
  {
    number: '03',
    title: 'Submit Key',
    desc: 'Like a ring... but better. Send a digital key to signify interest and activate the Market Protocol.',
    icon: <KeyRound className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2} />,
  },
  {
    number: '04',
    title: 'Inspection Period',
    desc: 'Once the offer is accepted (both people like each other), it moves into an "Inspection Period" where Secure Messaging and Video Intro are unlocked.',
    icon: <Shield className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2} />,
  },
  {
    number: '05',
    title: 'Open House',
    desc: 'Start chatting, share leads, and schedule initial meetings in our high-security environment.',
    icon: <Video className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2} />,
  },
  {
    number: '06',
    title: 'Video Showing',
    desc: 'Conduct private face-to-face video calls within the platform to discuss high-level synergies.',
    icon: <Video className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2} />,
  },
  {
    number: '07',
    title: 'Schedule Walkthrough',
    desc: 'Coordinate an in-person meeting—our version of a first date—at local listings or professional hubs.',
    icon: <CalendarCheck className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2} />,
  },
  {
    number: '08',
    title: 'Lock Deal',
    desc: 'When you know it\'s the right fit for your empire... it\'s not just a match, it\'s a business deal for life.',
    icon: <Lock className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2} />,
  },
];

export default function HowItWorksSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const reveals = sectionRef.current.querySelectorAll('.hiw-reveal');
    gsap.from(reveals, {
      y: 30,
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
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="how-it-works" className="relative w-full py-20 sm:py-[120px] bg-dark overflow-hidden">
      <div className="max-w-[800px] mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="hiw-reveal text-[11px] uppercase tracking-[0.3em] text-gold font-medium mb-3">
            The Process
          </p>
          <h2 className="hiw-reveal font-script text-gold text-4xl sm:text-5xl md:text-6xl italic mb-4">
            From Browse to Close
          </h2>
          <p className="hiw-reveal text-white/50 text-sm sm:text-base md:text-lg max-w-[520px] mx-auto">
            We have gamified the dating experience with real estate terminology. Every step feels familiar — yet exciting.
          </p>
        </div>

        {/* Step list */}
        <div className="space-y-4">
          {steps.map((step) => (
            <div
              key={step.number}
              className="hiw-reveal hiw-card bg-dark-card rounded-xl border border-white/5 p-6 flex items-center gap-6 hover:border-gold/20 transition-all duration-300 group"
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
