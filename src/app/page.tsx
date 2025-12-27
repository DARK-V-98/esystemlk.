'use client';
import { useEffect } from "react";
import CTABanner from "@/components/CTABanner";
import ClientLogos from "@/components/ClientLogos";
import Contact from "@/components/Contact";
import FAQ from "@/components/FAQ";
import Hero from "@/components/Hero";
import Pricing from "@/components/Pricing";
import Process from "@/components/Process";
import Services from "@/components/Services";
import TechStack from "@/components/TechStack";
import Testimonials from "@/components/Testimonials";
import WhyUs from "@/components/WhyUs";

export default function Home() {
    useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in");
          entry.target.classList.remove("opacity-0");
        }
      });
    }, observerOptions);

    document.querySelectorAll(".animate-fade-in.opacity-0").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <Services />
      <Process />
      <Pricing />
      <TechStack />
      <Testimonials />
      <ClientLogos />
      <WhyUs />
      <FAQ />
      <CTABanner />
      <Contact />
    </div>
  );
}
