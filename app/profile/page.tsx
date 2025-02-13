'use client'
import { useState, useEffect } from 'react';
import Sidebar from '../components/navigation/Sidebar';
import { useUser } from '../contexts/UserContext';
import { useAuth } from '../hooks/useAuth';
import Searchbar from '../components/navigation/Searchbar';
import { FaFacebook } from "react-icons/fa";
import { HiMiniCalendarDateRange } from 'react-icons/hi2';
import { MdAlternateEmail } from 'react-icons/md';
import { Poppins } from 'next/font/google';


const poppins = Poppins({
    subsets: ['latin'],
    weight: '600',
});
// Define TypeScript interface for profile data
interface ProfileData {
    id: string;
    fullName: string;
    email: string;
    avatar: string;
    bio: string;
    location: string;
    joinedDate: string;
    socialLinks: {
        twitter?: string;
        linkedin?: string;
        github?: string;
    };
}

// Mock data
const mockProfileData: ProfileData = {
    id: "1",
    fullName: "John Doe",
    email: "john.doe@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    bio: "Frontend developer passionate about creating beautiful user experiences",
    location: "New York, USA",
    joinedDate: "January 2024",
    socialLinks: {
        twitter: "https://twitter.com/johndoe",
        linkedin: "https://linkedin.com/in/johndoe",
        github: "https://github.com/johndoe"
    }
};

const Profile = () => {
    const [showMoreOptions, setShowMoreOptions] = useState(false);
    const { loading, user } = useUser();
    const { logout } = useAuth();
    // const [loadingg , setLoadingg] = useState(loading);

    if (loading) {
        return <h1
            className={`flex justify-center items-center h-screen w-full text-[26px] lg:text-[40px] ${poppins.className} bg-[#1c1c1c] text-white`}
        >
            Whispr <span className="ml-2 text-[14px] text-primary">1.0v</span>
        </h1>
    }


    return (
        <div className="min-h-screen bg-[#1c1c1c]">

            <Searchbar />
            <Sidebar
                user={{
                    username: user?.username || '',
                    bio: user?.bio || '',
                    profileImage: user?.profilePictureUrl || ''
                }}
                logout={logout}
                showMoreOptions={showMoreOptions}
                setShowMoreOptions={setShowMoreOptions}
            />

            {/* New Profile Content */}
            <div className="ml-80 p-20     ">

                <div className="  rounded-xl p-6 ">
                    {/* Profile Header */}
                    <div className="flex items-center  justify-between mb-8 w-[80%]">
                        <div className="flex items-center">

                            <div className="card-container mr-8">
                                <div className="card">
                                    <div className="card-front">
                                        <img
                                            src={'https://github.com/shadcn.png'}
                                            alt="Profile"
                                            className="w-28 h-28 rounded-full object-cover"
                                        />
                                    </div>
                                    <div className="card-back">
                                        <img
                                            src={'/posts/card.png'}
                                            alt="Profile Back"
                                            className="w-28 h-28 rounded-full object-cover"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className=''>
                                <h1 className="text-2xl font-bold text-white">{user?.username}</h1>
                                <div className='flex mt-2'>
                                    <HiMiniCalendarDateRange className='text-gray-400 ' />
                                    <p className='ml-1 text-gray-400 text-sm'>Joined {user?.createdAt?.toDate().toLocaleDateString()}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <button className="px-4 py-2 bg-[#333] text-white rounded-md hover:bg-[#444]">
                                Edit profile
                            </button>
                            <button className="px-4 py-2 bg-[#333] text-white rounded-md hover:bg-[#444]">
                                View archive
                            </button>
                            <button className="p-2 bg-[#333] rounded-full hover:bg-[#444]">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="flex gap-8 ml-6 mb-6 text-white  ">
                        <span>182 <span className='text-gray-400 ml-1'>posts</span></span>
                        <span>{user?.followers.length} <span className='text-gray-400 ml-1'>followers</span></span>
                        <span>{user?.following.length} <span className='text-gray-400 ml-1'>following</span></span>

                    </div>

                    {/* Profile Info */}
                    <div className="mb-8 text-white ml-6">
                        <div className='flex mb-1'>
                            <MdAlternateEmail className='mt-1  text-gray-400' /><h2 className="font-semibold text-gray-400">{user?.email}</h2>
                        </div>
                        <p className="text-gray-300">{user?.bio}</p>
                        <a href="#" className="text- hover:underline flex items-center gap-2 mt-2">
                            <FaFacebook className='text-blue-500'></FaFacebook>
                            Facebook
                        </a>
                    </div>

                    {/* Navigation */}
                    <div className="border-t border-gray-800">
                        <div className="flex justify-center gap-12 pt-4">
                            <button className="text-white uppercase font-medium flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                                Posts
                            </button>
                            <button className="text-white uppercase font-medium flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                </svg>
                                Saved
                            </button>
                            <button className="text-white uppercase font-medium flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                </svg>
                                Tagged
                            </button>
                        </div>
                    </div>

                    {/* Empty State */}
                    <div className="mt-12 text-center">
                        <div className="w-20 h-20 bg-[#333] rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">Share Photos</h3>
                        <p className="text-gray-400 mb-6">When you share photos, they will appear on your profile.</p>
                        <button className="text-blue-400 hover:text-blue-500">Share your first photo</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
