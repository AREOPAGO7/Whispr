"use client";
import { Poppins } from 'next/font/google';
const poppins = Poppins({
    subsets: ['latin'],
    weight: '600',
  });

import React, { useState } from "react";
import { FaSearch, FaBriefcase } from "react-icons/fa";

const Main = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  return (
    <div className="relative min-h-screen">
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat"
        }}
      >
        <div 
          className="absolute inset-0 z-0 h-full"
          style={{
            backgroundImage: "url('/bg.png')",
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat"
          }}
        ></div>



      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-black md:text-6xl">
            Find Your Dream Job Today!
          </h1>
          <p className="mb-12 text-xl font-bold text-black/70 md:text-xl ">
            Explore thousands of job listings tailored for you.
          </p>

          <form onSubmit={handleSearch} className="w-full max-w-2xl mx-auto mb-8">
            <div className="relative flex items-center">
              <input
                type="text"
                className="w-full px-6 py-4 text-lg bg-white border border-gray-200 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="What job are you looking for ?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-2 p-3 text-white bg-black rounded-full shadow-lg hover:bg-primary transition-colors duration-300"
              >
                <FaSearch className="w-5 h-5" />
              </button>
            </div>
          </form>

          <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-6 justify-center">
            <button className="flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-black rounded-full shadow-lg hover:bg-primary transition-colors duration-300">
              <FaSearch className="mr-2" />
              Search Jobs
            </button>
            <button className="flex items-center justify-center px-8 py-4 text-lg font-semibold text-gray-800 bg-white border border-gray-100 rounded-full shadow-md hover:bg-gray-100 transition-colors duration-300">
              <FaBriefcase className="mr-2" />
              Post a Job
            </button>
          </div>

          <div className="mt-12">
            <p className={`text-gray-600 ${poppins.className}`}>
              Finding job made eazy with Whisper , Join thousands of professionals who've found their dream careers. 
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;