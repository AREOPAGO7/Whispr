"use client";
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import AuthPopup from "./components/AuthPopup";

export default function Home() {
  const [isAuthPopupOpen, setIsAuthPopupOpen] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleAuth = () => setIsSignUp(!isSignUp);

  return (
    <>
      <Navbar />
      <Main />
      <button
        onClick={() => setIsAuthPopupOpen(true)}
        className="bg-black text-white rounded-md p-2"
      >
        Login/Sign Up
      </button>
      {isAuthPopupOpen && (
        <AuthPopup
          onClose={() => setIsAuthPopupOpen(false)}
          isSignUp={isSignUp}
          toggleAuth={toggleAuth}
        />
      )}
    </>
  );
}
