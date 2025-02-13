import { FaSearch } from "react-icons/fa";
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: '600',
});
const Searchbar: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-10 bg-[#1c1c1c]/80 backdrop-blur-sm border-b border-white/10">
      <div className="mx-auto px-4 h-16 flex items-center justify-end">
        <h1 className={`pt-4 text-[26px] hidden lg:block ${poppins.className} fixed left-8 top-0`}>
          Whispr <span className="text-[10px] text-primary">1.0v</span>
        </h1>
        <div className="relative lg:-mr-2 lg:w-[26%] w-[100%]">
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
  );
};
export default Searchbar;