
"use client";

import { 
  GoogleAuthProvider, 
  signInWithPopup, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut as firebaseSignout,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useAuthContext as useAuthContextFromProvider } from '@/firebase/client-provider';

// This hook provides methods for authentication, consuming the main context.
export const useAuth = () => {
  const { auth, firestore } = useAuthContextFromProvider();
  const router = useRouter();

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push('/admin');
    } catch (error) {
      console.error("Error signing in with Google:", error);
      // Here you might want to use a toast notification for the user
    }
  };

  const signUpWithEmail = async (email: string, password: string, displayName: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      
      await updateProfile(firebaseUser, { displayName });

      const userRef = doc(firestore, 'users', firebaseUser.uid);
      // Use setDoc with merge:true to avoid overwriting the doc if it was created by onAuthStateChanged
      await setDoc(userRef, {
        email: firebaseUser.email,
        role: 'user',
        displayName: displayName,
        photoURL: firebaseUser.photoURL,
      }, { merge: true });

      router.push('/admin');
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };
  
  const signInWithEmail = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/admin');
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const signOut = async () => {
    await firebaseSignout(auth);
    router.push('/');
  };

  return {
    signInWithGoogle,
    signUpWithEmail,
    signInWithEmail,
    signOut,
  };
};

// Re-export for easier consumption if desired, or just use the hook directly
export const useAuthContext = useAuthContextFromProvider;

