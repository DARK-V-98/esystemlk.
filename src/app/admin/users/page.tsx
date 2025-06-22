
import UsersManagementClient from './users-management-client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function AdminUsersPage() {
  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <div className="bg-black/30 backdrop-blur-lg border border-white/10 shadow-2xl rounded-3xl py-8 text-center mb-10">
        <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">User Management</h1>
        <p className="text-white/80 md:text-xl mt-4 max-w-3xl mx-auto">
          View, edit roles, and manage users on your platform.
        </p>
      </div>

       <div className="mb-8">
        <Button asChild variant="outline">
            <Link href="/admin">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
            </Link>
        </Button>
      </div>

      <UsersManagementClient />
    </div>
  );
}
