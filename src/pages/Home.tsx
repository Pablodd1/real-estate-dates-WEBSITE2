import HeroSection from '@/sections/HeroSection';
import DiscoverSection from '@/sections/DiscoverSection';
import HowItWorksSection from '@/sections/HowItWorksSection';
import FeaturesSection from '@/sections/FeaturesSection';
import MatchingSection from '@/sections/MatchingSection';
import DatesSection from '@/sections/DatesSection';
import EventsSection from '@/sections/EventsSection';
import PricingSection from '@/sections/PricingSection';
import SocialSection from '@/sections/SocialSection';
import TestimonialsSection from '@/sections/TestimonialsSection';
import BlogSection from '@/sections/BlogSection';
import PricingCtaSection from '@/sections/PricingCtaSection';

export default function Home() {
  return (
    <main className="relative z-0 main-content">
      <HeroSection />
      <DiscoverSection />
      <HowItWorksSection />
      <FeaturesSection />
      <MatchingSection />
      <DatesSection />
      <EventsSection />
      <SocialSection />
      <PricingSection />
      <TestimonialsSection />
      <BlogSection />
      <PricingCtaSection />
    </main>
  );
}
