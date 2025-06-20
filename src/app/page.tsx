import HeroSection from '@/components/sections/HeroSection';
import GrowthPlanSection from '@/components/sections/GrowthPlanSection';
import ServicesSection from '@/components/sections/ServicesSection';
import CaseStudiesSection from '@/components/sections/CaseStudiesSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import CtaSection from '@/components/sections/CtaSection';

export default function Home() {
  return (
    <main className="w-full">
      <HeroSection />
      <GrowthPlanSection />
      <ServicesSection />
      <CaseStudiesSection />
      <TestimonialsSection />
      <CtaSection />
    </main>
  );
}
