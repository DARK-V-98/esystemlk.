
'use client';

import { motion } from 'framer-motion';
import { useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';

export default function PageWrapper({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        const observerOptions = {
          root: null,
          rootMargin: "0px",
          threshold: 0.1,
        };

        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("animate-fade-in");
              entry.target.classList.remove("opacity-0");
            }
          });
        }, observerOptions);

        document.querySelectorAll(".animate-fade-in.opacity-0").forEach((el) => {
          observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <div className="min-h-screen bg-background">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                {children}
            </motion.div>
        </div>
    );
}
