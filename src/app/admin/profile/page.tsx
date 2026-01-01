
import ProfileClient from './profile-client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getFirestoreAdmin } from '@/firebase/admin';
import { doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase-admin/auth';
import { cookies } from 'next/headers';
import { adminApp } from '@/firebase/admin-app';
import type { ManagedUser } from '../users/actions';

async function getCurrentUser(): Promise<ManagedUser | null> {
    const sessionCookie = cookies().get('session')?.value || '';
    if (!sessionCookie) return null;

    try {
        const decodedClaims = await getAuth(adminApp).verifySessionCookie(sessionCookie, true);
        const firestore = getFirestoreAdmin();
        const userRef = doc(firestore, 'users', decodedClaims.uid);
        const userSnap = await getDoc(userRef);
        
        if (!userSnap.exists()) return null;
        
        return {
            uid: userSnap.id,
            ...userSnap.data()
        } as ManagedUser;

    } catch(e) {
        console.error("Error fetching current user:", e);
        return null;
    }
}

export default async function AdminProfilePage() {
    const user = await getCurrentUser();

    return (
        <div className="container mx-auto py-10 px-4 md:px-6">
        <div className="bg-card border border-border rounded-3xl py-8 text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Edit Your Profile</h1>
            <p className="text-muted-foreground md:text-xl mt-4 max-w-3xl mx-auto">
                Update your public information, social links, and biography.
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

        <ProfileClient user={user} />
        </div>
    );
}
