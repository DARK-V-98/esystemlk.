"use client";

import { useState, useMemo } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";

const projects = [
  {
    title: "Zenith E-commerce",
    category: "Web App",
    image: "https://placehold.co/600x400.png",
    hint: "shopping cart",
    description: "A full-featured e-commerce platform with a custom CMS, payment gateway integration, and advanced product filtering.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL"]
  },
  {
    title: "Quantum Analytics",
    category: "Cloud Solution",
    image: "https://placehold.co/600x400.png",
    hint: "dashboard graph",
    description: "A scalable data analytics dashboard built on AWS, providing real-time data visualization and reporting for enterprise clients.",
    tech: ["AWS Lambda", "S3", "React", "D3.js", "Python"]
  },
  {
    title: "Innovate Corp Website",
    category: "Web App",
    image: "https://placehold.co/600x400.png",
    hint: "corporate website",
    description: "A modern, responsive corporate website with a headless CMS for easy content management and dynamic content delivery.",
    tech: ["Gatsby", "Contentful", "GraphQL", "Styled Components"]
  },
  {
    title: "SecureVault",
    category: "Cloud Solution",
    image: "https://placehold.co/600x400.png",
    hint: "data security",
    description: "A secure, cloud-native storage solution with end-to-end encryption and robust access control policies.",
    tech: ["Go", "Kubernetes", "Google Cloud", "Vault"]
  }
];

const categories = ["All", "Web App", "Cloud Solution"];

export default function PortfolioClient() {
  const [filter, setFilter] = useState("All");

  const filteredProjects = useMemo(() => {
    if (filter === "All") return projects;
    return projects.filter(p => p.category === filter);
  }, [filter]);

  return (
    <div>
      <div className="flex justify-center flex-wrap gap-2 mb-12">
        {categories.map(category => (
          <Button
            key={category}
            variant={filter === category ? "default" : "outline"}
            onClick={() => setFilter(category)}
            className="rounded-full"
          >
            {category}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project, index) => (
          <Card key={index} className="rounded-2xl shadow-lg overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
            <div className="overflow-hidden">
                <Image
                src={project.image}
                alt={project.title}
                width={600}
                height={400}
                className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                data-ai-hint={project.hint}
                />
            </div>
            <CardContent className="p-6">
              <p className="text-sm text-primary font-medium mb-1">{project.category}</p>
              <h3 className="font-headline text-xl font-semibold mb-2">{project.title}</h3>
              <p className="text-muted-foreground text-sm mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map(t => (
                  <span key={t} className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full">
                    {t}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
