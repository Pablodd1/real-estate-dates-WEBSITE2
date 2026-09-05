import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Calendar,
  Users,
  MapPin,
  Music,
  Shield,
  DoorOpen,
  Timer,
  KeyRound,
  LockOpen,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

gsap.registerPlugin(ScrollTrigger);

// Happy Hour runs Sun(0) · Mon(1) · Wed(3) · Fri(5) — lobby 4:45 PM, event 5:00–5:30 PM, all in America/New_York so DST is handled by the timezone itself.
const EVENT_DAYS = [0, 1, 3, 5];
const LOBBY_HOUR = 16;
const LOBBY_MINUTE = 45;
const END_HOUR = 17;
const END_MINUTE = 30;

function nowInMiami(): Date {
  return new Date(new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }));
}

function getNextHappyHour(
  t: (key: string, options?: Record<string, unknown>) => string
): string {
  const now = nowInMiami();
  const day = now.getDay();
  const minutes = now.getHours() * 60 + now.getMinutes();

  if (EVENT_DAYS.includes(day)) {
    if (minutes < LOBBY_HOUR * 60 + LOBBY_MINUTE) {
      return t('events.happyHour.next.today');
    }
    if (minutes < END_HOUR * 60 + END_MINUTE) {
      return t('events.happyHour.next.liveNow');
    }
  }

  const probe = new Date(now);
  for (let i = 1; i <= 7; i++) {
    probe.setDate(now.getDate() + i);
    if (EVENT_DAYS.includes(probe.getDay())) {
      return t('events.happyHour.next.upcoming', {
        day: probe.toLocaleDateString('en-US', { weekday: 'long' }),
      });
    }
  }
  return '';
}

export default function EventsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useTranslation();

  const venueEvents = [
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

  const specs = [
    { icon: <Calendar className="w-3.5 h-3.5" />, label: t('events.happyHour.specs.schedule.label'), value: t('events.happyHour.specs.schedule.value') },
    { icon: <DoorOpen className="w-3.5 h-3.5" />, label: t('events.happyHour.specs.lobby.label'), value: t('events.happyHour.specs.lobby.value') },
    { icon: <Timer className="w-3.5 h-3.5" />, label: t('events.happyHour.specs.event.label'), value: t('events.happyHour.specs.event.value') },
    { icon: <ShieldCheck className="w-3.5 h-3.5" />, label: t('events.happyHour.specs.consent.label'), value: t('events.happyHour.specs.consent.value') },
    { icon: <Users className="w-3.5 h-3.5" />, label: t('events.happyHour.specs.noRepeats.label'), value: t('events.happyHour.specs.noRepeats.value') },
  ];

  const steps = [
    { icon: <Calendar className="w-5 h-5" strokeWidth={1.5} />, title: t('events.howItWorks.steps.step1.title'), desc: t('events.howItWorks.steps.step1.desc') },
    { icon: <DoorOpen className="w-5 h-5" strokeWidth={1.5} />, title: t('events.howItWorks.steps.step2.title'), desc: t('events.howItWorks.steps.step2.desc') },
    { icon: <Timer className="w-5 h-5" strokeWidth={1.5} />, title: t('events.howItWorks.steps.step3.title'), desc: t('events.howItWorks.steps.step3.desc') },
    { icon: <KeyRound className="w-5 h-5" strokeWidth={1.5} />, title: t('events.howItWorks.steps.step4.title'), desc: t('events.howItWorks.steps.step4.desc') },
    { icon: <LockOpen className="w-5 h-5" strokeWidth={1.5} />, title: t('events.howItWorks.steps.step5.title'), desc: t('events.howItWorks.steps.step5.desc') },
    { icon: <ShieldCheck className="w-5 h-5" strokeWidth={1.5} />, title: t('events.howItWorks.steps.step6.title'), desc: t('events.howItWorks.steps.step6.desc') },
  ];

  useGSAP(() => {
    if (!sectionRef.current) return;

    const cards = sectionRef.current.querySelectorAll('.event-card, .hh-step');
    gsap.from(cards, {
      y: 40,
      duration: 0.7,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    });

    gsap.from('.hh-card', {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.hh-card',
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });

    gsap.from('.event-title', {
      y: 30,
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
          <p className="event-title text-base sm:text-lg text-white/80 max-w-[600px] mx-auto leading-relaxed text-balance">
            {t('events.subtitle')}
          </p>
        </div>

        {/* Featured Happy Hour card */}
        <div className="hh-card relative max-w-[1000px] mx-auto rounded-3xl border border-gold/25 bg-gradient-to-br from-gold/[0.08] via-white/[0.03] to-transparent overflow-hidden">
          {/* gold edge glow */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

          <div className="grid lg:grid-cols-[1.1fr_1fr]">
            {/* Left: pitch */}
            <div className="p-6 sm:p-10">
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/15 border border-gold/30 text-gold text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.18em]">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-60" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-gold" />
                  </span>
                  {t('events.happyHour.badge')}
                </span>
                <span className="text-[11px] text-white/60">{getNextHappyHour(t)}</span>
              </div>

              <h3 className="font-script text-gold text-3xl sm:text-4xl italic mb-2">
                {t('events.happyHour.title')}
              </h3>
              <p className="text-sm text-gold/80 font-medium mb-3">
                {t('events.happyHour.tagline')}
              </p>
              <p className="text-sm sm:text-base text-white/80 leading-relaxed mb-6 sm:mb-8">
                {t('events.happyHour.description')}
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <a
                  href="https://realestatedates.realty"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap px-6 py-3 bg-gold text-dark rounded-full text-sm font-bold hover:bg-gold-light transition-colors duration-200"
                >
                  <KeyRound className="w-4 h-4" />
                  {t('events.happyHour.cta')}
                  <ArrowRight className="w-4 h-4" />
                </a>
                <span className="text-[11px] text-white/55 leading-snug">
                  {t('events.happyHour.footerLine')}
                </span>
              </div>
            </div>

            {/* Right: itinerary specs */}
            <div className="border-t lg:border-t-0 lg:border-l border-gold/15 bg-black/20 p-6 sm:p-8 lg:p-10">
              <div className="space-y-6">
                {specs.map((spec, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="shrink-0 mt-0.5 w-7 h-7 rounded-lg bg-gold/10 flex items-center justify-center text-gold">
                      {spec.icon}
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] uppercase tracking-[0.18em] text-gold/70 font-semibold mb-0.5">
                        {spec.label}
                      </p>
                      <p className="text-sm text-white/85 leading-relaxed">{spec.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* How Happy Hour Works */}
        <div className="max-w-[1000px] mx-auto mt-14 sm:mt-16">
          <h3 className="text-center font-script text-gold text-2xl sm:text-3xl italic mb-8 sm:mb-10">
            {t('events.howItWorks.title')}
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {steps.map((step, i) => (
              <div
                key={i}
                className="hh-step group relative p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-gold/20 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center text-gold">
                    {step.icon}
                  </div>
                  <span className="font-script italic text-gold/30 text-2xl leading-none">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h4 className="text-base font-semibold text-white mb-2">{step.title}</h4>
                <p className="text-sm text-white/75 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Venue events grid */}
        <div className="grid sm:grid-cols-2 gap-5 sm:gap-6 max-w-[900px] mx-auto mt-14 sm:mt-16">
          {venueEvents.map((event, i) => (
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
