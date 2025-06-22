
import { Button } from "@/components/ui/button";
import { ArrowRight, CodeXml, CreditCard, Paintbrush, ServerCog } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getPageSettings } from "./admin/pages/actions";

const services = [
  {
    icon: <CodeXml className="w-10 h-10 text-primary" />,
    title: "Full-Stack Web Development",
    description: "End-to-end development of high-performance websites and applications, from database to UI."
  },
  {
    icon: <Paintbrush className="w-10 h-10 text-primary" />,
    title: "Front-End Development",
    description: "Creating beautiful, responsive, and intuitive user interfaces that provide an exceptional user experience."
  },
  {
    icon: <CreditCard className="w-10 h-10 text-primary" />,
    title: "Payment Integrations",
    description: "Securely integrate popular payment gateways to enable seamless transactions on your platform."
  },
  {
    icon: <ServerCog className="w-10 h-10 text-primary" />,
    title: "Hosting & Maintenance",
    description: "Reliable hosting solutions and ongoing maintenance to ensure your application is always secure and online."
  }
];

const testimonials = [
  {
    name: "Alex Rivera",
    title: "CEO, Innovate Co.",
    review: "ESystemLk's work is clean, precise, and always on point. They transformed our digital presence with their minimalist and powerful design philosophy. A true partner in excellence.",
    avatar: "https://placehold.co/100x100.png",
    hint: "happy client",
  },
  {
    name: "Samantha Chen",
    title: "Founder, Future-Forward",
    review: "The clarity and focus they brought to our project were remarkable. Their black and white aesthetic is not just a style; it's a statement of confidence and quality.",
    avatar: "https://placehold.co/100x100.png",
    hint: "business woman",
  }
];

export default async function Home() {
  const pageSettings = await getPageSettings();

  return (
    <div className="flex flex-col text-foreground">
      {/* Hero Section */}
      <section 
        className="w-full min-h-screen flex items-center justify-center py-20"
      >
        <div className="container mx-auto px-4 md:px-6 text-center">
            <div className="py-16 md:py-24 px-8">
                <h1 className="font-headline text-5xl md:text-8xl font-bold tracking-tighter uppercase drop-shadow-lg">
                    Clarity in Code.
                </h1>
                <h2 className="font-headline text-4xl md:text-6xl font-bold tracking-tighter uppercase text-white/70 mt-2 drop-shadow-md">
                    Power in Design.
                </h2>
                <p className="max-w-3xl text-white/90 mx-auto md:text-xl mt-8 leading-relaxed">
                    We are a digital agency that builds focused, high-impact digital solutions. No noise, just pure performance and elegant design that drives results.
                </p>
                <div className="mt-10">
                    <Button asChild size="lg" className="rounded-full text-lg px-10 py-7 bg-white text-black hover:bg-white/90 hover:shadow-lg hover:shadow-white/20 transition-all duration-300">
                    <Link href="/contact">Start a Project</Link>
                    </Button>
                </div>
            </div>
        </div>
      </section>

      {/* Featured Project Section */}
      {pageSettings.showPortfolio && (
        <section className="w-full py-20 md:py-28">
          <div className="container mx-auto px-4 md:px-6">
              <div className="grid lg:grid-cols-2 gap-16 items-center p-8 md:p-12 rounded-3xl bg-black/30 backdrop-blur-lg border border-white/10 shadow-2xl">
                  <div className="bg-black/20 p-4 border border-white/10 rounded-2xl group">
                      <Image
                          src="https://placehold.co/800x600.png"
                          alt="Project Alpha"
                          width={800}
                          height={600}
                          className="w-full rounded-lg transition-transform duration-500 group-hover:scale-105"
                          data-ai-hint="minimalist website"
                      />
                  </div>
                  <div className="flex flex-col justify-center">
                      <p className="text-sm uppercase tracking-widest text-muted-foreground mb-3">Featured Work</p>
                      <h2 className="font-headline text-4xl md:text-5xl font-bold mb-4">Project Alpha</h2>
                      <p className="text-muted-foreground text-lg mb-6">A case study in minimalist e-commerce design, focusing on user flow and conversion. We stripped back the unnecessary to create a fast, intuitive, and effective online store.</p>
                      <div className="flex flex-wrap gap-2 mb-8">
                          {["Next.js", "TypeScript", "Vercel", "Stripe"].map(t => (
                              <span key={t} className="text-sm border border-white/20 px-3 py-1 bg-white/10 rounded-full">
                              {t}
                              </span>
                          ))}
                      </div>
                      <Button asChild size="lg" variant="link" className="text-white text-lg px-0 justify-start w-fit group">
                          <Link href="/portfolio">View Full Portfolio <ArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-2" /></Link>
                      </Button>
                  </div>
              </div>
          </div>
        </section>
      )}

      {/* Services Section */}
      {pageSettings.showServices && (
        <section id="services" className="w-full py-20 md:py-28">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <h2 className="font-headline text-4xl md:text-5xl font-bold">Core Disciplines</h2>
              <p className="text-muted-foreground md:text-xl mt-4">We deliver excellence through a focused set of services, ensuring quality and mastery in every project.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service) => (
                <div key={service.title} className="bg-black/30 backdrop-blur-lg border border-white/10 p-8 rounded-3xl shadow-xl transition-all duration-300 hover:border-white/30 hover:-translate-y-2 group">
                  <div className="mb-6 transition-transform duration-300 group-hover:scale-110 w-fit">{service.icon}</div>
                  <h3 className="font-headline text-2xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      {pageSettings.showTestimonials && (
        <section id="testimonials" className="w-full py-20 md:py-28">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="font-headline text-4xl md:text-5xl font-bold">From Our Partners</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {testimonials.map((testimonial) => (
                 <div key={testimonial.name} className="bg-black/30 backdrop-blur-lg border border-white/10 rounded-3xl shadow-xl p-8 flex flex-col items-center text-center">
                    <Image src={testimonial.avatar} alt={testimonial.name} width={80} height={80} className="rounded-full mb-6 border-2 border-primary" data-ai-hint={testimonial.hint} />
                    <blockquote className="text-lg text-white/90 mb-6 italic">
                      "{testimonial.review}"
                    </blockquote>
                    <div className="mt-auto">
                        <p className="font-semibold text-white">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                    </div>
                 </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="w-full py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
            <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-10 md:p-16 text-center rounded-3xl shadow-2xl">
                <h2 className="font-headline text-3xl md:text-5xl font-bold">Define Your Digital Presence.</h2>
                <p className="max-w-2xl mx-auto mt-6 text-muted-foreground text-lg">
                    Ready to build something with clarity and purpose? Let's talk about your next project.
                </p>
                <div className="mt-10">
                    <Button asChild size="lg" className="bg-white text-black hover:bg-white/90 rounded-full text-lg px-10 py-7 hover:shadow-lg hover:shadow-white/20 transition-all duration-300">
                        <Link href="/contact">Get In Touch</Link>
                    </Button>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
}
