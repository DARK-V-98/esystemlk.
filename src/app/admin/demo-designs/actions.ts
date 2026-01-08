
'use server';

import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy, serverTimestamp, Timestamp } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { getFirestoreAdmin, getStorageAdmin } from '@/firebase/admin';

export interface DemoDesign {
    id: string;
    name: string;
    demoUrl: string;
    imageUrl: string;
    category: string;
    technologies: string[];
    createdAt: string;
}

const designSchema = z.object({
    name: z.string().min(1, "Project name is required."),
    demoUrl: z.string().url("Please enter a valid demo URL."),
    category: z.string().min(1, "Category is required."),
    technologies: z.array(z.string()).min(1, "At least one technology is required."),
});

// Get all demo designs
export async function getDemoDesigns(): Promise<DemoDesign[]> {
    const firestore = getFirestoreAdmin();
    const designsCollection = collection(firestore, 'demoDesigns');
    const q = query(designsCollection, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
        return [];
    }
    return snapshot.docs.map(doc => {
        const data = doc.data();
        const createdAtTimestamp = data.createdAt as Timestamp;
        return {
            id: doc.id,
            name: data.name,
            demoUrl: data.demoUrl,
            imageUrl: data.imageUrl,
            category: data.category,
            technologies: data.technologies,
            createdAt: createdAtTimestamp.toDate().toISOString(),
        };
    });
}

// Add a new demo design
export async function addDemoDesign(formData: FormData) {
    const firestore = getFirestoreAdmin();
    const storage = getStorageAdmin();

    const image = formData.get('image') as File;
    const name = formData.get('name') as string;
    const demoUrl = formData.get('demoUrl') as string;
    const category = formData.get('category') as string;
    const technologies = JSON.parse(formData.get('technologies') as string) as string[];

    try {
        const validatedData = designSchema.parse({ name, demoUrl, category, technologies });

        if (!image || image.size === 0) {
            throw new Error("Image is required.");
        }

        // Upload image to Firebase Storage
        const storageRef = ref(storage, `demoDesigns/${Date.now()}_${image.name}`);
        await uploadBytes(storageRef, image);
        const imageUrl = await getDownloadURL(storageRef);

        // Add item to Firestore
        await addDoc(collection(firestore, 'demoDesigns'), {
            name: validatedData.name,
            demoUrl: validatedData.demoUrl,
            category: validatedData.category,
            technologies: validatedData.technologies,
            imageUrl,
            createdAt: serverTimestamp(),
        });

        revalidatePath('/admin/demo-designs');
        revalidatePath('/demo-designs');
        
        return { success: true, message: 'Demo design added successfully.' };
    } catch (error) {
        const message = error instanceof Error ? error.message : 'An unknown error occurred';
        return { success: false, message };
    }
}

// Delete a demo design
export async function deleteDemoDesign(id: string, imageUrl: string) {
    const firestore = getFirestoreAdmin();
    const storage = getStorageAdmin();
    try {
        await deleteDoc(doc(firestore, 'demoDesigns', id));

        const imageRef = ref(storage, imageUrl);
        await deleteObject(imageRef);

        revalidatePath('/admin/demo-designs');
        revalidatePath('/demo-designs');

        return { success: true, message: 'Demo design deleted successfully.' };
    } catch (error) {
        const message = error instanceof Error ? error.message : 'An unknown error occurred';
        return { success: false, message: `Failed to delete design: ${message}` };
    }
}
