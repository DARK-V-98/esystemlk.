import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from "@/components/ui/toaster";
import { Poppins, DM_Sans } from 'next/font/google'
import { cn } from '@/lib/utils';
import { AuthProvider } from '@/hooks/use-auth';

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['400', '600', '700']
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dm-sans',
  weight: ['400', '500', '700']
});

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
    <html lang="en" className={cn("scroll-smooth", poppins.variable, dmSans.variable)}>
      <body className="font-body antialiased bg-black text-foreground">
        <AuthProvider>
          <div className="fixed inset-0 z-[-2]">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              >
                <source src="/bg.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-black/60" />
          </div>
          <div className="relative z-0 flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">{children}</main>
              <Footer />
          </div>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
