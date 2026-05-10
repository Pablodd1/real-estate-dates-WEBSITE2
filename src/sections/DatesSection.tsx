import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeader from '@/components/SectionHeader';
import FeatureCard from '@/components/FeatureCard';
import { Calendar, Video } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const dateFeatures = [
  {
    icon: <Calendar className="w-full h-full" strokeWidth={1.5} />,
    iconColor: 'text-gold',
    title: 'Play Dates (Open Homes)',
    description: 'Skip the awkward phone tag. Browse available open home \'play dates,\' RSVP with a single tap, and add them straight to your calendar. Get reminders so you never miss a chance to meet your match.',
    tags: ['One-Tap RSVP', 'Calendar Sync', 'Reminders'],
    variant: 'glass' as const,
  },
  {
    icon: <Video className="w-full h-full" strokeWidth={1.5} />,
    iconColor: 'text-gold',
    title: 'Video Speed Dates',
    description: 'Go on a 5-minute video \'speed date\' with a property and its agent. Perfect for interstate buyers, busy schedules, or initial vetting. No pressure, no commitment — just a quick chemistry check.',
    tags: ['5-Min Calls', 'Live Agent Walkthrough', 'No Booking Hassle'],
    variant: 'glass' as const,
  },
];

export default function DatesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    // Left image
    gsap.from('.dates-image', {
      x: -60,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    });

    // Right text content
    const textEls = sectionRef.current.querySelectorAll('.dates-text');
    gsap.from(textEls, {
      y: 30,
      opacity: 0,
      duration: 0.7,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    // Feature cards
    const cards = sectionRef.current.querySelectorAll('.dates-card');
    gsap.from(cards, {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current.querySelector('.dates-cards'),
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="dates" data-theme="dark" className="relative w-full py-[120px] bg-dark overflow-hidden">
      {/* Subtle gold glow */}
      <div
        className="absolute left-[30%] top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.06] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, #D4AF37 0%, transparent 60%)' }}
      />

      <div className="max-w-[1280px] mx-auto px-6 relative z-10">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12">
          {/* Left - Image */}
          <div className="dates-image w-full lg:w-1/2">
            <div className="rounded-xl overflow-hidden shadow-xl hover:scale-[1.02] transition-transform duration-400">
              <img
                src="/assets/dates-lifestyle.jpg"
                alt="People at open home"
                className="w-full aspect-[4/3] object-cover"
              />
            </div>
          </div>

          {/* Right - Feature Stack */}
          <div className="w-full lg:w-1/2">
            <div className="dates-text">
              <SectionHeader
                eyebrow="Experience Properties"
                headline="Play Dates & Speed Dates"
                subheadline="We believe finding a home should be an experience, not a chore."
                theme="dark"
                centered={false}
              />
            </div>

            <div className="dates-cards space-y-6 -mt-4">
              {dateFeatures.map((feature) => (
                <div key={feature.title} className="dates-card">
                  <FeatureCard {...feature} />
                </div>
              ))}
            </div>

            <button className="dates-text mt-8 inline-flex items-center px-8 py-3 bg-gold hover:bg-gold-light text-dark font-semibold text-sm rounded-lg transition-all duration-200 hover:shadow-glow">
              Book Your First Play Date
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
