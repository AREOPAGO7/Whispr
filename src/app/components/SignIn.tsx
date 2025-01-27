"use client";
import React, { useState } from "react";
import Image from "next/image";
import { signInWithEmail, signInWithGoogle } from "../../firebase/firebaseAuth";
import { createUser } from '../../services/userService'
import { getUserById } from '../../services/userService'
import { FirebaseError } from "firebase/app";
import { useRouter } from "next/navigation";
import { setSessionCookie } from "../../lib/setSessionCookie";

interface SignInProps {
  onClose: () => void;
  toggleAuth: () => void;
}

const SignIn: React.FC<SignInProps> = ({ onClose, toggleAuth }) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const userCredential = await signInWithEmail(email, password);
      const token = await userCredential.user.getIdToken();
      await setSessionCookie(token, setError);

      router.push("/explore");
      onClose();
    } catch (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/invalid-email":
            setError("Please provide a valid email address.");
            break;
          case "auth/wrong-password":
            setError("Incorrect password. Please try again.");
            break;
          case "auth/user-not-found":
            setError("No user found with this email.");
            break;
          default:
            setError("Invalid  informations.");
            break;
        }
      } else {
        setError("An unknown error occurred.");
      }
    }
  };

  const handleGoogleSignIn = async (): Promise<void> => {
    setError(null);
    try {
      const userCredential = await signInWithGoogle();
      const token = await userCredential.user.getIdToken();
      const userId: string = userCredential.user.uid; // Accessing the user ID created by Google Auth
      const email: string | null = userCredential.user.email; // Get the email from the user credential
      const userName: string = email ? email.split('@')[0] : 'User'; // Create a username from the email or default to 'User'
      
      // Add logging for debugging
      console.log("Fetching user with ID:", userId);
      
    //   const isUser = await getUserById(userId);
    //   if (isUser === null) {
        // Handle case where user is not found
        const userData: { uid: string; name: string; email: string; profilePicture: string } = {
          uid: userId,
          name: userName,
          email: email || '', // Ensure email is a string
          profilePicture: '',
        };
        await createUser(userData); // Create the user in MongoDB
    //   } else {
    //     console.log(`User with ID ${userId} found in MongoDB.`);
    //   }
      
      await setSessionCookie(token, setError);

      console.log("User ID:", userId); // Optional: Log the user ID for debugging

      router.push("/explore");
      onClose();
    } catch (error) {
      console.error("Error during Google sign-in:", error); // Log the error details
      if (error instanceof FirebaseError) {
        setError("An error occurred during Google sign-in.");
      } else {
        setError("An unknown error occurred.");
      }
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-6 w-[600px] h-fit mx-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-black text-center mb-4">Welcome Back</h2>

        {error && (
          <div className="text-primary text-center font-semibold border-[1px] bg-primary/10 border-primary/30 rounded-md p-2 mb-4">
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1 text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="border text-black border-gray-300 rounded-md p-2 w-full"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-gray-700" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="border border-gray-300 rounded-md p-2 w-full"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-black text-white rounded-md p-2 w-full hover:bg-primary transition duration-200"
          >
            Sign In
          </button>
        </form>

        <div className="text-center mt-4">
          <span className="text-gray-600">Don't have an account? </span>
          <button onClick={toggleAuth} className="text-blue-600 hover:underline">
            Sign Up
          </button>
        </div>

        <div className="text-center mt-4">
          <span className="text-gray-600">OR</span>
        </div>

        <button
          onClick={handleGoogleSignIn}
          className="google-button border border-gray-300 rounded-md p-2 w-full mt-2 text-gray-700 flex items-center justify-center"
        >
          <Image src="/google.png" width="20" height="20" alt="Google logo" className="mr-6" />
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default SignIn;