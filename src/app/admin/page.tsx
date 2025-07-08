
"use client";

import { useAuth } from "@/hooks/use-auth";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Mail, Users, CreditCard, FileText, BarChart2, Briefcase } from "lucide-react";

export default function AdminPage() {
  const { user } = useAuth();

  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <div className="bg-black/30 backdrop-blur-lg border border-white/10 shadow-2xl rounded-3xl py-12 text-center mb-10">
        <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">Admin Dashboard</h1>
        {user && <p className="text-white/80 md:text-xl mt-4">Welcome, {user.displayName || user.email}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Link href="/admin/users" className="block hover:scale-105 transition-transform duration-300">
            <Card className="bg-black/30 backdrop-blur-lg border border-white/10 rounded-2xl shadow-lg h-full hover:border-primary transition-colors">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>User Management</CardTitle>
                 <Users className="w-6 h-6 text-primary" />
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Manage user roles and permissions.</p>
              </CardContent>
            </Card>
        </Link>
        <Link href="/admin/messages" className="block hover:scale-105 transition-transform duration-300">
            <Card className="bg-black/30 backdrop-blur-lg border border-white/10 rounded-2xl shadow-lg h-full hover:border-primary transition-colors">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>View Messages</CardTitle>
                <Mail className="w-6 h-6 text-primary" />
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Read and manage messages from the contact form.</p>
              </CardContent>
            </Card>
        </Link>
        <Link href="/admin/pricing" className="block hover:scale-105 transition-transform duration-300">
            <Card className="bg-black/30 backdrop-blur-lg border border-white/10 rounded-2xl shadow-lg h-full hover:border-primary transition-colors">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Pricing Management</CardTitle>
                <CreditCard className="w-6 h-6 text-primary" />
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Update and manage service pricing tiers and add-ons.</p>
              </CardContent>
            </Card>
        </Link>
        <Link href="/admin/pages" className="block hover:scale-105 transition-transform duration-300">
            <Card className="bg-black/30 backdrop-blur-lg border border-white/10 rounded-2xl shadow-lg h-full hover:border-primary transition-colors">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Page Management</CardTitle>
                <FileText className="w-6 h-6 text-primary" />
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Enable or disable pages and sections on your website.</p>
              </CardContent>
            </Card>
        </Link>
         <Link href="/admin/portfolio" className="block hover:scale-105 transition-transform duration-300">
            <Card className="bg-black/30 backdrop-blur-lg border border-white/10 rounded-2xl shadow-lg h-full hover:border-primary transition-colors">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Portfolio Management</CardTitle>
                <Briefcase className="w-6 h-6 text-primary" />
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Add, update, or remove portfolio projects.</p>
              </CardContent>
            </Card>
        </Link>
        <Card className="bg-black/30 backdrop-blur-lg border border-white/10 rounded-2xl shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>View Analytics</CardTitle>
            <BarChart2 className="w-6 h-6 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Check website traffic and user engagement.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
