"use client";
import React, { useState } from "react";
import Image from "next/image";
import { signInWithEmail, signInWithGoogle ,handlePasswordReset} from "../../../firebase/firebaseAuth";
import { createUser } from '../../../services/userService'
import { FirebaseError } from "firebase/app";
import { useRouter } from "next/navigation";
import { setSessionCookie } from "../../../lib/setSessionCookie";
import eye from "../../../../public/eye.svg";
import eyeSlash from "../../../../public/eye-slash.svg";
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: '600',
});


interface SignInProps {
  onClose: () => void;
  toggleAuth: () => void;
}

const SignIn: React.FC<SignInProps> = ({ onClose, toggleAuth }) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const validateForm = () => {
    if (!email) {
      return "Email is required.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Please provide a valid email address.";
    }
    if (!password) {
      return "Password is required.";
    }
    if (password.length > 16) {
      return "Password must be at most 16 characters long.";
    }
    if (password.length < 6) {
      return "Password must be at least 6 characters long.";
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const userCredential = await signInWithEmail(email, password);
      console.log(userCredential);
      const token = await userCredential.user.getIdToken();
      const userId: string = userCredential.user.uid;
      const emaill: string | null = userCredential.user.email;
      const userName: string = email ? email.split('@')[0] : 'User';
      await setSessionCookie(token, setError);
      const userData: { uid: string; name: string; email: string; profilePicture: string } = {
        uid: userId,
        name: userName,
        email: emaill || '',
        profilePicture: '',
      }; 
      await createUser(userData);
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
            setError("Invalid information.");
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
      const userId: string = userCredential.user.uid;
      const email: string | null = userCredential.user.email;
      const userName: string = email ? email.split('@')[0] : 'User';

      const userData: { uid: string; name: string; email: string; profilePicture: string } = {
        uid: userId,
        name: userName,
        email: email || '',
        profilePicture: '',
      };
      await createUser(userData);

      await setSessionCookie(token, setError);

      router.push("/explore");
      onClose();
    } catch (error) {
      console.error("Error during Google sign-in:", error);
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
              className={`border border-gray-300 rounded-md outline-[1px] outline-gray-400 p-3 w-full pr-10 text-gray-800 ${poppins.className}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-gray-700" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className={`border border-gray-300 rounded-md outline-[1px] outline-gray-400 p-3 w-full pr-10 text-gray-800 ${poppins.className}`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-4  top-1/2 transform -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <Image src={eye} alt="eye" width={20} height={20} />
                ) : (
                  <Image src={eyeSlash} alt="eye-slash" width={20} height={20} />
                )}
              </button>
            </div>
            <p className="text-blue-500 mt-3 ml-1 cursor-pointer w-[fit-content] hover:underline"
              onClick={() => handlePasswordReset(email)}
            >Forgotten password?</p>
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