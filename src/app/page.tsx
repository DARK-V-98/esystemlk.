'use client';
import { Suspense } from "react";
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
import PageWrapper from "@/components/PageWrapper";
import LoadingSpinner from "@/components/LoadingSpinner";


export default function Home() {
  return (
    <PageWrapper>
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
    </PageWrapper>
  );
}
