'use server';

import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { z } from 'zod';

const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  subject: z.string().min(5),
  message: z.string().min(10).max(500),
});

export async function saveContactMessage(formData: z.infer<typeof formSchema>) {
    try {
        const validatedData = formSchema.parse(formData);
        await addDoc(collection(db, 'messages'), {
            ...validatedData,
            createdAt: serverTimestamp(),
            read: false,
        });
        return { success: true, message: 'Message sent successfully! We will get back to you soon.' };
    } catch (error) {
        console.error("Error sending message: ", error);
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        return { success: false, message: `Failed to send message: ${errorMessage}` };
    }
}
