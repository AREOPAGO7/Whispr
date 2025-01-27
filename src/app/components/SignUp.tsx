"use client";
import React, { useState } from "react";
import Image from "next/image";
import { signUpWithEmail, signInWithGoogle } from "../../firebase/firebaseAuth";
import { FirebaseError } from "firebase/app";
import { useRouter } from "next/navigation";
import { setSessionCookie } from "../../lib/setSessionCookie";
import eye from "../../../public/eye.svg";
import eyeSlash from "../../../public/eye-slash.svg";
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: '600',
});

interface SignUpProps {
  onClose: () => void;
  toggleAuth: () => void;
}

const SignUp: React.FC<SignUpProps> = ({ onClose, toggleAuth }) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const userCredential = await signUpWithEmail(email, password);
      const token = await userCredential.user.getIdToken();
      await setSessionCookie(token, setError);

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
      const userCredential = await signInWithGoogle();
      const token = await userCredential.user.getIdToken();
      await setSessionCookie(token, setError);

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

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-6 w-[600px] h-fit mx-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-black text-center mb-4">Create an Account</h2>

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
              className={`border border-gray-300 rounded-md outline-[1px] outline-gray-400 p-3 w-full pr-10 text-gray-800 ${poppins.className}`}
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4 relative">
            <label className="block mb-1 text-gray-700" htmlFor="password">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className={`border border-gray-300 rounded-md outline-[1px] outline-gray-400 p-3 w-full pr-10 text-gray-800 ${poppins.className}`}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className={`absolute right-10 top-[54px] mr-3 transform -translate-y-1/2 bg-primary rounded-md px-3 py-1 text-[13px] ${poppins.className}`}
              onClick={() => {
                setShowPassword(true);
                const randomPassword = Math.random().toString(36).slice(-8);
                setPassword(randomPassword);
              }}
            >
              Generate
            </button>
            <button
              type="button"
              className="absolute right-2 top-[54px] mr-2  transform -translate-y-1/2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <Image src={eye} alt="eye" width={20} height={20} />
              ) : (
                <Image src={eyeSlash} alt="eye-slash" width={20} height={20} />
              )}
            </button>
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-gray-700">First Name</label>
            <input
              type="text"
              className={`border border-gray-300 rounded-md outline-[1px] outline-gray-400 p-3 w-full pr-10 text-gray-800 ${poppins.className}`}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-gray-700">Last Name</label>
            <input
              type="text"
              className={`border border-gray-300 rounded-md outline-[1px] outline-gray-400 p-3 w-full pr-10 text-gray-800 ${poppins.className}`}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-black text-white rounded-md p-2 w-full hover:bg-primary transition duration-200"
          >
            Sign Up
          </button>
        </form>

        <div className="text-center mt-4">
          <span className="text-gray-600">Already have an account? </span>
          <button onClick={toggleAuth} className="text-blue-600 hover:underline">
            Sign In
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

export default SignUp;