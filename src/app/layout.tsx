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

const siteUrl = 'https://www.yourdomain.com'; // IMPORTANT: Replace with your actual domain

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'ESystemLk | Full-Stack Web Development & POS Solutions in Sri Lanka',
    template: '%s | ESystemLk',
  },
  description: 'ESystemLk is a leading website developer in Sri Lanka, offering full-stack development, custom web applications, e-commerce stores, and advanced POS systems. Your trusted tech partner for digital excellence.',
  keywords: [
    'ESystemLk',
    'esystem',
    'website developer Sri Lanka',
    'full-stack developer',
    'web design Sri Lanka',
    'e-commerce solutions',
    'POS system Sri Lanka',
    'Next.js developer',
    'React developer',
    'custom software',
    'software company in Sri Lanka',
    'web development agency',
  ],
  authors: [{ name: 'ESystemLk', url: siteUrl }],
  creator: 'ESystemLk',
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'ESystemLk | Full-Stack Web Development & POS Solutions',
    description: 'ESystemLk is a leading website developer in Sri Lanka, offering full-stack development, custom web applications, e-commerce stores, and advanced POS systems.',
    url: siteUrl,
    siteName: 'ESystemLk',
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'ESystemLk Logo and brand identity',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ESystemLk | Full-Stack Web Development & POS Solutions',
    description: 'ESystemLk is a leading website developer in Sri Lanka, offering full-stack development, custom web applications, e-commerce stores, and advanced POS systems.',
    images: [`${siteUrl}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'ESystemLk',
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+94-76-571-1396',
    contactType: 'Customer Service',
    areaServed: 'LK',
    availableLanguage: ['en', 'si', 'ta'],
  },
  sameAs: ['https://www.facebook.com/esystemlk'],
  description: metadata.description,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pageSettings = await getPageSettings();

  return (
    <html lang="en" className={cn("scroll-smooth", poppins.variable, dmSans.variable)}>
      <body className="font-body antialiased text-foreground bg-black">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <AuthProvider>
           <video autoPlay loop muted playsInline className="fixed top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -z-10 -translate-x-1/2 -translate-y-1/2 object-cover">
            <source src="/bg.mp4" type="video/mp4" />
          </video>
          <div className="relative z-10 flex flex-col min-h-screen bg-black/50">
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
