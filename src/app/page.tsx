import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, CloudCog, CodeXml, PenTool, ShieldCheck } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const services = [
  {
    icon: <CodeXml className="w-8 h-8 text-foreground" />,
    title: "Web Development",
    description: "Bespoke, high-performance websites and applications tailored to your business objectives."
  },
  {
    icon: <CloudCog className="w-8 h-8 text-foreground" />,
    title: "Cloud & DevOps",
    description: "Scalable cloud infrastructure, migration, and CI/CD pipelines for streamlined development."
  },
  {
    icon: <PenTool className="w-8 h-8 text-foreground" />,
    title: "UI/UX Design",
    description: "Visually stunning and user-friendly interfaces that enhance user satisfaction and drive engagement."
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-foreground" />,
    title: "IT Security",
    description: "Comprehensive security audits and strategic consulting to fortify your systems against threats."
  }
];

const testimonials = [
  {
    name: "Alex Rivera",
    title: "CEO, Innovate Co.",
    review: "ESystemLk's work is clean, precise, and always on point. They transformed our digital presence with their minimalist and powerful design philosophy. A true partner in excellence.",
  },
  {
    name: "Samantha Chen",
    title: "Founder, Future-Forward",
    review: "The clarity and focus they brought to our project were remarkable. Their black and white aesthetic is not just a style; it's a statement of confidence and quality.",
  }
];

export default function Home() {
  return (
    <div className="flex flex-col bg-background text-foreground">
      {/* Hero Section */}
      <section className="w-full h-[90vh] min-h-[600px] flex items-center justify-center bg-foreground text-background">
        <div className="container mx-auto px-4 md:px-6 text-center z-10">
          <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tighter uppercase">
            Clarity in Code.
          </h1>
          <h2 className="font-headline text-5xl md:text-7xl font-bold tracking-tighter uppercase text-muted-foreground/80">
            Power in Design.
          </h2>
          <p className="max-w-2xl text-muted-foreground mx-auto md:text-xl mt-6">
            We build focused, high-impact digital solutions. No noise, just results.
          </p>
          <div className="mt-10">
            <Button asChild size="lg" variant="outline" className="rounded-none text-lg px-8 py-6 bg-transparent border-background text-background hover:bg-background hover:text-foreground">
              <Link href="/contact">Start a Project</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Project Section */}
      <section className="w-full py-20 md:py-28 border-b">
        <div className="container mx-auto px-4 md:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="flex flex-col justify-center">
                    <p className="text-sm uppercase tracking-widest text-muted-foreground mb-3">Featured Work</p>
                    <h2 className="font-headline text-4xl md:text-5xl font-bold mb-4">Project Alpha</h2>
                    <p className="text-muted-foreground text-lg mb-6">A case study in minimalist e-commerce design, focusing on user flow and conversion. We stripped back the unnecessary to create a fast, intuitive, and effective online store.</p>
                    <div className="flex flex-wrap gap-2 mb-8">
                        {["Next.js", "TypeScript", "Vercel", "Stripe"].map(t => (
                            <span key={t} className="text-sm border px-3 py-1">
                            {t}
                            </span>
                        ))}
                    </div>
                    <Button asChild size="lg" variant="link" className="text-foreground text-lg px-0 justify-start w-fit">
                        <Link href="/portfolio">View Full Portfolio <ArrowRight className="ml-2" /></Link>
                    </Button>
                </div>
                <div className="bg-secondary p-4 border">
                    <Image
                        src="https://placehold.co/800x600.png"
                        alt="Project Alpha"
                        width={800}
                        height={600}
                        className="w-full"
                        data-ai-hint="minimalist website"
                    />
                </div>
            </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="w-full py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="font-headline text-4xl md:text-5xl font-bold">Core Disciplines</h2>
            <p className="text-muted-foreground md:text-xl mt-4">We deliver excellence through a focused set of services, ensuring quality and mastery in every project.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
            {services.map((service) => (
              <div key={service.title} className="bg-background p-8">
                <div className="mb-4">{service.icon}</div>
                <h3 className="font-headline text-2xl font-semibold mb-2">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="w-full py-20 md:py-28 bg-foreground text-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="font-headline text-4xl md:text-5xl font-bold">From Our Partners</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name} className="bg-transparent border-muted-foreground/30 rounded-none">
                <CardContent className="p-8">
                  <blockquote className="text-lg text-background/80 mb-6 border-l-2 border-background pl-6 italic">
                    "{testimonial.review}"
                  </blockquote>
                  <div className="flex items-center">
                    <div>
                      <p className="font-semibold text-background">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
            <div className="bg-background border p-10 md:p-16 text-center">
                <h2 className="font-headline text-3xl md:text-4xl font-bold">Define Your Digital Presence.</h2>
                <p className="max-w-2xl mx-auto mt-4 text-muted-foreground text-lg">
                    Ready to build something with clarity and purpose? Let's talk.
                </p>
                <div className="mt-8">
                    <Button asChild size="lg" className="bg-foreground text-background hover:bg-foreground/80 rounded-none text-lg px-10 py-6">
                        <Link href="/contact">Get In Touch</Link>
                    </Button>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
}
