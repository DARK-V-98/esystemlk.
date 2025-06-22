import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from "@/components/ui/toaster";
import { Poppins, DM_Sans } from 'next/font/google'
import { cn } from '@/lib/utils';
import { AuthProvider } from '@/hooks/use-auth';
import { getPageSettings, PageVisibility } from '@/app/admin/pages/actions';

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pageSettings = await getPageSettings();

  return (
    <html lang="en" className={cn("scroll-smooth", poppins.variable, dmSans.variable)}>
      <body className="font-body antialiased bg-background text-foreground">
        <AuthProvider>
          <div className="relative z-0 flex flex-col min-h-screen">
              <Header pageSettings={pageSettings} />
              <main className="flex-grow">{children}</main>
              <Footer pageSettings={pageSettings} />
          </div>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
