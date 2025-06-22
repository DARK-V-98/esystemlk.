import { Card, CardContent } from "@/components/ui/card";
import { CodeXml, CloudCog, ShieldCheck, Layers, Bot } from 'lucide-react';

const services = [
  {
    icon: <CodeXml className="w-12 h-12 text-primary" />,
    title: "Custom Web Development",
    description: "We build bespoke, high-performance websites and web applications from the ground up, ensuring they are perfectly tailored to your business objectives and brand identity. Our solutions are responsive, scalable, and optimized for search engines."
  },
  {
    icon: <CloudCog className="w-12 h-12 text-primary" />,
    title: "Cloud & DevOps Solutions",
    description: "Leverage the power of the cloud with our expert solutions. We provide cloud infrastructure setup, migration, and management services, along with CI/CD pipeline implementation to automate and streamline your development process."
  },
  {
    icon: <Layers className="w-12 h-12 text-primary" />,
    title: "UI/UX Design",
    description: "First impressions matter. Our UI/UX design team creates visually stunning and user-friendly interfaces that enhance user satisfaction and drive engagement. We focus on creating a seamless journey for your users across all digital touchpoints."
  },
  {
    icon: <ShieldCheck className="w-12 h-12 text-primary" />,
    title: "IT Security & Consultation",
    description: "Protect your digital assets with our comprehensive security services. We offer security audits, vulnerability assessments, and strategic consulting to fortify your systems against threats and ensure data integrity."
  },
  {
    icon: <Bot className="w-12 h-12 text-primary" />,
    title: "AI & Machine Learning",
    description: "Unlock the potential of your data with our AI and ML services. We develop custom models and integrate intelligent solutions to automate processes, derive insights, and create innovative products for a competitive edge."
  }
];

export default function ServicesPage() {
  return (
    <>
      <section className="w-full py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6 text-center bg-black/30 backdrop-blur-lg border border-white/10 shadow-2xl rounded-3xl py-12">
          <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">Our Services</h1>
          <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl mt-4">
            We provide a comprehensive suite of technology services to fuel your success.
          </p>
        </div>
      </section>

      <section className="w-full pb-20 md:pb-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Card key={service.title} className="transition-all duration-300 hover:shadow-xl hover:-translate-y-2 bg-black/30 backdrop-blur-lg border border-white/10 hover:border-white/30 rounded-2xl shadow-lg group">
                <CardContent className="p-8">
                  <div className="mb-6 transition-transform duration-300 group-hover:scale-110 w-fit">{service.icon}</div>
                  <h3 className="font-headline text-2xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
