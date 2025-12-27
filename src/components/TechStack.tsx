'use client';
import { Cpu, Layers, Cloud, Database, Code, Wind, Server, Palette, Lock, Laptop, Box, FileJson, Container, Figma } from "lucide-react";


const TechStack = () => {
  const technologies = [
    { icon: Laptop, name: "React", href: "https://reactjs.org/" },
    { icon: Box, name: "Next.js", href: "https://nextjs.org/" },
    { icon: Wind, name: "Tailwind CSS", href: "https://tailwindcss.com/" },
    { icon: FileJson, name: "TypeScript", href: "https://www.typescriptlang.org/" },
    { icon: Server, name: "Node.js", href: "https://nodejs.org/" },
    { icon: Database, name: "MongoDB", href: "https://www.mongodb.com/" },
    { icon: Database, name: "PostgreSQL", href: "https://www.postgresql.org/" },
    { icon: Cloud, name: "Firebase", href: "https://firebase.google.com/" },
    { icon: Container, name: "Docker", href: "https://www.docker.com/" },
    { icon: Cloud, name: "AWS", href: "https://aws.amazon.com/" },
    { icon: Figma, name: "Figma", href: "https://www.figma.com/" },
    { icon: Lock, name: "Auth", href: "#" },
  ];

  return (
    <section id="tech" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--primary)) 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-6">
            <Cpu className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Technologies</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Our Tech Stack
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            We use the latest and greatest technologies to build fast, scalable, and secure solutions.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
          {technologies.map((tech, index) => (
            <a
              key={index}
              href={tech.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center justify-center p-6 rounded-2xl bg-card border border-border hover:border-primary/50 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-12 h-12 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                 <tech.icon className="w-10 h-10 text-primary opacity-80 group-hover:opacity-100 transition-opacity" />
              </div>
              <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                {tech.name}
              </span>
            </a>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-secondary/50 text-muted-foreground">
            <Layers className="w-4 h-4" />
            <span>And many more cutting-edge technologies...</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
