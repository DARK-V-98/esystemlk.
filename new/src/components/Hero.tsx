import { Button } from "@/components/ui/button";
import { ArrowRight, Code2, Globe, Sparkles, Zap, Shield, Rocket } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-background">
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        
        {/* Gradient orbs */}
        <div className="absolute top-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-float" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-8 animate-fade-in opacity-0">
            <Sparkles className="w-4 h-4 text-primary animate-bounce-subtle" />
            <span className="text-sm font-medium text-primary">Trusted by 100+ Businesses</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in opacity-0 animation-delay-100">
            <span className="text-foreground">Transform Your Business with</span>
            <br />
            <span className="text-gradient">Premium Software Solutions</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 animate-fade-in opacity-0 animation-delay-200">
            We build stunning websites, powerful web applications, and comprehensive software systems 
            for businesses of all sizes. Starting from just <span className="text-primary font-semibold">$150</span> with 
            lifetime free maintenance.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in opacity-0 animation-delay-300">
            <Button variant="hero" size="xl" className="gap-2 group">
              Start Your Project
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="heroOutline" size="xl" className="gap-2">
              <Globe className="w-5 h-5" />
              View Our Work
            </Button>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap items-center justify-center gap-4 animate-fade-in opacity-0 animation-delay-400">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Lifetime Support</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Fast Delivery</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border">
              <Code2 className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Clean Code</span>
            </div>
          </div>
        </div>

        {/* Floating Tech Icons */}
        <div className="absolute top-32 left-10 animate-float animation-delay-200 hidden lg:block">
          <div className="w-16 h-16 rounded-2xl gradient-dark flex items-center justify-center shadow-lg">
            <Code2 className="w-8 h-8 text-primary" />
          </div>
        </div>
        <div className="absolute top-48 right-16 animate-float animation-delay-400 hidden lg:block">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
            <Rocket className="w-7 h-7 text-primary" />
          </div>
        </div>
        <div className="absolute bottom-40 left-20 animate-float animation-delay-600 hidden lg:block">
          <div className="w-12 h-12 rounded-xl bg-secondary border border-border flex items-center justify-center">
            <Globe className="w-6 h-6 text-primary" />
          </div>
        </div>
        <div className="absolute bottom-32 right-24 animate-float animation-delay-300 hidden lg:block">
          <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center shadow-red">
            <Zap className="w-7 h-7 text-primary-foreground" />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-subtle">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
          <div className="w-1 h-2 rounded-full bg-primary animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
