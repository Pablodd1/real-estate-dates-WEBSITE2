import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeader from '@/components/SectionHeader';
import { Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: "We were dreading the house hunt, but Estate Match made it feel like a game. We swiped through properties on our couch with wine, booked play dates on weekends, and found our dream home in just three weeks!",
    avatar: '/assets/avatar-sarah.jpg',
    name: 'Sarah & Tom M.',
    role: 'First Home Buyers, Brisbane',
  },
  {
    quote: "As an investor, I need to screen dozens of properties quickly. The video speed dates are a game-changer — I can tour five properties in an hour without leaving my desk. My portfolio has never grown faster.",
    avatar: '/assets/avatar-michael.jpg',
    name: 'Michael R.',
    role: 'Property Investor, Sydney',
  },
  {
    quote: "We relocated from overseas and had no idea about neighborhoods. Estate Match's swipe learning figured out what we loved before we even knew. The chat feature made communicating with agents across time zones effortless.",
    avatar: '/assets/avatar-priya.jpg',
    name: 'Priya K.',
    role: 'Relocating Family, Melbourne',
  },
];

const stats = [
  { value: '12,500+', label: 'Happy Matches' },
  { value: '8,200+', label: 'Play Dates Booked' },
  { value: '15,000+', label: 'Video Speed Dates' },
  { value: '4.9', label: 'App Store Rating' },
];

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const header = sectionRef.current.querySelectorAll('.test-header');
    gsap.from(header, {
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

    const cards = sectionRef.current.querySelectorAll('.test-card');
    gsap.from(cards, {
      y: 30,
      opacity: 0,
      duration: 0.7,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current.querySelector('.test-grid'),
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    });

    const statsBar = sectionRef.current.querySelector('.stats-bar');
    gsap.from(statsBar, {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: statsBar,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });

    // Count-up animation for stat numbers
    const statNumbers = sectionRef.current.querySelectorAll('.stat-number');
    statNumbers.forEach((el) => {
      const target = el.getAttribute('data-value') || '0';
      // Parse numeric part
      const numericMatch = target.match(/[\d.]+/);
      if (!numericMatch) return;
      const numericValue = parseFloat(numericMatch[0]);
      const isDecimal = target.includes('.');
      const suffix = target.replace(/[\d.,]+/, '');

      const obj = { val: 0 };
      gsap.to(obj, {
        val: numericValue,
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: statsBar,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        onUpdate: () => {
          if (isDecimal) {
            el.textContent = obj.val.toFixed(1) + suffix;
          } else {
            el.textContent = Math.round(obj.val).toLocaleString() + suffix;
          }
        },
      });
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative w-full py-[120px] bg-dark overflow-hidden">
      {/* Decorative dots pattern */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-[200px] h-[200px] rounded-full bg-white/[0.02]"
            style={{
              left: `${10 + (i * 18)}%`,
              top: `${15 + (i % 3) * 25}%`,
            }}
          />
        ))}
      </div>

      <div className="max-w-[1280px] mx-auto px-6 relative z-10">
        <div className="test-header">
          <SectionHeader
            eyebrow="Success Stories"
            headline="Love at First Swipe"
            subheadline="Thousands of happy home hunters found their perfect match with Estate Match."
            theme="dark"
          />
        </div>

        <div className="test-grid grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="test-card bg-dark-card rounded-xl p-8 hover:border-gold/20 transition-all duration-300 border border-white/10"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-gold fill-gold" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-lg text-white/80 italic leading-relaxed mb-6">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              {/* Attribution */}
              <div className="flex items-center gap-3">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-base font-medium text-white">{testimonial.name}</p>
                  <p className="text-xs text-white/50 uppercase tracking-wide">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Bar */}
        <div className="stats-bar mt-20 bg-dark-card rounded-xl p-8 md:p-12 border border-white/10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p
                  className="stat-number text-4xl md:text-5xl font-semibold text-gold mb-2"
                  data-value={stat.value}
                >
                  0
                </p>
                <p className="text-xs text-white/50 uppercase tracking-[0.1em]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
