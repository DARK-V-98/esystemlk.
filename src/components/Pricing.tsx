import { Button } from "@/components/ui/button";
import { 
  Check, 
  Star, 
  Globe, 
  Code2, 
  Server,
  ArrowRight,
  Sparkles
} from "lucide-react";
import Link from "next/link";

const pricingPlans = [
  {
    icon: Globe,
    name: "Web Package",
    price: 150,
    description: "Perfect for small businesses and personal websites",
    features: [
      "Responsive Website Design",
      "Up to 5 Pages",
      "Contact Form",
      "Social Media Integration",
      "Basic SEO Setup",
      "Mobile Friendly",
      "Free Domain Setup Help",
      "Lifetime Free Maintenance",
    ],
    popular: false,
    cta: "Get Started",
  },
  {
    icon: Code2,
    name: "Web App",
    price: 250,
    description: "For businesses needing custom functionality",
    features: [
      "Everything in Web Package",
      "Custom Web Application",
      "User Authentication",
      "Admin Dashboard",
      "Database Integration",
      "API Development",
      "Real-time Features",
      "Lifetime Free Maintenance",
    ],
    popular: true,
    cta: "Most Popular",
  },
  {
    icon: Server,
    name: "Software System",
    price: 500,
    description: "Complete enterprise-grade solutions",
    features: [
      "Everything in Web App",
      "Full System Development",
      "Multi-user Support",
      "Advanced Security",
      "Custom Integrations",
      "Data Analytics",
      "Priority Support",
      "Lifetime Free Maintenance",
    ],
    popular: false,
    cta: "Contact Us",
  },
];

const Pricing = () => {
  return (
    <section id="pricing" className="py-24 bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/3 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-6 animate-fade-in opacity-0">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Transparent Pricing</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 animate-fade-in opacity-0 animation-delay-100">
            Simple, Affordable Pricing
          </h2>
          <p className="text-lg text-muted-foreground animate-fade-in opacity-0 animation-delay-200">
            Choose the perfect package for your needs. All packages include lifetime free maintenance and support.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative bg-card border rounded-3xl p-8 transition-all duration-500 animate-fade-in opacity-0 ${
                plan.popular
                  ? "border-primary shadow-red-lg scale-105 z-10"
                  : "border-border hover:border-primary/50 hover:shadow-red"
              }`}
              style={{ animationDelay: `${(index + 3) * 100}ms` }}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full gradient-primary text-primary-foreground text-sm font-semibold shadow-red">
                    <Star className="w-4 h-4" />
                    Most Popular
                  </div>
                </div>
              )}

              {/* Icon */}
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${
                plan.popular ? "gradient-primary shadow-red" : "bg-secondary border border-border"
              }`}>
                <plan.icon className={`w-7 h-7 ${plan.popular ? "text-primary-foreground" : "text-primary"}`} />
              </div>

              {/* Plan Info */}
              <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
              <p className="text-muted-foreground mb-6">{plan.description}</p>

              {/* Price */}
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl font-bold text-foreground">${plan.price}</span>
                <span className="text-muted-foreground">starting</span>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <div className="mt-1 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button asChild
                variant={plan.popular ? "hero" : "heroOutline"}
                size="lg"
                className="w-full gap-2 group"
              >
                <Link href="#contact">
                  {plan.cta}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          ))}
        </div>

        {/* Terms Note */}
        <p className="text-center text-muted-foreground mt-12 animate-fade-in opacity-0 animation-delay-700">
          * All prices are starting prices. Final cost depends on project requirements.
          <br />
          Terms and conditions apply. Contact us for detailed quotations.
        </p>
      </div>
    </section>
  );
};

export default Pricing;
