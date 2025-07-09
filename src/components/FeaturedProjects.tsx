
"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export interface PortfolioItem {
  id: string;
  name: string;
  link: string;
  imageUrl: string;
  hint: string;
}

interface FeaturedProjectsProps {
  items: PortfolioItem[];
}

export default function FeaturedProjects({ items }: FeaturedProjectsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!items || items.length === 0) {
    return null;
  }

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? items.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === items.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  
  const currentItem = items[currentIndex];

  return (
    <section className="w-full py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <div className="relative p-8 md:p-12 rounded-3xl bg-black/30 backdrop-blur-lg border border-white/10 shadow-2xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatePresence mode="wait">
              <motion.a
                key={currentItem.id}
                href={currentItem.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black/20 p-4 border border-white/10 rounded-2xl group"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src={currentItem.imageUrl}
                  alt={currentItem.name}
                  width={800}
                  height={600}
                  className="w-full rounded-lg transition-transform duration-500 group-hover:scale-105"
                  data-ai-hint={currentItem.hint}
                />
              </motion.a>
            </AnimatePresence>
            <div className="flex flex-col justify-center">
              <p className="text-sm uppercase tracking-widest text-muted-foreground mb-3">Featured Work</p>
              <h2 className="font-headline text-4xl md:text-5xl font-bold mb-4">{currentItem.name}</h2>
              <p className="text-muted-foreground text-lg mb-6">
                Check out one of our latest projects. We focus on creating modern, performant, and user-friendly digital experiences.
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {["Next.js", "TypeScript", "Firebase", "Tailwind CSS"].map(t => (
                  <span key={t} className="text-sm border border-white/20 px-3 py-1 bg-white/10 rounded-full">
                    {t}
                  </span>
                ))}
              </div>
              <Button asChild size="lg" variant="link" className="text-white text-lg px-0 justify-start w-fit group">
                <Link href="/portfolio">View Full Portfolio <ArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-2" /></Link>
              </Button>
            </div>
          </div>
          <div className="absolute inset-y-0 left-0 flex items-center">
            <Button onClick={goToPrevious} variant="ghost" size="icon" className="h-12 w-12 rounded-full bg-black/30 hover:bg-black/50 -ml-6">
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center">
            <Button onClick={goToNext} variant="ghost" size="icon" className="h-12 w-12 rounded-full bg-black/30 hover:bg-black/50 -mr-6">
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
