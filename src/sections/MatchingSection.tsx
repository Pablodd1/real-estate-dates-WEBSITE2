import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Heart } from 'lucide-react';
import { TagBadge } from '@/components/TagBadge';

gsap.registerPlugin(ScrollTrigger);

const features = [
  'AI-powered preference learning',
  'Filter by price, location, and lifestyle',
  'Save favorites to shared collections',
  'Get notified when new matches arrive',
];

const tags = ['3 bed', '2 bath', '2 car'];

export default function MatchingSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    // Left column card
    gsap.from('.matching-card-wrap', {
      x: -50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    });

    // Right column text
    const textEls = sectionRef.current.querySelectorAll('.matching-text');
    gsap.from(textEls, {
      x: 50,
      opacity: 0,
      duration: 0.7,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    });

    // Parallax on scroll
    gsap.to('.matching-card-main', {
      rotateY: 2,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="matching" className="relative w-full py-[120px] bg-warm-white overflow-hidden">
      {/* Decorative watermark */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 text-[200px] font-bold text-charcoal/[0.03] -rotate-90 select-none pointer-events-none whitespace-nowrap">
        SWIPE
      </div>

      <div className="max-w-[1280px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left - Swipe Card */}
          <div className="matching-card-wrap w-full lg:w-[55%] flex justify-center" style={{ perspective: '1000px' }}>
            <div className="relative">
              {/* Ghost card */}
              <div
                className="absolute top-5 left-5 w-[280px] sm:w-[340px] lg:w-[400px] rounded-2xl overflow-hidden shadow-xl opacity-30 blur-[2px]"
                style={{ transform: 'translate(20px, 20px)' }}
              >
                <div className="aspect-[4/5] bg-beige" />
              </div>

              {/* Main card */}
              <div
                className="matching-card-main relative w-[280px] sm:w-[340px] lg:w-[400px] rounded-2xl overflow-hidden shadow-xl bg-warm-white"
                style={{ transform: 'rotateY(-5deg)' }}
              >
                {/* Image area */}
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src="/assets/matching-card-bg.jpg"
                    alt="Modern property"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  {/* Heart overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-80 transition-opacity duration-400">
                    <div className="w-16 h-16 rounded-full bg-sage flex items-center justify-center">
                      <Heart className="w-8 h-8 text-white fill-white" />
                    </div>
                  </div>
                </div>

                {/* Content area */}
                <div className="p-5 bg-white">
                  <h4 className="text-lg font-medium text-text-primary mb-1">Modern Scandinavian Home</h4>
                  <p className="text-xs text-text-secondary uppercase tracking-wide mb-3">Richmond, Melbourne</p>
                  <p className="text-xl font-semibold text-sage mb-3">$1,250,000</p>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <TagBadge key={tag} variant="category">{tag}</TagBadge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Text Content */}
          <div className="w-full lg:w-[45%]">
            <p className="matching-text text-xs font-medium uppercase tracking-[0.1em] text-sage mb-3">
              How Matching Works
            </p>
            <div className="matching-text w-10 h-0.5 bg-sage mb-6" />
            <h2 className="matching-text text-4xl md:text-5xl font-semibold text-text-primary leading-tight tracking-tight mb-5">
              Swipe Right on Your Dream Home
            </h2>
            <p className="matching-text text-lg text-text-secondary leading-relaxed mb-8">
              Our intelligent matching algorithm learns what you love. The more you swipe, the smarter it gets. Set your preferences for price, location, bedrooms, and style — then let the magic happen.
            </p>

            <ul className="matching-text space-y-4 mb-8">
              {features.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-sage flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                  </span>
                  <span className="text-text-primary">{feature}</span>
                </li>
              ))}
            </ul>

            <button className="matching-text inline-flex items-center px-8 py-3 bg-sage hover:bg-sage-dark text-white font-semibold text-sm rounded-lg transition-all duration-200 hover:shadow-glow-sage">
              Start Swiping Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
