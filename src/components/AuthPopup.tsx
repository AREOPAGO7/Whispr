"use client";
import React, { useState } from 'react';

interface AuthPopupProps {
  onClose: () => void; // Function to close the popup
  isSignUp: boolean; // Prop to determine if it's Sign Up
  toggleAuth: () => void; // Function to toggle between Sign In and Sign Up
}

const AuthPopup: React.FC<AuthPopupProps> = ({ onClose, isSignUp, toggleAuth }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profilePicName, setProfilePicName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle authentication logic here
    console.log('Email:', email, 'Password:', password);
  };

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" 
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg shadow-lg p-6 w-[600px] mx-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-black text-center mb-4">{isSignUp ? 'Create an Account' : 'Welcome Back'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1 text-gray-700" htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              className="border border-gray-300 rounded-md p-2 w-full" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-gray-700" htmlFor="password">Password</label>
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
            <div className="mb-4">
              <label className="block mb-1 text-gray-700" htmlFor="confirmPassword">Confirm Password</label>
              <input 
                type="password" 
                id="confirmPassword" 
                className="border border-gray-300 rounded-md p-2 w-full" 
                required 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          )}
          {isSignUp && (
            <div className="flex mb-4">
              <div className="w-1/2 pr-2">
                <label className="block mb-1 text-gray-700" htmlFor="username">Username</label>
                <input 
                  type="text" 
                  id="username" 
                  className="border border-gray-300 rounded-md p-2 w-full" 
                  required 
                />
              </div>
              <div className="w-1/2 pl-2">
                <label className="block mb-1 text-gray-700" htmlFor="age">Age</label>
                <input 
                  type="number" 
                  id="age" 
                  className="border border-gray-300 rounded-md p-2 w-full" 
                  required 
                />
              </div>
            </div>
          )}
          {isSignUp && (
            <div className="flex mb-4">
              <div className="w-1/2 pr-2">
                <label className="block mb-1 text-gray-700" htmlFor="profilePic">Profile Picture</label>
                <div className="flex items-center border border-gray-300 rounded-md p-2 w-full">
                  <input 
                    type="file" 
                    id="profilePic" 
                    className="hidden" 
                    required 
                    onChange={(e) => {
                      const files = e.target.files;
                      if (files && files.length > 0) {
                        const fileName = files[0].name;
                        setProfilePicName(fileName); // Assuming you have a state to manage the file name
                      }
                    }}
                  />
                  <label 
                    htmlFor="profilePic" 
                    className="cursor-pointer flex items-center justify-between w-full text-gray-700"
                  >
                    <span>{profilePicName || 'Upload Picture'}</span>
                    <span className="bg-black text-white rounded-md px-2 py-1">Browse</span>
                  </label>
                </div>
              </div>
              <div className="w-1/2 pl-2">
                <label className="block mb-1 text-gray-700" htmlFor="phone">Phone Number</label>
                <input 
                  type="tel" 
                  id="phone" 
                  className="border border-gray-300 rounded-md p-2 w-full" 
                  required 
                />
              </div>
            </div>
          )}
          <button type="submit" className="bg-black text-white rounded-md p-2 w-full hover:bg-primary transition duration-200">
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
        </form>
        <div className="text-center mt-4">
          <span className="text-gray-600">Don't have an account? </span>
          <button onClick={toggleAuth} className="text-blue-600 hover:underline">
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </div>
        <div className="text-center mt-4">
          <span className="text-gray-600">OR</span>
        </div>
        <button className="google-button border border-gray-300 rounded-md p-2 w-full mt-2 text-gray-700 flex items-center justify-center">
            <img src='./google.png' width='20' alt="Google logo" className="mr-6" />
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default AuthPopup; 