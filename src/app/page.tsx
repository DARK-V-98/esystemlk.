import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowRight, Award, CloudCog, CodeXml, Quote, Rocket, Users } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const features = [
  {
    icon: <Rocket className="w-10 h-10 text-primary" />,
    title: "Future-Forward",
    description: "We embrace cutting-edge technologies to deliver solutions that are not just current, but ahead of the curve."
  },
  {
    icon: <Award className="w-10 h-10 text-primary" />,
    title: "Unmatched Quality",
    description: "Our commitment to excellence ensures pixel-perfect, robust, and reliable digital products every time."
  },
  {
    icon: <Users className="w-10 h-10 text-primary" />,
    title: "Collaborative Spirit",
    description: "We believe in true partnership, working closely with you to turn your vision into a tangible success."
  }
];

const services = [
  {
    icon: <CodeXml className="w-8 h-8 text-primary" />,
    title: "Web Development",
    description: "Creating responsive, high-performance websites tailored to your business needs."
  },
  {
    icon: <CloudCog className="w-8 h-8 text-primary" />,
    title: "Cloud Solutions",
    description: "Leveraging cloud infrastructure for scalable, secure, and efficient business operations."
  }
];

const highlightedProject = {
    title: "E-commerce Platform",
    category: "Web App",
    image: "https://placehold.co/600x450.png",
    hint: "online store",
    description: "We engineered a high-performance, scalable e-commerce solution that delivered a seamless shopping experience and boosted client sales by 40%."
};

const testimonials = [
  {
    name: "John Doe",
    title: "CEO, Innovate Inc.",
    review: "ESystemLk delivered a game-changing product for us. Their expertise and dedication are unmatched. Highly recommended for any tech needs.",
    avatar: "https://placehold.co/100x100.png",
  },
  {
    name: "Jane Smith",
    title: "Founder, StartupX",
    review: "Working with the ESystemLk team was a fantastic experience. They understood our vision and brought it to life with precision and creativity.",
    avatar: "https://placehold.co/100x100.png",
  }
];

export default function Home() {
  return (
    <div className="flex flex-col bg-background">
      <section className="relative w-full min-h-[80vh] flex items-center bg-gradient-to-br from-secondary/30 via-background to-background">
        <div className="absolute inset-0 opacity-20 blur-3xl" aria-hidden="true">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/50 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/50 rounded-full translate-x-1/2 translate-y-1/2"></div>
        </div>
        <div className="container mx-auto px-4 md:px-6 z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                    <h1 className="font-headline text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground">
                        Crafting <span className="text-primary">Digital Excellence</span> for Tomorrow
                    </h1>
                    <p className="max-w-2xl text-muted-foreground md:text-xl mt-6">
                        We build exceptional web platforms and robust cloud solutions that empower your business to thrive in a digital-first world.
                    </p>
                    <div className="mt-10 flex flex-col sm:flex-row gap-4">
                        <Button asChild size="lg" className="rounded-full text-lg px-8 py-6">
                            <Link href="/contact">Start a Project</Link>
                        </Button>
                        <Button asChild size="lg" variant="outline" className="rounded-full text-lg px-8 py-6">
                            <Link href="/portfolio">Explore Our Work</Link>
                        </Button>
                    </div>
                </div>
                <div className="hidden lg:flex justify-center items-center">
                    <Image
                        src="https://placehold.co/600x600.png"
                        alt="Abstract digital art"
                        width={600}
                        height={600}
                        className="rounded-full shadow-2xl"
                        data-ai-hint="abstract technology"
                    />
                </div>
            </div>
        </div>
      </section>

      <section id="features" className="w-full py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
                <h2 className="font-headline text-4xl md:text-5xl font-bold">Why Partner with ESystemLk?</h2>
                <p className="text-muted-foreground md:text-xl mt-4 max-w-3xl mx-auto">We're more than just developers; we're your strategic partner in digital innovation and growth.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {features.map((feature) => (
                    <div key={feature.title} className="text-center p-6">
                        <div className="flex justify-center items-center mb-6 w-20 h-20 rounded-full bg-primary/10 mx-auto">
                            {feature.icon}
                        </div>
                        <h3 className="font-headline text-2xl font-semibold mb-3">{feature.title}</h3>
                        <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>
      
      <section id="services" className="w-full py-20 md:py-28 bg-secondary/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="font-headline text-4xl md:text-5xl font-bold">Our Core Expertise</h2>
            <p className="text-muted-foreground md:text-xl mt-4">We deliver excellence across the modern tech spectrum.</p>
          </div>
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service) => (
              <Card key={service.title} className="bg-background p-8 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-lg bg-primary/10">{service.icon}</div>
                  <div>
                    <h3 className="font-headline text-xl font-semibold mb-2">{service.title}</h3>
                    <p className="text-muted-foreground">{service.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="portfolio" className="w-full py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="order-2 lg:order-1">
                    <p className="text-primary font-semibold text-lg mb-2">Featured Project</p>
                    <h2 className="font-headline text-4xl md:text-5xl font-bold mb-4">{highlightedProject.title}</h2>
                    <p className="text-muted-foreground text-lg mb-6">{highlightedProject.description}</p>
                    <Button asChild size="lg" variant="link" className="text-primary text-lg px-0">
                        <Link href="/portfolio">View Full Portfolio <ArrowRight className="ml-2" /></Link>
                    </Button>
                </div>
                <div className="order-1 lg:order-2">
                    <Image
                        src={highlightedProject.image}
                        alt={highlightedProject.title}
                        width={600}
                        height={450}
                        className="rounded-2xl shadow-2xl"
                        data-ai-hint={highlightedProject.hint}
                    />
                </div>
            </div>
        </div>
      </section>

      <section id="testimonials" className="w-full py-20 md:py-28 bg-secondary/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="font-headline text-4xl md:text-5xl font-bold">Trusted by Industry Leaders</h2>
            <p className="text-muted-foreground md:text-xl mt-4">We thrive on the success and satisfaction of our partners.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name} className="bg-background border-0 shadow-lg">
                <CardContent className="p-8">
                  <Quote className="w-10 h-10 text-primary mb-4" />
                  <blockquote className="text-lg text-foreground/80 mb-6">
                    "{testimonial.review}"
                  </blockquote>
                  <div className="flex items-center">
                    <Avatar className="h-12 w-12 mr-4">
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
            <div className="bg-primary text-primary-foreground rounded-2xl shadow-xl p-10 md:p-16 text-center">
                <h2 className="font-headline text-3xl md:text-4xl font-bold">Have an Idea? Let's Build It.</h2>
                <p className="max-w-2xl mx-auto mt-4 text-primary-foreground/80 text-lg">
                    Your next big project starts with a conversation. Let's connect and explore how we can bring your vision to life.
                </p>
                <div className="mt-8">
                    <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full text-lg px-10 py-6">
                        <Link href="/contact">Get a Free Consultation</Link>
                    </Button>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
}
