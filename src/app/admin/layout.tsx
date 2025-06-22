"use client";

import { ReactNode } from 'react';
import { PrivateRoute } from '@/components/auth/private-route';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <PrivateRoute allowedRoles={['admin', 'developer']}>
      {children}
    </PrivateRoute>
  );
}
