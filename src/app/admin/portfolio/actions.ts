'use server';

import { db, storage } from '@/lib/firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy, serverTimestamp, Timestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';

export interface PortfolioItem {
    id: string;
    name: string;
    link: string;
    imageUrl: string;
    createdAt: Timestamp;
}

const portfolioSchema = z.object({
    name: z.string().min(1, "Project name is required."),
    link: z.string().url("Please enter a valid URL."),
});

// Get all portfolio items
export async function getPortfolioItems(): Promise<PortfolioItem[]> {
    const portfolioCollection = collection(db, 'portfolio');
    const q = query(portfolioCollection, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
        return [];
    }
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as PortfolioItem));
}

// Add a new portfolio item
export async function addPortfolioItem(formData: FormData) {
    const image = formData.get('image') as File;
    const name = formData.get('name') as string;
    const link = formData.get('link') as string;

    try {
        const validatedData = portfolioSchema.parse({ name, link });

        if (!image || image.size === 0) {
            throw new Error("Image is required.");
        }

        // Upload image to Firebase Storage
        const storageRef = ref(storage, `portfolio/${Date.now()}_${image.name}`);
        await uploadBytes(storageRef, image);
        const imageUrl = await getDownloadURL(storageRef);

        // Add item to Firestore
        await addDoc(collection(db, 'portfolio'), {
            name: validatedData.name,
            link: validatedData.link,
            imageUrl,
            createdAt: serverTimestamp(),
        });

        revalidatePath('/portfolio');
        revalidatePath('/');
        revalidatePath('/admin/portfolio');
        
        return { success: true, message: 'Portfolio item added successfully.' };
    } catch (error) {
        const message = error instanceof Error ? error.message : 'An unknown error occurred';
        return { success: false, message };
    }
}

// Delete a portfolio item
export async function deletePortfolioItem(id: string, imageUrl: string) {
    try {
        // Delete from Firestore
        await deleteDoc(doc(db, 'portfolio', id));

        // Delete from Storage
        const imageRef = ref(storage, imageUrl);
        await deleteObject(imageRef);

        revalidatePath('/portfolio');
        revalidatePath('/');
        revalidatePath('/admin/portfolio');

        return { success: true, message: 'Portfolio item deleted successfully.' };
    } catch (error) {
        const message = error instanceof Error ? error.message : 'An unknown error occurred';
        return { success: false, message: `Failed to delete item: ${message}` };
    }
}
