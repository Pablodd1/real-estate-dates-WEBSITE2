import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, Users, MapPin, Wine, Music, Video, Shield } from 'lucide-react';
import { useTranslation } from 'react-i18next';

gsap.registerPlugin(ScrollTrigger);

// We will move events inside the component to use `t`

export default function EventsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useTranslation();

  const events = [
    {
      icon: <Wine className="w-5 h-5" strokeWidth={1.5} />,
      title: t('events.list.event1.title'),
      desc: t('events.list.event1.desc'),
      time: t('events.list.event1.time'),
      location: t('events.list.event1.location'),
      attendees: t('events.list.event1.attendees'),
    },
    {
      icon: <Video className="w-5 h-5" strokeWidth={1.5} />,
      title: t('events.list.event2.title'),
      desc: t('events.list.event2.desc'),
      time: t('events.list.event2.time'),
      location: t('events.list.event2.location'),
      attendees: t('events.list.event2.attendees'),
    },
    {
      icon: <Music className="w-5 h-5" strokeWidth={1.5} />,
      title: t('events.list.event3.title'),
      desc: t('events.list.event3.desc'),
      time: t('events.list.event3.time'),
      location: t('events.list.event3.location'),
      attendees: t('events.list.event3.attendees'),
    },
    {
      icon: <Users className="w-5 h-5" strokeWidth={1.5} />,
      title: t('events.list.event4.title'),
      desc: t('events.list.event4.desc'),
      time: t('events.list.event4.time'),
      location: t('events.list.event4.location'),
      attendees: t('events.list.event4.attendees'),
    },
  ];

  useGSAP(() => {
    if (!sectionRef.current) return;

    const cards = sectionRef.current.querySelectorAll('.event-card');
    gsap.from(cards, {
      y: 40,
      opacity: 0,
      duration: 0.7,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    });

    gsap.from('.event-title', {
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="events"
      className="relative w-full py-6 sm:py-10"
    >
      {/* Couple background image */}
      <div 
        className="absolute inset-0 -z-10 bg-cover bg-center opacity-20"
        style={{ backgroundImage: 'url(/images/key.png)' }}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-dark via-dark/90 to-dark" />
      {/* Subtle gold glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute w-[400px] h-[400px] rounded-full opacity-[0.03]"
          style={{ background: '#D4AF37', filter: 'blur(120px)', top: '20%', left: '-10%' }}
        />
      </div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10">
          <p className="event-title text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-gold font-medium mb-3">
            {t('events.sectionTitle')}
          </p>
          <h2 className="event-title font-script text-gold text-3xl sm:text-4xl md:text-5xl italic mb-4 sm:mb-5">
            {t('events.title')}
          </h2>
          <p className="event-title text-base sm:text-lg text-white/80 max-w-[600px] mx-auto leading-relaxed">
            {t('events.subtitle')}
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid sm:grid-cols-2 gap-5 sm:gap-6 max-w-[900px] mx-auto">
          {events.map((event, i) => (
            <div
              key={i}
              className="event-card group relative p-6 sm:p-8 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-gold/20 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gold/10 flex items-center justify-center text-gold">
                  {event.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-2">
                    {event.title}
                  </h3>
                  <p className="text-sm text-white/80 leading-relaxed mb-4">
                    {event.desc}
                  </p>
                  <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-white/75">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {event.time}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" />
                      {event.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5" />
                      {event.attendees}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12 sm:mt-10">
          <p className="text-sm text-white/75 mb-4">
            {t('events.disclaimer')}
          </p>
          <a
            href="#pricing"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gold/10 border border-gold/20 rounded-full text-gold text-sm font-semibold hover:bg-gold/20 transition-colors duration-200"
          >
            <Shield className="w-4 h-4" />
            {t('events.viewPolicies')}
          </a>
        </div>
      </div>
    </section>
  );
}
