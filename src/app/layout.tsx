import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "sonner";


const dmSans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ESystemLk - Premium Software Solutions",
  description: "We build stunning websites, powerful web applications, and comprehensive software systems for businesses of all sizes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={dmSans.className}>
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
        >
          <div className="min-h-screen bg-background flex flex-col">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
            <Toaster />
            <SonnerToaster />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
