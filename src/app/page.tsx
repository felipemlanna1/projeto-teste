import { Hero } from "@/components/sections/Hero";
import { PricingSection } from "@/components/sections/Pricing";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <PricingSection />
      <Contact />
    </main>
  );
}
