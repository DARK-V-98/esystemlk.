
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
import { getPortfolioItems } from "./admin/portfolio/actions";
import PortfolioClient from "@/components/PortfolioClient";

export default async function Home() {
  const portfolioItems = await getPortfolioItems();

  const featuredProjects = portfolioItems.map(item => ({
    id: item.id,
    name: item.name,
    link: item.link,
    imageUrl: item.imageUrl,
    hint: 'featured project',
  }));

  return (
    <>
        <Hero />
        <Services />
        <Process />
        {featuredProjects.length > 0 && <PortfolioClient projects={featuredProjects} />}
        <Pricing />
        <TechStack />
        <Testimonials />
        <ClientLogos />
        <WhyUs />
        <FAQ />
        <CTABanner />
        <Contact />
    </>
  );
}
