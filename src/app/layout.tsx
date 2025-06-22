import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from "@/components/ui/toaster";
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'ESystemLk - Your Trusted Tech Partner',
  description: 'ESystemLk offers cutting-edge web development and cloud solutions to elevate your business.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-black text-foreground">
        <div className="fixed inset-0 z-[-2]">
            <Image
            src="/bg.jpg"
            alt="Background"
            fill
            sizes="100vw"
            className="object-cover"
            priority
            />
            <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-0 flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
