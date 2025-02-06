'use client';
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import Image from 'next/image';
import { Poppins } from 'next/font/google';
import AuthPopup from '../Auth/AuthPopup';



const poppins = Poppins({
  subsets: ['latin'],
  weight: '600',
});
interface SignInProps {
  onClose: () => void;
  toggleAuth: () => void;
}

const SignUpForm = ({ toggleAuth }: SignInProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { loading, error, signup,googleSignIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signup(email, password, name);
  };

  return (
    <div className="">
      <h2 className={`text-2xl font-semibold text-center mb-6 text-black ${poppins.className}`}>Whispr</h2>
     

     
        <div className="flex space-x-2 w-full">
          <button
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
        <div className="relative my-2 mt-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-sm font-medium text-gray-500">or</span>
          </div>
        </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            {error}
          </div>
        )}

        <div className="space-y-2">
          <label className="block text-gray-700 text-[13px]" htmlFor="name">
            Name
          </label>
          <input
            className="w-full px-4 py-3 border text-black text-sm border-gray-300 rounded-lg focus:outline-none  focus:border-gray-400  "
            id="name"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-gray-700 text-[13px]" htmlFor="email">
            Email address
          </label>
          <input
            className="w-full px-4 py-3 border text-black text-sm border-gray-300 rounded-lg focus:outline-none focus:border-gray-400 "
            id="email"
            type="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-gray-700 text-[13px]" htmlFor="password">
            Password
          </label>
          <div className="relative">
            <input
              className="w-full px-4 text-black py-3 border text-sm border-gray-300 rounded-lg focus:outline-none focus:border-gray-400 "
              id="password"
              type="password"
              placeholder="**************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </button>
          </div>
          <p className="text-xs text-gray-500">
            Password must be at least 6 characters long
          </p>
        </div>

        <button
          className="w-full bg-black text-white rounded-lg py-2 font-medium hover:bg-primary focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Creating Account...' : 'Sign Up'}
        </button>

 
      </form>
    </div>
  );
};

export default SignUpForm;