import { FirebaseError } from "firebase/app";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithPopup, 
  sendPasswordResetEmail ,
  signOut
} from "firebase/auth";
import { firebaseApp } from "./firebaseConfig"; 
import { redirect } from "next/navigation";
// Import the initialized Firebase app
import { toast } from 'react-hot-toast';

const auth = getAuth(firebaseApp);

const firebaseErrorMessages: Record<string, string> = {
  'auth/user-not-found': 'No user found with this email.',
  'auth/wrong-password': 'Incorrect password. Please try again.',
  'auth/email-already-in-use': 'This email is already in use.',
  'auth/invalid-email': 'Please provide a valid email address.',
  'auth/weak-password': 'Password should be at least 6 characters long.',
};

const getFriendlyErrorMessage = (code: string): string => 
  firebaseErrorMessages[code] || 'An unexpected error occurred.';

export const signUpWithEmail = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    toast.success('Sign up successful!');
    return userCredential;
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      const message = getFriendlyErrorMessage(error.code);
      toast.error(`Sign up failed: ${message}`);
      throw new FirebaseError(error.code, error.message);
    } else {
      toast.error('An unknown error occurred during sign up.');
      throw new Error("An unknown error occurred during sign up.");
    }
  }
};

export const signInWithEmail = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    toast.success('Sign in successful!');
    return userCredential;
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      const message = getFriendlyErrorMessage(error.code);
      // toast.error(`Sign in failed: ${message}`);
      throw new FirebaseError(error.code, error.message);
    } else {
      // toast.error('An unknown error occurred during sign in.');
      throw new Error("An unknown error occurred during sign in.");
    }
  }
};

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    toast.success(`Welcome, ${result.user.displayName || 'User'}!`);
    return result;
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      const message = getFriendlyErrorMessage(error.code);
      toast.error(`Google sign-in failed: ${message}`);
      throw new FirebaseError(error.code, error.message);
    } else {
      toast.error('An unknown error occurred during Google sign in.');
      throw new Error("An unknown error occurred during Google sign in.");
    }
  }
};

export const handlePasswordReset = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    toast.success('Verification email sent!');
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      const message = getFriendlyErrorMessage(error.code);
      toast.error(`Password reset failed: ${message}`);
    } else {
      toast.error('An unknown error occurred during password reset.');
    }
  }
};


export const logout = async () => {
  try {
    await signOut(auth);

    // Call the API to clear the session cookie
    const response = await fetch('/api/logout', {
      method: 'POST',
    });

    if (!response.ok) {
      console.error('Failed to clear session cookie');
    }

    return true;
  } catch (error) {
    console.error('Error during logout:', error);
    throw error;
  }
};