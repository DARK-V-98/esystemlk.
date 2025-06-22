"use client";

import { useAuth } from "@/hooks/use-auth";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function AdminPage() {
  const { user } = useAuth();

  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <div className="bg-black/30 backdrop-blur-lg border border-white/10 shadow-2xl rounded-3xl py-12 text-center mb-10">
        <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">Admin Dashboard</h1>
        {user && <p className="text-white/80 md:text-xl mt-4">Welcome, {user.displayName || user.email}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card className="bg-black/30 backdrop-blur-lg border border-white/10 rounded-2xl shadow-lg">
          <CardHeader>
            <CardTitle>User Management</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Manage user roles and permissions.</p>
          </CardContent>
        </Card>
        <Card className="bg-black/30 backdrop-blur-lg border border-white/10 rounded-2xl shadow-lg">
          <CardHeader>
            <CardTitle>Content Management</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Update services, portfolio, and blog.</p>
          </CardContent>
        </Card>
         <Link href="/admin/pricing" className="block hover:scale-105 transition-transform duration-300">
            <Card className="bg-black/30 backdrop-blur-lg border border-white/10 rounded-2xl shadow-lg h-full hover:border-primary transition-colors">
              <CardHeader>
                <CardTitle>Pricing Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Update and manage service pricing tiers and add-ons.</p>
              </CardContent>
            </Card>
        </Link>
        <Card className="bg-black/30 backdrop-blur-lg border border-white/10 rounded-2xl shadow-lg">
          <CardHeader>
            <CardTitle>View Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Check website traffic and user engagement.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
