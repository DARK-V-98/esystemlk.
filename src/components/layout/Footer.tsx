import Link from 'next/link';
import Image from 'next/image';
import { Facebook, MessageCircle } from 'lucide-react';
import type { PageVisibility } from '@/app/admin/pages/actions';

export function Footer({ pageSettings }: { pageSettings: PageVisibility }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black/30 backdrop-blur-lg border-t border-white/10">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-start">
            <Link href="/" className="mb-4">
              <Image src="/logo.png" alt="ESystemLk Logo" width={50} height={50} className="rounded-full" />
            </Link>
            <p className="text-muted-foreground text-sm">
              Your trusted partner for innovative technology solutions.
            </p>
          </div>
          <div>
            <h4 className="font-headline font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {pageSettings?.showServices && <li><Link href="/services" className="text-sm text-muted-foreground hover:text-primary">Services</Link></li>}
              <li><Link href="/portfolio" className="text-sm text-muted-foreground hover:text-primary">Portfolio</Link></li>
              {pageSettings?.showPricing && <li><Link href="/pricing" className="text-sm text-muted-foreground hover:text-primary">Pricing</Link></li>}
              <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-headline font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link href="/privacy-policy" className="text-sm text-muted-foreground hover:text-primary">Policies</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-headline font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/esystemlk" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="https://wa.me/94765711396" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                <MessageCircle className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 mt-8 pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} ESystemLk. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
