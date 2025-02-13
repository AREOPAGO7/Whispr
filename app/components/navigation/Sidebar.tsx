import React, { useRef } from 'react';
import { FiCompass, FiBell, FiMessageSquare, FiPlusSquare, FiHeart, FiMessageCircle, FiShare2, FiBookmark } from "react-icons/fi";
import { AiFillHome } from "react-icons/ai";
import { CgDetailsMore } from "react-icons/cg";
import { IoMdSettings } from "react-icons/io";
import { BiLogOut } from "react-icons/bi";
import { Poppins } from 'next/font/google';
import Link from 'next/link';



interface SidebarProps {
    user: {
        username: string;
        bio: string;
        profileImage?: string;
    };
    logout: () => void;
    showMoreOptions: boolean;
    setShowMoreOptions: (show: boolean) => void;
}

const poppins = Poppins({
    weight: ['400', '500', '600', '700'],
    subsets: ['latin'],
    variable: '--font-poppins',
});

const Sidebar: React.FC<SidebarProps> = ({
    user,
    logout,
    showMoreOptions,
    setShowMoreOptions
}) => {
    const dropdownRef = useRef<HTMLDivElement>(null);

    return (
        <div className="hidden md:block lg:w-80 w-64 fixed left-0 top-0 h-screen p-6 border-r border-white/10">
            {/* Profile section */}
            <Link href="/profile" className="mt-16 hover:bg-white/10 p-2 transition-colors duration-300 hover:bg-gray-100 rounded-lg block">
                <div className="flex items-center space-x-4">
                    <img
                        src="https://github.com/shadcn.png"
                        alt="Profile"
                        width={48}
                        height={48}
                        className="rounded-full object-cover"
                    />
                    <div>
                        <h3 className="font-semibold">{user.username}</h3>
                        <p className="text-[12px] text-white/70">{user.bio}</p>
                    </div>
                </div>
            </Link>

            {/* Navigation section with flex and justify-between */}
            <div className="flex flex-col h-[calc(100vh-180px)] justify-between">
                {/* Main navigation */}
                <nav className="space-y-4 mt-6 text-[14px]">
                    <Link href="/explore" className={`flex items-center space-x-4 w-full p-3 hover:bg-white/10 transition-colors duration-300 hover:bg-gray-100 rounded-lg ${poppins.className}`}>
                        <AiFillHome className="w-5 h-5" />
                        <span>Home</span>
                    </Link>

                    <Link href="/explore" className={`flex items-center space-x-4 w-full p-3 hover:bg-white/10 transition-colors duration-300 hover:bg-gray-100 rounded-lg ${poppins.className}`}>
                        <FiCompass className="w-5 h-5" />
                        <span>Explore</span>
                    </Link>
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
                        <div className="absolute bottom-full left-0 w-full mb-2 bg-[#1c1c1c] border border-white/5 rounded-lg shadow-lg overflow-hidden">

                            <button
                                onClick={() => { }}
                                className={`flex items-center space-x-4 w-full p-3  hover:bg-white/10 transition-all duration-300 ${poppins.className}`}
                            >
                                <IoMdSettings className="w-5 h-5 transition-transform group-hover:rotate-12" />
                                <span>Settings</span>
                            </button>
                            <button
                                onClick={() => { }}
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

    ); // Placeholder for the sidebar content
};

export default Sidebar;