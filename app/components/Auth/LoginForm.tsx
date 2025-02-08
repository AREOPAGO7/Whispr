'use client';
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import Image from 'next/image';
import { Poppins } from 'next/font/google';
import ResetPasswordModal from './ResetPasswordModal';
import { FaRegEye } from "react-icons/fa6";
import { LuEyeClosed } from "react-icons/lu";

const poppins = Poppins({
  subsets: ['latin'],
  weight: '600',
});
interface SignInProps {
  onClose: () => void;
  toggleAuth: () => void;
}

const LoginForm = ({ toggleAuth }: SignInProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const { loading, error, login , googleSignIn ,githubSignIn } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShowPass, setIsShowPass] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="">
      <h2 className={`text-2xl font-semibold text-center mb-6 text-black ${poppins.className}`}>Whispr</h2>
      
     

        <div className="flex space-x-2 w-full">
          <button
           onClick={githubSignIn}
            type="button"
            className="flex items-center justify-center w-full space-x-4 border border-gray-300 rounded-lg shadow-sm py-2 px-4 hover:bg-gray-50"
          >
            <Image
              src="/github.png"
              alt="g logo"
              width={20}
              height={20}
            />
            <span className='text-black/80'>Github</span>
          </button>
          <button
            onClick={googleSignIn}
            type="button"
            className="flex items-center justify-center w-full space-x-4 border border-gray-300 rounded-lg shadow-sm py-2 px-4 hover:bg-gray-50"
          >
            <Image
              src="/google.png"
              alt="Google logo"
              width={20}
              height={20}
            />
            <span className='text-black/80'>Google</span>
          </button>
        </div>
        <div className="relative my-3   mt-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-sm font-medium text-gray-500">or</span>
          </div>
        </div>
      <form onSubmit={handleSubmit} className="space-y-4 w-[100%]">
        {error && (
          <div className={`bg-red-100 border text-sm border-red-400 text-red-700 px-4 py-3 rounded relative ${poppins.className}`}>
            {error}
          </div>
        )}
        
        <div className="space-y-2 ">
          <label className="block text-gray-700 text-sm" htmlFor="email">
            Email address
          </label>
          <input
            className={`w-full px-4 text-sm py-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:border-gray-500 ${poppins.className}`}
            id="email"
            type="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-gray-700 text-sm" htmlFor="password">
            Password
          </label>
          <div className="relative">
            <input
              className={`w-full px-4 text-sm py-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:border-gray-500 ${poppins.className}`}
              id="password"
              type={isShowPass ?  'text'  : "password"}
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              onClick={()=> setIsShowPass(!isShowPass)}
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {
                isShowPass ?  <FaRegEye /> : <LuEyeClosed />
              }
             
              
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="rounded border-gray-300  text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-600">Remember me</span>
          </label>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="text-[14px] text-blue-500 font-semibold  hover:text-blue-800"
          >
            Forgot password?
          </button>
        </div>

        <button
          className={`w-full text-sm bg-black text-white rounded-lg py-2 font-medium hover:bg-primary focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 ${poppins.className}`}
          type="submit"
          disabled={loading}
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>

        
      </form>
      <ResetPasswordModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default LoginForm;