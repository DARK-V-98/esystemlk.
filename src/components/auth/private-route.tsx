"use client";

import { ReactNode } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';

interface PrivateRouteProps {
  children: ReactNode;
  allowedRoles: string[];
}

export function PrivateRoute({ children, allowedRoles }: PrivateRouteProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  if (loading) {
    return (
        <div className="container mx-auto py-10 px-4 md:px-6">
            <Skeleton className="h-24 w-full mb-10 rounded-3xl" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Skeleton className="h-48 w-full rounded-2xl" />
                <Skeleton className="h-48 w-full rounded-2xl" />
                <Skeleton className="h-48 w-full rounded-2xl" />
            </div>
        </div>
    );
  }

  if (!user) {
    router.replace('/login');
    return null;
  }

  if (!allowedRoles.includes(user.role)) {
    router.replace('/');
    // You can optionally show an "Access Denied" message before redirecting
    return (
        <div className="container mx-auto flex items-center justify-center min-h-[calc(100vh-10rem)]">
            <div className="text-center">
                <h1 className="text-2xl font-bold">Access Denied</h1>
                <p className="text-muted-foreground">You do not have permission to view this page.</p>
            </div>
        </div>
    );
  }

  return <>{children}</>;
}
