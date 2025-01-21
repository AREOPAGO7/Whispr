// firebase/firebaseAuth.ts
import { FirebaseError } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { db } from "./firebaseConfig"; // Assuming the firebaseConfig is set up correctly
import { doc, setDoc } from "firebase/firestore";

// Initialize Firebase Authentication
const auth = getAuth();

// Function for signing up a user
export const signUpWithEmail = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  profilePicture: string | null
) => {
  try {
    // Create a user with email and password
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Store the user information in Firestore with profile picture filename
    const userDoc = {
      email,
      firstName,
      lastName,
      profilePicture: profilePicture || "defaultProfilePicture.jpg", // If no picture is provided, use a default filename
    };

    await setDoc(doc(db, "users", user.uid), userDoc);

    return userCredential;
  } catch (error) {
    throw new FirebaseError(error.code, error.message);
  }
};

// Function for signing in a user
export const signInWithEmail = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential;
  } catch (error) {
    throw new FirebaseError(error.code, error.message);
  }
};

// Function for Google sign-in
export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    return result;
  } catch (error) {
    throw new FirebaseError(error.code, error.message);
  }
};
