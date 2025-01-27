"use client";
import React, { useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

interface AuthPopupProps {
  onClose: () => void;
}

const AuthPopup: React.FC<AuthPopupProps> = ({ onClose }) => {
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleAuth = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <>
      {isSignUp ? (
        <SignUp onClose={onClose} toggleAuth={toggleAuth} />
      ) : (
        <SignIn onClose={onClose} toggleAuth={toggleAuth} />
      )}
    </>
  );
};

export default AuthPopup;