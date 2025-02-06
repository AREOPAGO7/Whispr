'use client';
import { useAuth } from '../hooks/useAuth';
import { FiCompass, FiBell, FiMessageSquare, FiPlusSquare, FiHeart, FiMessageCircle, FiShare2, FiBookmark } from "react-icons/fi";
import { FaSearch } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { CgDetailsMore } from "react-icons/cg";
import { IoMdSettings } from "react-icons/io";
import { BiLogOut } from "react-icons/bi";
import PostCard from "@/app/components/explore/PostCard";
import { Poppins } from 'next/font/google';
import { useState,useRef,useEffect } from 'react';
const poppins = Poppins({
  subsets: ['latin'],
  weight: '600',
});


export default function Dashboard() {
  const { user, loading, logout } = useAuth();
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    function handleClickOutside(event: any) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowMoreOptions(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null;
  }

  const posts = [
    {
      id: 1,
      user: {
        name: "Kanye West",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
        username: "kanye1223"
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
    // <div className="p-8">
     
    //   <p>Welcome, {user.email}</p>
    //   <button
    //     onClick={logout}
    //     className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
    //   >
    //     Logout
    //   </button>
      
    // </div>

    <div className='min-h-screen text-white bg-[#1e1e24]'> {/* Added bg-[#2E282A] */}

    <div className="container mx-auto px-4 py-8 flex">
      {/* Left Sidebar */}

      {/* {loading ? <LeftSidebarSkeleton /> : ( */}
        <>
          <div className="hidden md:block lg:w-80 w-64 fixed left-0 top-0 h-screen p-6 border-r border-white/10">
            {/* Profile section */}
            <div className="m mt-16 hover:bg-white/10 p-2 transition-colors duration-300 hover:bg-gray-100 rounded-lg">
              <div className="flex items-center space-x-4 ">
                <img
                  src="https://github.com/shadcn.png"
                  alt="Profile"
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold">{user.email ? user.email.split('@')[0] : 'Guest'}</h3>
                  <p className="text-sm text-gray-500">@areopago</p>
                </div>
              </div>
            </div>

            {/* Navigation section with flex and justify-between */}
            <div className="flex flex-col h-[calc(100vh-180px)] justify-between">
              {/* Main navigation */}
              <nav className="space-y-4 mt-6 text-[14px]">
                <button className={`flex items-center space-x-4 w-full p-3 hover:bg-white/10  transition-colors duration-300 hover:bg-gray-100 rounded-lg ${poppins.className}`}>
                  <AiFillHome className="w-5 h-5" />
                  <span>Home</span>
                </button>
                <button className={`flex items-center space-x-4 w-full p-3 hover:bg-white/10  transition-colors duration-300 hover:bg-gray-100 rounded-lg ${poppins.className}`}>
                  <FiCompass className="w-5 h-5" />
                  <span>Explore</span>
                </button>
                <button className={`flex items-center space-x-4 w-full p-3 hover:bg-white/10  transition-colors duration-300 hover:bg-gray-100 rounded-lg ${poppins.className}`}>
                  <FiBell className="w-5 h-5" />
                  <span>Notifications</span>
                </button>
                <button className={`flex items-center space-x-4 w-full p-3 hover:bg-white/10 transition-colors duration-300 hover:bg-gray-100 rounded-lg ${poppins.className}`}>
                  <FiMessageSquare className="w-5 h-5" />
                  <span>Messages</span>
                </button>
                <button className={`flex items-center space-x-4 w-full p-3 hover:bg-white/10  transition-colors duration-300 hover:bg-gray-100 rounded-lg ${poppins.className}`}>
                  <FiPlusSquare className="w-5 h-5" />
                  <span>Create </span>
                </button>
              </nav>
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowMoreOptions(!showMoreOptions)}
                  className={`group flex items-center space-x-4 w-full p-3 hover:bg-white/10 transition-all duration-300 rounded-lg ${poppins.className}`}
                >
                  <CgDetailsMore className="w-5 h-5" />
                  <span>More </span>
                </button>

                {/* Dropdown Menu */}
                {showMoreOptions && (
                  <div className="absolute bottom-full left-0 w-full mb-2 bg-[#1e1e24] border border-white/5 rounded-lg shadow-lg overflow-hidden">

                    <button
                      onClick={()=>{}}
                      className={`flex items-center space-x-4 w-full p-3  hover:bg-white/10 transition-all duration-300 ${poppins.className}`}
                    >
                      <IoMdSettings className="w-5 h-5 transition-transform group-hover:rotate-12" />
                      <span>Settings</span>
                    </button>
                    <button
                      onClick={()=>{}}
                      className={`flex items-center space-x-4 w-full p-3  hover:bg-white/10 transition-all duration-300 ${poppins.className}`}
                    >
                      <FiBookmark className="w-5 h-5 transition-transform group-hover:rotate-12" />
                      <span>Saved </span>
                    </button>
                    <button
                      onClick={logout}
                      className={`flex items-center space-x-4 w-full p-3 text-red-500 hover:bg-white/10 transition-all duration-300 ${poppins.className}`}
                    >
                      <BiLogOut className="w-5 h-5 transition-transform group-hover:rotate-12" />
                      <span>Log out</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="fixed top-0 left-0 right-0 z-10 bg-[#1e1e24]/80 backdrop-blur-sm border-b border-white/10">
            <div className=" mx-auto px-4 h-16 flex items-center justify-end">
              <h1 className={`pt-4 text-[26px] hidden lg:block ${poppins.className} fixed left-8 top-0`}>
                Whispr <span className="text-[10px] text-primary">1.0v</span>
              </h1>
              <div className="relative  lg:-mr-2 lg:w-[19%] w-[100%] ">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <FaSearch className="w-4 h-4 text-gray-400" />
                </div>
                <input
                  className={`w-full text-white ${poppins.className} p-2.5 pl-10 focus:pl-11 bg-white/5 border border-white/10 rounded-3xl
                         focus:outline-none outline-none focus:border-white/20 transition-all duration-300 ease-in-out placeholder-gray-500 text-sm`}
                  placeholder="Search posts, people, or tags"
                  type="text"
                />
              </div>
            </div>
          </div>

          <div className="mx-auto md:ml-64 sm:ml-10 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6 mt-20">
            {posts.map((post: any) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </>
      {/* )} */}
      {/* Right Sidebar */}
      <div className="  xl:w-72  fixed hidden 2xl:block right-20 top-16 h-screen p-6 border-l border-white/10">
        <div className="mb-8 mt-2">
          <h3 className="font-semibold mb-4 text-white/70">Suggested for you</h3>
          {suggestedUsers.map((user) => (
            <div key={user.id} className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3 ">
                <img
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

        <div>
          <div className="flex items-center space-x-3 mb-4">
            <img
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
}