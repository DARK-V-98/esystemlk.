import Hero from "@/components/Hero";
import ClientLogos from "@/components/ClientLogos";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Pricing from "@/components/Pricing";
import TechStack from "@/components/TechStack";
import Testimonials from "@/components/Testimonials";
import WhyUs from "@/components/WhyUs";
import FAQ from "@/components/FAQ";
import CTABanner from "@/components/CTABanner";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <ClientLogos />
      <Services />
      <Process />
      <Pricing />
      <TechStack />
      <Testimonials />
      <WhyUs />
      <FAQ />
      <CTABanner />
      <Contact />
    </div>
  );
}
