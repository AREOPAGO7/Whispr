"use client";
import React, { useState } from "react";
import SignIn from "./LoginForm";
import SignUp from "./SignUpForm";

interface AuthPopupProps {
  onClose: () => void;
}

const AuthPopup: React.FC<AuthPopupProps> = ({ onClose }) => {
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleAuth = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 b"
        onClick={onClose}
      />
      
      {/* Auth Container */}
      <div className="relative z-10 w-full max-w-md rounded-lg bg-white p-6 shadow-xl transition-all duration-300 ease-in-out">
        {isSignUp ? (
          <SignUp onClose={onClose} toggleAuth={toggleAuth} />
        ) : (
          <SignIn onClose={onClose} toggleAuth={toggleAuth} />
        )}
        <div className="mt-4 text-center text-sm">
          <span className="text-gray-500">
            {isSignUp ? "Already have an account? " : "Don't have an account? "}
          </span>
          <button
            onClick={toggleAuth}
            className="text-blue-500 hover:text-blue-800 font-bold hover:underline focus:outline-none"
          >
            {isSignUp ? "Sign in" : "Sign up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPopup;