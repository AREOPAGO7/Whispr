'use client'
import React, { useState } from "react";
import { logout } from "@/firebase/firebaseAuth";
import { useRouter } from 'next/navigation'; // Changed from 'next/router'
import { FiCompass, FiBell, FiMessageSquare, FiPlusSquare, FiHeart, FiMessageCircle, FiShare2, FiBookmark } from "react-icons/fi";
import Image from "next/image";
import { FaSearch } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import PostCard from "@/app/components/explore/PostCard";
import { Poppins } from 'next/font/google';
import { unsetSessionCookies } from "@/lib/unsetSessionCookies";

const poppins = Poppins({
  subsets: ['latin'],
  weight: '600',
});

const ExploreComponent = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      unsetSessionCookies();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const posts = [
    {
      id: 1,
      user: {
        name: "John Doe",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
        username: "johndoe"
      },
      image: "https://images.unsplash.com/photo-1616763355603-9755a640a287",
      likes: 1234,
      comments: 89,
      caption: "Beautiful sunset at the beach! 🌅 #nature #photography",
      timestamp: "2h ago"
    },
    {
      id: 2,
      user: {
        name: "John Doe",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
        username: "johndoe"
      },
      image: "https://images.unsplash.com/photo-1616763355603-9755a640a287",
      likes: 1234,
      comments: 89,
      caption: "Beautiful sunset at the beach! 🌅 #nature #photography",
      timestamp: "2h ago"
    },
    , {
      id: 3,
      user: {
        name: "John Doe",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
        username: "johndoe"
      },
      image: "https://images.unsplash.com/photo-1616763355603-9755a640a287",
      likes: 1234,
      comments: 89,
      caption: "Beautiful sunset at the beach! 🌅 #nature #photography",
      timestamp: "2h ago"
    }, {
      id: 4,
      user: {
        name: "John Doe",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
        username: "johndoe"
      },
      image: "https://images.unsplash.com/photo-1616763355603-9755a640a287",
      likes: 1234,
      comments: 89,
      caption: "Beautiful sunset at the beach! 🌅 #nature #photography",
      timestamp: "2h ago"
    },
  ];

  const suggestedUsers = [
    {
      id: 1,
      name: "Sarah Wilson",
      username: "sarahw",
      avatar: "https://github.com/shadcn.png" // Updated avatar URL
    },
    {
      id: 2,
      name: "Mike Johnson",
      username: "mikej",
      avatar: "https://github.com/shadcn.png" // Updated avatar URL
    }
  ];

  const trendingTags = [
    "#photography",
    "#travel",
    "#food",
    "#fashion",
    "#art"
  ];

  return (
    <div className='min-h-screen text-white bg-black'>

      <div className="container mx-auto px-4 py-8 flex">
        {/* Left Sidebar */}

        <div className="hidden md:block w-64 fixed left-0 top-0 h-screen p-6 border-r border-white/10">
          <h1 className={`pt-6 text-[26px] ${poppins.className} fixed left-7 top-0`}>
            Whispr <span className="text-[10px] text-primary">1.0v</span>
          </h1>
          
          {/* Profile section */}
          <div className="mb-8 mt-20">
            <div className="flex items-center space-x-4 mb-6">
              <Image
                src="https://github.com/shadcn.png"
                alt="Profile"
                width={48}
                height={48}
                className="rounded-full object-cover"
                priority
              />
              <div>
                <h3 className="font-semibold">Chief keef</h3>
                <p className="text-sm text-gray-500">@areopago</p>
              </div>
            </div>
           
          </div>

          {/* Navigation section with flex and justify-between */}
          <div className="flex flex-col h-[calc(100vh-240px)] justify-between">
            {/* Main navigation */}
            <nav className="space-y-5 mt-6">
            <button className={`flex items-center space-x-4 w-full p-3 hover:bg-white/10 hover:text-primary transition-colors duration-300 hover:bg-gray-100 rounded-lg ${poppins.className}`}>
            <AiFillHome className="w-6 h-6" />
                <span>Home</span>
              </button>
              <button className={`flex items-center space-x-4 w-full p-3 hover:bg-white/10 hover:text-primary transition-colors duration-300 hover:bg-gray-100 rounded-lg ${poppins.className}`}>
                <FiCompass className="w-6 h-6" />
                <span>Explore</span>
              </button>
              <button className={`flex items-center space-x-4 w-full p-3 hover:bg-white/10 hover:text-primary transition-colors duration-300 hover:bg-gray-100 rounded-lg ${poppins.className}`}>
                <FiBell className="w-6 h-6" />
                <span>Notifications</span>
              </button>
              <button className={`flex items-center space-x-4 w-full p-3 hover:bg-white/10 hover:text-primary transition-colors duration-300 hover:bg-gray-100 rounded-lg ${poppins.className}`}>
                <FiMessageSquare className="w-6 h-6" />
                <span>Messages</span>
              </button>
              <button className={`flex items-center space-x-4 w-full p-3 hover:bg-white/10 hover:text-primary transition-colors duration-300 hover:bg-gray-100 rounded-lg ${poppins.className}`}>
                <FiPlusSquare className="w-6 h-6" />
                <span>Create </span>
              </button>
            </nav>

            {/* Logout button */}
            <button 
              onClick={handleLogout} 
              className={`group flex items-center space-x-4 w-full p-3 text-red-500 hover:bg-white/10 transition-all duration-300 rounded-lg ${poppins.className}`}
            >
              <BiLogOut className="w-6 h-6 transition-transform group-hover:rotate-12" />
              <span>Log out</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="md:ml-64 flex-grow md:mr-80">
          <div className="md:ml-64 flex-grow md:mr-80">
            <div className="fixed top-0 left-0 right-0 z-10 w-[100%] lg:w-[40%] mx-auto h-18 bg-black p-4 flex items-center justify-between  border-white/10">
              <div className="relative w-[100%] xl:ml-2 ">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <FaSearch className="w-5 h-5 text-gray-200" />
                </div>
                <input
                  className={`text-white  xl:w-[90%] w-[110%]  ${poppins.className} p-3 pl-12 bg-black border-[1px] border-white/20 rounded-lg focus:outline-none outline-none focus:border-primary/50 transition-all duration-300 ease-in-out focus:pl-14 focus:pr-6 `}
                  placeholder="Search"
                  type="text"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6 mt-20">
            {posts.map((post: any) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="  w-80 fixed hidden xl:block right-20 top-0 h-screen p-6 border-l border-white/10">
          <div className="mb-8">
            <h3 className="font-semibold mb-4 text-white/70">Suggested for you</h3>
            {suggestedUsers.map((user) => (
              <div key={user.id} className="flex  items-center justify-between mb-4">
                <div className="flex items-center space-x-3 ">
                  <Image
                    src={user.avatar}
                    alt={user.name}
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-white/85">{user.name}</p>
                    <p className="text-sm text-gray-500">@{user.username}</p>
                  </div>
                </div>
                <button className="text-blue-500 text-sm font-semibold">
                  Follow
                </button>
              </div>
            ))}
          </div>

          <div >
            <div className="flex items-center space-x-3 mb-4">
              <Image
                src='/fire.png'
                width={20}
                height={20}
                alt='Fire icon'
                style={{
                  backgroundColor: 'transparent',
                  objectFit: 'contain'
                }}
              />
              <h3 className="font-semibold text-white/70">Trending Hashtags</h3>
            </div>
            <div className="space-y-2">
              {trendingTags.map((tag) => (
                <div
                  key={tag}
                  className="text-sm text-gray-500 hover:text-blue-500 cursor-pointer"
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreComponent;