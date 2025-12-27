
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import { FirebaseClientProvider } from "@/firebase/client-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ESystemLk - Custom Software & Web Solutions",
  description: "eSystemLK is a leading software company in Sri Lanka, specializing in custom web development, web applications, and software systems. We offer lifetime free maintenance.",
  keywords: "software company sri lanka, web development, web application, custom software, esystemlk, POS system",
  authors: [{ name: "ESystemLk" }],
  openGraph: {
    title: "ESystemLk - Custom Software & Web Solutions",
    description: "Transform your business with premium software solutions. We build stunning websites, powerful web applications, and comprehensive software systems.",
    url: "https://www.esystemlk.xyz",
    siteName: "ESystemLk",
    images: [
      {
        url: 'https://www.esystemlk.xyz/logo.png', // Replace with a link to your logo or a relevant image
        width: 800,
        height: 600,
        alt: 'ESystemLk Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ESystemLk - Custom Software & Web Solutions',
    description: 'Custom web development, web applications, and software systems with lifetime free maintenance.',
    images: ['https://www.esystemlk.xyz/logo.png'], // Replace with your image
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <FirebaseClientProvider>
          <Navbar />
          <main className="pt-20">{children}</main>
          <Footer />
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
