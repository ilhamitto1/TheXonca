import { HeroSection } from "@/components/hero/hero-section";
import { StorySection } from "@/components/home/story-section";
import { CollectionsReveal } from "@/components/home/collections-reveal";
import { WhyUsSection } from "@/components/home/why-us-section";
import { AnimatedProcess } from "@/components/home/animated-process";
import { CustomerStories } from "@/components/home/customer-stories";
import { LuxuryCta } from "@/components/home/luxury-cta";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StorySection />
      <CollectionsReveal />
      <WhyUsSection />
      <AnimatedProcess />
      <CustomerStories />
      <LuxuryCta />
    </>
  );
}
