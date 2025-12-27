'use client';
import { Check, Star, Zap, Crown, Rocket, Palette } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

const Pricing = () => {
  const packages = [
    {
      icon: Star,
      name: "Starter Website",
      price: "150",
      description: "Perfect for small businesses and personal projects",
      popular: false,
      features: [
        "5-Page Responsive Website",
        "Mobile Optimized",
        "Contact Form",
        "Basic SEO Setup",
        "Social Media Links",
        "1 Month Free Support",
        "Free Lifetime Warranty",
      ],
    },
    {
      icon: Palette,
      name: "Logo & Branding",
      price: "40",
      description: "Professional logos & branding for your business",
      popular: true,
      features: [
        "Essential Logo Design",
        "Business Starter Kit",
        "Premium Branding Suite",
        "Full Social Media Kit",
        "Business Card Design",
        "Animated Logo Intro",
        "Unlimited Revisions",
      ],
    },
    {
      icon: Zap,
      name: "Web Application",
      price: "250",
      description: "Ideal for businesses needing custom functionality",
      popular: false,
      features: [
        "Custom Web App Development",
        "User Authentication",
        "Admin Dashboard",
        "Database Integration",
        "API Development",
        "3 Months Free Support",
        "Free Lifetime Warranty",
      ],
    },
    {
      icon: Crown,
      name: "Software System",
      price: "500",
      description: "Enterprise-grade solutions for growing businesses",
      popular: false,
      features: [
        "Full Software Development",
        "Advanced Features",
        "Multiple Integrations",
        "Scalable Architecture",
        "Security Implementation",
        "6 Months Free Support",
        "Free Lifetime Warranty",
      ],
    },
  ];

  return (
    <section id="pricing" className="py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium mb-4">
            <Crown className="w-4 h-4" />
            <span>Transparent Pricing</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Affordable <span className="text-gradient">Packages</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Quality solutions at unbeatable prices. All packages include free lifetime service warranty!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className={`relative bg-card rounded-2xl p-6 border-2 flex flex-col transition-all duration-300 hover:-translate-y-2 ${
                pkg.popular
                  ? "border-primary shadow-red-lg scale-105"
                  : "border-border hover:border-primary/50"
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 gradient-primary rounded-full text-primary-foreground text-sm font-semibold shadow-red">
                  Most Popular
                </div>
              )}

              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  pkg.popular ? "gradient-primary shadow-red" : "bg-primary/10"
                }`}>
                  <pkg.icon className={`w-6 h-6 ${pkg.popular ? "text-primary-foreground" : "text-primary"}`} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{pkg.name}</h3>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-primary font-medium mb-1">Starting from</p>
                <div className="flex items-baseline gap-1">
                  {pkg.price !== "Custom" && <span className="text-2xl font-bold text-primary">$</span>}
                  <span className="text-4xl font-bold">{pkg.price}</span>
                  {pkg.price !== "Custom" && <span className="text-muted-foreground">/project</span>}
                </div>
                <p className="text-sm text-muted-foreground mt-2 h-10">{pkg.description}</p>
              </div>

              <ul className="space-y-3 mb-6 flex-grow">
                {pkg.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                asChild
                variant={pkg.popular ? "hero" : "heroOutline"}
                className="w-full mt-auto"
              >
                <Link href="#contact">
                  {pkg.price === "Custom" ? "Contact Us" : "Get Started"}
                </Link>
              </Button>
            </div>
          ))}
        </div>

        {/* Terms note */}
        <div className="text-center mt-12 space-y-2">
          <p className="text-muted-foreground text-sm">
            * All packages include our exclusive{" "}
            <span className="text-primary font-semibold">Free Lifetime Service Warranty</span>.
            <a href="#contact" className="text-primary hover:underline ml-1">
              Terms & Conditions apply.
            </a>
          </p>
          <p className="text-muted-foreground text-xs">
            ** Please note that these are starting prices. The final cost may vary based on project complexity.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
