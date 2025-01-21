"use client";
import React, { useState } from "react";
import Image from "next/image";
import { signInWithEmail, signUpWithEmail, signInWithGoogle } from "../../firebase/firebaseAuth";
import { FirebaseError } from "firebase/app";
import { db } from "../../firebase/firebaseConfig"; // Import your Firebase storage and database config
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

interface AuthPopupProps {
  onClose: () => void;
  isSignUp: boolean;
  toggleAuth: () => void;
}

const AuthPopup: React.FC<AuthPopupProps> = ({ onClose, isSignUp, toggleAuth }) => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profilePicture, setProfilePicture] = useState<string | null>('url'); // Store file name
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      let userId;
      let profilePictureUrl = "";  // Initialize as an empty string if no profile picture

      if (isSignUp) {
        if (password !== confirmPassword) {
          setError("Passwords don't match.");
          return;
        }

        // Create a new user with email and password
        const userCredential = await signUpWithEmail(email, password, firstName, lastName, profilePicture);
        userId = userCredential.user.uid;

        // Store the profile picture URL as text (file name or a default URL)
        profilePictureUrl = profilePicture || "defaultProfilePictureUrl"; // If no profile picture selected, use default URL or name
      } else {
        await signInWithEmail(email, password);
        userId = (await signInWithEmail(email, password)).user.uid;
      }

      // Save user information to Firestore (including profile picture name as text)
      const userDoc = {
        email,
        firstName,
        lastName,
        profilePicture: profilePictureUrl,  // Store file name or default URL here
      };
      await setDoc(doc(db, "users", userId), userDoc);

     
      router.push("/explore");
      onClose();
    } catch (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/weak-password":
            setError("Password should be at least 6 characters.");
            break;
          case "auth/email-already-in-use":
            setError("This email is already in use.");
            break;
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
            setError("An error occurred during authentication.");
            break;
        }
      } else {
        setError("An unknown error occurred.");
      }
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    try {
      await signInWithGoogle();
      
      router.push("/explore");
      onClose();
    } catch (error) {
      if (error instanceof FirebaseError) {
        setError("An error occurred during Google sign-in.");
      } else {
        setError("An unknown error occurred.");
      }
    }
  };

  // Handle file input change and store only the file name
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePicture(file.name);  // Only store the file name
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
        <h2 className="text-2xl font-bold text-black text-center mb-4">
          {isSignUp ? "Create an Account" : "Welcome Back"}
        </h2>

        {error && (
          <div className="text-red-500 text-center font-bold mb-4">
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
          {isSignUp && (
            <>
              <div className="mb-4">
                <label className="block mb-1 text-gray-700">First Name</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md p-2 w-full"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 text-gray-700">Last Name</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md p-2 w-full"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block mb-1 text-gray-700">Profile Picture</label>
                <input
                  type="file"
                  className="border border-gray-300 rounded-md p-2 w-full"
                  onChange={handleFileChange} // Call handleFileChange
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 text-gray-700" htmlFor="confirmPassword">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  className="border border-gray-300 rounded-md p-2 w-full"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </>
          )}
          <button
            type="submit"
            className="bg-black text-white rounded-md p-2 w-full hover:bg-primary transition duration-200"
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>

        <div className="text-center mt-4">
          <span className="text-gray-600">
            {isSignUp ? "Already have an account?" : "Don't have an account ? "}{" "}
          </span>
          <button onClick={toggleAuth} className="text-blue-600 hover:underline">
            {isSignUp ? "Sign In" : "Sign Up"}
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

export default AuthPopup;
