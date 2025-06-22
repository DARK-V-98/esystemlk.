"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Menu, X, User, LogOut, LayoutDashboard } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/use-auth';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '../ui/skeleton';
import type { PageVisibility } from '@/app/admin/pages/actions';

const allNavLinks = [
  { href: '/', label: 'Home', key: 'showHome' },
  { href: '/services', label: 'Services', key: 'showServices' },
  { href: '/portfolio', label: 'Portfolio', key: 'showPortfolio' },
  { href: '/pricing', label: 'Pricing', key: 'showPricing' },
  { href: '/testimonials', label: 'Testimonials', key: 'showTestimonials' },
];

export function Header({ pageSettings }: { pageSettings: PageVisibility }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { user, loading, signOut } = useAuth();

  const navLinks = allNavLinks.filter(link => {
    if (link.key === 'showHome') return true;
    return pageSettings[link.key as keyof PageVisibility] !== false;
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const renderAuthContent = () => {
    if (loading) {
      return <Skeleton className="h-10 w-24 rounded-full" />;
    }
    if (user) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user.photoURL || (user.email ? `https://avatar.vercel.sh/${user.email}.png` : undefined)} alt={user.displayName || user.email || 'User'} />
                <AvatarFallback>{user.displayName?.charAt(0) || user.email?.charAt(0)}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user.displayName}</p>
                <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {['admin', 'developer'].includes(user.role) && (
              <DropdownMenuItem asChild>
                <Link href="/admin">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem onClick={signOut}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
    return (
      <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full">
        <Link href="/login">Login</Link>
      </Button>
    );
  };

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300",
      isScrolled ? "bg-black/50 backdrop-blur-lg border-b border-white/10" : "bg-transparent"
    )}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image src="/logo.png" alt="ESystemLk Logo" width={50} height={50} priority className="rounded-full" />
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === link.href ? "text-primary font-semibold" : "text-muted-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            {renderAuthContent()}
          </div>

          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>
      
      {isOpen && (
        <div className="md:hidden bg-black/80 backdrop-blur-lg border-t border-white/10">
          <nav className="flex flex-col items-center gap-4 p-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-lg font-medium transition-colors hover:text-primary w-full text-center py-2 rounded-md",
                  pathname === link.href ? "text-primary" : "text-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="w-full mt-4">
              {renderAuthContent()}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
