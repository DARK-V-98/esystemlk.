'use client';

import { useState, useEffect } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import LoadingScreen from "@/components/LoadingScreen";

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      const loadingScreen = document.getElementById('loading-screen');
      if (loadingScreen) {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            setIsLoading(false);
        }, 500);
      }
    };
    
    // Use window.onload to wait for all resources
    if (document.readyState === 'complete') {
        handleLoad();
    } else {
        window.addEventListener('load', handleLoad);
        return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  return (
    <>
      {isLoading && <LoadingScreen />}
      <Navbar />
      <main>{children}</main>
      <Footer />
      <Toaster />
    </>
  );
}
