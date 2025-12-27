import { Cpu } from "lucide-react";

const technologies = [
  { name: "React", icon: "⚛️", category: "Frontend" },
  { name: "Next.js", icon: "▲", category: "Framework" },
  { name: "TypeScript", icon: "TS", category: "Language" },
  { name: "Node.js", icon: "🟢", category: "Backend" },
  { name: "PostgreSQL", icon: "🐘", category: "Database" },
  { name: "MongoDB", icon: "🍃", category: "Database" },
  { name: "Tailwind CSS", icon: "🎨", category: "Styling" },
  { name: "AWS", icon: "☁️", category: "Cloud" },
  { name: "Docker", icon: "🐳", category: "DevOps" },
  { name: "Git", icon: "📦", category: "Version Control" },
  { name: "Figma", icon: "🎯", category: "Design" },
  { name: "Stripe", icon: "💳", category: "Payments" },
];

const TechStack = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--foreground)) 1px, transparent 0)`,
        backgroundSize: "32px 32px",
      }} />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-6 animate-fade-in opacity-0">
            <Cpu className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Tech Stack</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 animate-fade-in opacity-0 animation-delay-100">
            Built with Modern Technology
          </h2>
          <p className="text-lg text-muted-foreground animate-fade-in opacity-0 animation-delay-200">
            We use cutting-edge technologies to build fast, secure, and scalable solutions for your business.
          </p>
        </div>

        {/* Tech Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
          {technologies.map((tech, index) => (
            <div
              key={tech.name}
              className={`group relative bg-card border border-border rounded-2xl p-6 text-center hover:border-primary/50 transition-all duration-500 hover:shadow-red hover:-translate-y-1 animate-fade-in opacity-0`}
              style={{ animationDelay: `${(index + 3) * 50}ms` }}
            >
              {/* Icon */}
              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                {tech.icon}
              </div>

              {/* Name */}
              <div className="font-semibold text-foreground text-sm mb-1 group-hover:text-primary transition-colors">
                {tech.name}
              </div>

              {/* Category */}
              <div className="text-xs text-muted-foreground">
                {tech.category}
              </div>

              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <p className="text-center text-muted-foreground mt-12 animate-fade-in opacity-0 animation-delay-700">
          And many more! We choose the best tools for each project based on your specific requirements.
        </p>
      </div>
    </section>
  );
};

export default TechStack;
