'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  MessageCircle,
  Globe,
  ArrowRight,
  CheckCircle2
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours.",
    });
  };

  return (
    <section id="contact" className="py-24 bg-secondary/30 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/3 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-6 animate-fade-in opacity-0">
            <MessageCircle className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Get In Touch</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 animate-fade-in opacity-0 animation-delay-100">
            Let's Build Something <span className="text-gradient">Amazing</span>
          </h2>
          <p className="text-lg text-muted-foreground animate-fade-in opacity-0 animation-delay-200">
            Ready to start your project? Contact us today for a free consultation and quote.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className="bg-card border border-border rounded-3xl p-8 md:p-10 animate-fade-in opacity-0 animation-delay-300">
            {isSubmitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6 animate-scale-in">
                  <CheckCircle2 className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
                <p className="text-muted-foreground mb-6">
                  Your message has been sent successfully. We'll get back to you soon.
                </p>
                <Button
                  variant="heroOutline"
                  onClick={() => setIsSubmitted(false)}
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Your Name
                    </label>
                    <Input
                      placeholder="John Doe"
                      required
                      className="h-12 bg-secondary border-border focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email Address
                    </label>
                    <Input
                      type="email"
                      placeholder="john@example.com"
                      required
                      className="h-12 bg-secondary border-border focus:border-primary"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Phone Number
                  </label>
                  <Input
                    type="tel"
                    placeholder="+94 77 123 4567"
                    className="h-12 bg-secondary border-border focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Project Type
                  </label>
                  <select className="w-full h-12 px-4 rounded-lg bg-secondary border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all">
                    <option value="">Select a service</option>
                    <option value="website">Website ($150+)</option>
                    <option value="webapp">Web Application ($250+)</option>
                    <option value="software">Software System ($500+)</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Project Details
                  </label>
                  <Textarea
                    placeholder="Tell us about your project requirements..."
                    rows={5}
                    required
                    className="bg-secondary border-border focus:border-primary resize-none"
                  />
                </div>
                <Button
                  type="submit"
                  variant="hero"
                  size="lg"
                  className="w-full gap-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>

          <div className="space-y-8 animate-fade-in opacity-0 animation-delay-400">
            <div className="space-y-4">
              {[
                {
                  icon: Mail,
                  title: "Email Us",
                  value: "info@esystemlk.com",
                  link: "mailto:info@esystemlk.com",
                },
                {
                  icon: Phone,
                  title: "Call Us",
                  value: "+94 77 123 4567",
                  link: "tel:+94771234567",
                },
                {
                  icon: Globe,
                  title: "Website",
                  value: "www.esystemlk.com",
                  link: "#",
                },
                {
                  icon: MapPin,
                  title: "Location",
                  value: "Sri Lanka",
                  link: "#",
                },
              ].map((item, index) => (
                <a
                  key={item.title}
                  href={item.link}
                  className="flex items-center gap-4 p-5 bg-card border border-border rounded-2xl hover:border-primary/50 hover:shadow-red transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform shadow-red">
                    <item.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">{item.title}</div>
                    <div className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {item.value}
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </a>
              ))}
            </div>

            <div className="p-8 rounded-3xl gradient-dark text-accent-foreground">
              <h3 className="text-2xl font-bold mb-4">
                Ready to Get Started?
              </h3>
              <p className="text-accent-foreground/80 mb-6">
                Get a free consultation and detailed quote for your project. 
                No obligations, just expert advice.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span>Free Consultation</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span>No Hidden Fees</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span>Quick Response</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
