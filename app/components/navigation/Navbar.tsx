"use client";
import { Poppins } from 'next/font/google';
import { useState } from 'react';
import AuthPopup from '../Auth/AuthPopup';



const poppins = Poppins({
  subsets: ['latin'],
  weight: '600',
});

export default function Navbar() {
  const [isAuthOpen, setAuthOpen] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleAuth = () => {
    setIsSignUp(!isSignUp);
    
  };

  return (
    <nav className="p-6 flex justify-between h-[80px] items-center w-[92%] mx-auto ">
      <div className="flex items-center">
        <span className={`text-black text-2xl font-bold flex items-center ${poppins.className}`}>
          Whispr <span className='text-[10px] pt-2 pl-1 text-primary font-bold'> 1.0.v</span>
        </span>
      </div>
      <ul className="flex space-x-16  ml-16 ">
        <li>
          <a href="#" className={`text-gray-800 text-[18px] font-bold hover:text-primary transition-colors ${poppins.className}`}>
            Home
          </a>
        </li>
        <li>
          <a href="#" className={`text-gray-800 text-[18px] font-bold hover:text-primary transition-colors ${poppins.className}`}>
            About
          </a>
        </li>
        <li className="relative group">
          <a href="#" className={`text-gray-800 text-[18px] font-bold hover:text-primary transition-colors ${poppins.className}`}>
            Services
          </a>
        </li>
        
      </ul>
      <div className="flex items-center">
      <div className='mr-4  w-[40px] h-[40px] p-[6px] l '>
    
      </div>
        <button 
          className="bg-primary text-white shadow-sm font-bold px-4 py-2 rounded-md hover:bg-primary transition-colors mr-3 w-[100px]"
          onClick={() => setAuthOpen(true)}
        >
          <span className={poppins.className}>{isSignUp ? 'Sign Up' : 'Sign In'}</span>
        </button>
        
      
      </div>
      {isAuthOpen && (
        <AuthPopup 
          onClose={() => setAuthOpen(false)} 
          isSignUp={isSignUp} 
          toggleAuth={toggleAuth} 
        />
      )}
    </nav>
  );
} 