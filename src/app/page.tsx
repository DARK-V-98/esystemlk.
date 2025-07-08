
import { Button } from "@/components/ui/button";
import { ArrowRight, CodeXml, CreditCard, Mail, MessageCircle, Paintbrush, Phone, ServerCog, Compass, Palette, ClipboardCheck, Rocket, LifeBuoy } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getPageSettings } from "./admin/pages/actions";
import { ContactForm } from "./contact/contact-form";
import { Card, CardContent } from "@/components/ui/card";
import { getPortfolioItems } from "./admin/portfolio/actions";

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

const processSteps = [
  {
    icon: Compass,
    title: "Discovery & Strategy",
    description:
      "We dive deep into your business goals and audience to create a comprehensive project blueprint and a roadmap for success.",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description:
      "Our team crafts intuitive and beautiful user interfaces. We create wireframes and prototypes to perfect the user experience.",
  },
  {
    icon: CodeXml,
    title: "Agile Development",
    description:
      "Using cutting-edge tech, our developers bring designs to life with clean, scalable code, keeping you in the loop.",
  },
  {
    icon: ClipboardCheck,
    title: "Quality Assurance",
    description:
      "We conduct rigorous testing to ensure your application is bug-free, performant, and secure across all devices.",
  },
  {
    icon: Rocket,
    title: "Deployment & Launch",
    description:
      "We handle the entire deployment process, ensuring a smooth launch on a reliable, scalable, and secure cloud infrastructure.",
  },
  {
    icon: LifeBuoy,
    title: "Ongoing Support",
    description:
      "Our partnership doesn't end at launch. We offer ongoing maintenance and support to ensure your digital asset evolves with you.",
  },
];

const values = [
  {
    title: "Innovation",
    description:
      "We constantly explore new technologies to deliver cutting-edge solutions that provide a competitive edge.",
  },
  {
    title: "Integrity",
    description:
      "We believe in transparent, honest, and ethical collaboration with our clients, building partnerships based on trust.",
  },
  {
    title: "Excellence",
    description:
      "We are committed to the highest standards of quality, precision, and craftsmanship in everything we create.",
  },
  {
    title: "Collaboration",
    description:
      "We work as a unified team with our clients, fostering open communication to achieve shared goals and exceptional results.",
  },
];

export default async function Home() {
  const pageSettings = await getPageSettings();
  const portfolioItems = await getPortfolioItems();
  const featuredProject = portfolioItems.length > 0 ? portfolioItems[0] : null;

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
      {featuredProject && (
        <section className="w-full py-20 md:py-28">
          <div className="container mx-auto px-4 md:px-6">
              <div className="grid lg:grid-cols-2 gap-16 items-center p-8 md:p-12 rounded-3xl bg-black/30 backdrop-blur-lg border border-white/10 shadow-2xl">
                  <a href={featuredProject.link} target="_blank" rel="noopener noreferrer" className="bg-black/20 p-4 border border-white/10 rounded-2xl group">
                      <Image
                          src={featuredProject.imageUrl}
                          alt={featuredProject.name}
                          width={800}
                          height={600}
                          className="w-full rounded-lg transition-transform duration-500 group-hover:scale-105"
                      />
                  </a>
                  <div className="flex flex-col justify-center">
                      <p className="text-sm uppercase tracking-widest text-muted-foreground mb-3">Featured Work</p>
                      <h2 className="font-headline text-4xl md:text-5xl font-bold mb-4">{featuredProject.name}</h2>
                      <p className="text-muted-foreground text-lg mb-6">
                        Check out one of our latest projects. We focus on creating modern, performant, and user-friendly digital experiences.
                      </p>
                      <div className="flex flex-wrap gap-2 mb-8">
                          {["Next.js", "TypeScript", "Firebase", "Tailwind CSS"].map(t => (
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

      {/* Our Approach Section */}
      <section className="w-full py-20 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">
              Our Approach to Digital Excellence
            </h2>
            <p className="text-muted-foreground md:text-lg mt-2 max-w-3xl mx-auto">
              We follow a structured and collaborative process to ensure every
              project is a masterpiece of strategy, design, and technology.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {processSteps.map((step, index) => (
              <div
                key={index}
                className="p-8 rounded-3xl bg-black/30 backdrop-blur-lg border border-white/10 shadow-2xl transition-all duration-300 hover:border-primary hover:-translate-y-2 group text-center"
              >
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 rounded-full bg-black/20 border-2 border-primary/50 flex items-center justify-center transition-all duration-300 group-hover:border-primary group-hover:scale-110">
                    <step.icon className="w-10 h-10 text-primary transition-transform duration-300 group-hover:rotate-12" />
                  </div>
                </div>
                <h3 className="font-headline text-xl font-semibold mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="w-full py-20 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">
              Our Core Values
            </h2>
            <p className="text-muted-foreground md:text-lg mt-2">
              The principles that guide our work and culture.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <Card
                key={value.title}
                className="text-center p-6 rounded-2xl shadow-lg bg-black/30 backdrop-blur-lg border border-white/10"
              >
                <h3 className="font-headline text-xl font-semibold mb-2">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {value.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="w-full py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <h2 className="font-headline text-4xl md:text-5xl font-bold">Get In Touch</h2>
              <p className="text-muted-foreground md:text-xl mt-4">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                <div>
                    <h3 className="font-headline text-2xl font-bold mb-6">Send us a message</h3>
                    <ContactForm />
                </div>
                <div className="space-y-8">
                    <h3 className="font-headline text-2xl font-bold">Contact Information</h3>
                    <Card className="bg-black/30 backdrop-blur-lg border border-white/10 rounded-2xl shadow-md">
                        <CardContent className="p-6">
                            <a href="mailto:contact@esystemlk.com" className="flex items-center gap-4 group">
                                <Mail className="w-8 h-8 text-primary" />
                                <div>
                                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">Email</h3>
                                    <p className="text-muted-foreground">contact@esystemlk.com</p>
                                </div>
                            </a>
                        </CardContent>
                    </Card>
                     <Card className="bg-black/30 backdrop-blur-lg border border-white/10 rounded-2xl shadow-md">
                        <CardContent className="p-6">
                            <a href="https://wa.me/94765711396" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                                <MessageCircle className="w-8 h-8 text-primary" />
                                <div>
                                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">WhatsApp</h3>
                                    <p className="text-muted-foreground">+94 76 571 1396</p>
                                </div>
                            </a>
                        </CardContent>
                    </Card>
                    <Card className="bg-black/30 backdrop-blur-lg border border-white/10 rounded-2xl shadow-md">
                        <CardContent className="p-6">
                            <a href="tel:+94765711396" className="flex items-center gap-4 group">
                                <Phone className="w-8 h-8 text-primary" />
                                <div>
                                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">Phone</h3>
                                    <p className="text-muted-foreground">+94 76 571 1396</p>
                                </div>
                            </a>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
}
