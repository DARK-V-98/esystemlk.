'use client';
import { Check, Star, Zap, Crown, Rocket, Palette } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { Globe, Code2, Server } from "lucide-react";

const Pricing = () => {
  const softwarePackages = [
    {
      icon: Globe,
      name: "Web Package",
      price: "150",
      description: "Perfect for small businesses and personal websites",
      popular: false,
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
      cta: "Get Started",
    },
    {
      icon: Code2,
      name: "Web App",
      price: "250",
      description: "For businesses needing custom functionality",
      popular: true,
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
      cta: "Most Popular",
    },
    {
      icon: Server,
      name: "Software System",
      price: "500",
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
      cta: "Contact Us",
    },
     {
      icon: Rocket,
      name: "Enterprise Pack",
      price: "Custom",
      description: "For large-scale, mission-critical applications.",
      popular: false,
      features: [
        "Everything in Software System",
        "Dedicated Development Team",
        "Advanced CI/CD & DevOps",
        "Service Level Agreement (SLA)",
        "On-premise Deployment Option",
        "Scalability & Performance Architecture",
        "24/7 Enterprise Support",
      ],
    },
  ];

  const logoPackages = [
     {
      icon: Palette,
      name: "Logo Only",
      price: "20",
      description: "A professional, high-quality logo for your brand.",
      popular: false,
      features: [
        "2-3 Custom Logo Concepts",
        "High-Resolution Files",
        "Vector Source Files (AI, SVG)",
        "3 Rounds of Revisions",
        "Full Ownership",
      ],
    },
    {
      icon: Star,
      name: "Normal Logo Pack",
      price: "50",
      description: "Essential assets for a new brand identity.",
      popular: false,
      features: [
        "Professional Quality Logo",
        "Business Card Design",
        "Basic Social Media Kit",
        "Vector Source Files",
        "Full Ownership",
      ],
    },
    {
      icon: Zap,
      name: "Standard Logo Pack",
      price: "100",
      description: "A complete package for a strong brand presence.",
      popular: true,
      features: [
        "Everything in Normal Pack",
        "Facebook Kit (Avatar, Banner, 5 Posts)",
        "YouTube Kit (Avatar, Banner, 5 Posts)",
        "Advanced Brand Guidelines",
        "Priority Support",
      ],
    },
    {
      icon: Crown,
      name: "Advanced Branding Suite",
      price: "200",
      description: "The ultimate solution for a comprehensive brand identity.",
      popular: false,
      features: [
        "Everything in Standard Pack",
        "Full Social Media Kit (FB, YT, Insta, LinkedIn)",
        "Animated Logo Intro",
        "Premium Stationery Designs",
        "Dedicated Brand Strategist",
      ],
    },
  ];

  const renderPackage = (pkg: any, index: number) => (
      <div
        key={index}
        className={`relative bg-card rounded-2xl p-6 border-2 flex flex-col transition-all duration-300 hover:-translate-y-2 ${
          pkg.popular
            ? "border-primary shadow-red-lg"
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
          {pkg.features.map((feature: string, idx: number) => (
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
  )

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

        <h3 className="text-2xl md:text-3xl font-bold text-center mb-10">Software & Web Development</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {softwarePackages.map(renderPackage)}
        </div>

        <h3 className="text-2xl md:text-3xl font-bold text-center mb-10 mt-20">Logo Design & Branding</h3>
        <p className="text-center text-muted-foreground -mt-6 mb-12 max-w-2xl mx-auto">Professional quality designs for your brand identity.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {logoPackages.map(renderPackage)}
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
