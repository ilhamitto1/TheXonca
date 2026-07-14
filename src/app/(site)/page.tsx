import { HeroSection } from "@/components/hero/hero-section";
import { StorySection } from "@/components/home/story-section";
import { FeaturedEvents } from "@/components/home/featured-events";
import { InteractiveGallery } from "@/components/home/interactive-gallery";
import { WeddingThemes } from "@/components/home/wedding-themes";
import { PremiumServices } from "@/components/home/premium-services";
import { LuxuryTimeline } from "@/components/home/luxury-timeline";
import { AnimatedProcess } from "@/components/home/animated-process";
import { CustomerStories } from "@/components/home/customer-stories";
import { InstagramFeed } from "@/components/home/instagram-feed";
import { LuxuryCta } from "@/components/home/luxury-cta";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StorySection />
      <FeaturedEvents />
      <InteractiveGallery />
      <WeddingThemes />
      <PremiumServices />
      <LuxuryTimeline />
      <AnimatedProcess />
      <CustomerStories />
      <InstagramFeed />
      <LuxuryCta />
    </>
  );
}
