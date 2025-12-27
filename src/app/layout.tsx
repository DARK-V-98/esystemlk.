import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/hooks/use-auth";
import LoadingScreen from "@/components/LoadingScreen";
import RootLayoutClient from "./layout-client";


const dm_sans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "ESystemLk",
  description: "Premium Software Solutions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={dm_sans.className}>
        <AuthProvider>
          <RootLayoutClient>
            {children}
          </RootLayoutClient>
        </AuthProvider>
      </body>
    </html>
  );
}
