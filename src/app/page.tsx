import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CodeXml, CloudCog, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { StarRating } from "@/components/StarRating";

const services = [
  {
    icon: <CodeXml className="w-10 h-10 text-primary" />,
    title: "Web Development",
    description: "Creating responsive, high-performance websites tailored to your business needs."
  },
  {
    icon: <CloudCog className="w-10 h-10 text-primary" />,
    title: "Cloud Solutions",
    description: "Leveraging cloud infrastructure for scalable, secure, and efficient business operations."
  }
];

const portfolio = [
  {
    title: "E-commerce Platform",
    category: "Web App",
    image: "https://placehold.co/600x400.png",
    hint: "online store"
  },
  {
    title: "Data Analytics Dashboard",
    category: "Cloud Solution",
    image: "https://placehold.co/600x400.png",
    hint: "data chart"
  }
];

const testimonials = [
  {
    name: "John Doe",
    title: "CEO, Innovate Inc.",
    review: "ESystemLk delivered a game-changing product for us. Their expertise and dedication are unmatched. Highly recommended for any tech needs.",
    avatar: "https://placehold.co/100x100.png",
    rating: 5,
  },
  {
    name: "Jane Smith",
    title: "Founder, StartupX",
    review: "Working with the ESystemLk team was a fantastic experience. They understood our vision and brought it to life with precision and creativity.",
    avatar: "https://placehold.co/100x100.png",
    rating: 5,
  }
];

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="w-full py-20 md:py-32 lg:py-40 bg-background">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-foreground">
            Innovative Tech Solutions for a Digital World
          </h1>
          <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl mt-6">
            ESystemLk is your trusted partner in building robust web platforms and scalable cloud infrastructures that drive growth and efficiency.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/contact">Get Started</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/services">Our Services</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="services" className="w-full py-20 md:py-24 bg-secondary/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Our Core Services</h2>
            <p className="text-muted-foreground md:text-lg mt-2">We deliver excellence across the tech spectrum.</p>
          </div>
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service) => (
              <Card key={service.title} className="text-center p-8 rounded-2xl shadow-lg transition-transform duration-300 hover:-translate-y-2">
                <div className="flex justify-center mb-4">{service.icon}</div>
                <h3 className="font-headline text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="portfolio" className="w-full py-20 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Featured Projects</h2>
            <p className="text-muted-foreground md:text-lg mt-2">A glimpse into our craftsmanship and innovation.</p>
          </div>
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {portfolio.map((project) => (
              <Card key={project.title} className="overflow-hidden rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105">
                <Image src={project.image} alt={project.title} width={600} height={400} className="w-full object-cover" data-ai-hint={project.hint} />
                <CardContent className="p-6">
                  <h3 className="font-headline text-xl font-semibold">{project.title}</h3>
                  <p className="text-sm text-primary font-medium mt-1">{project.category}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild variant="link" className="text-primary text-lg">
              <Link href="/portfolio">View Full Portfolio <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="testimonials" className="w-full py-20 md:py-24 bg-secondary/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">What Our Clients Say</h2>
            <p className="text-muted-foreground md:text-lg mt-2">We thrive on the success and satisfaction of our partners.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name} className="p-6 rounded-2xl shadow-lg">
                <CardContent className="p-0">
                  <div className="flex items-center mb-4">
                    <Avatar className="h-12 w-12 mr-4">
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-headline font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                    </div>
                  </div>
                  <StarRating rating={testimonial.rating} />
                  <blockquote className="text-muted-foreground mt-4 italic">"{testimonial.review}"</blockquote>
                </CardContent>
              </Card>
            ))}
          </div>
           <div className="text-center mt-12">
            <Button asChild variant="link" className="text-primary text-lg">
              <Link href="/testimonials">More Testimonials <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="w-full py-20 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">Ready to Start Your Project?</h2>
          <p className="max-w-[600px] mx-auto mt-4 text-primary-foreground/80">
            Let's turn your ideas into reality. Reach out to us today for a free consultation.
          </p>
          <div className="mt-8">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
