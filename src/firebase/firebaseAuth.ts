// firebase/firebaseAuth.ts
import { FirebaseError } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { firebaseApp } from "./firebaseConfig"; // Import the initialized app


// Initialize Firebase Authentication
const auth = getAuth(firebaseApp); // Pass the initialized app to getAuth

// Function for signing up a user
export const signUpWithEmail = async (
  email: string,
  password: string
) => {
  try {
    // Create a user with email and password
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    return userCredential;
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      throw new FirebaseError(error.code, error.message);
    } else {
      throw new Error("An unknown error occurred during sign up.");
    }
  }
};

// Function for signing in a user
export const signInWithEmail = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential;
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      throw new FirebaseError(error.code, error.message);
    } else {
      throw new Error("An unknown error occurred during sign in.");
    }
  }
};

// Function for Google sign-in
export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    return result;
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      throw new FirebaseError(error.code, error.message);
    } else {
      throw new Error("An unknown error occurred during Google sign in.");
    }
  }
};
