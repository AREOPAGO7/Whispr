import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Poppins } from 'next/font/google';
import { MdCancel } from "react-icons/md";

const poppins = Poppins({
  subsets: ['latin'],
  weight: '600',
});
interface ResetPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ResetPasswordModal: React.FC<ResetPasswordModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const { resetPassword, error } = useAuth();
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage(''); // Clear previous success message
    try {
      await resetPassword(email);
      setSuccessMessage('Password reset link sent successfully!'); // Set success message
    } catch (err) {
      console.error(err); // Log the error for debugging
      setSuccessMessage('Failed to send reset link. Please try again.'); // Set error message
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
       <div className='flex w-full mb-6 justify-between'>
       <h2 className={`text-lg font-bold  text-gray-800 ${poppins.className} `}>Reset Password</h2>
        <button onClick={onClose} className={`text-gray-800 text-sm  ${poppins.className}` }>
        <MdCancel className='text-2xl text-black/80'/>
        </button>
       </div>
        {error && <div className="text-red-500 mb-2">{error}</div>} {/* Error message */}
        {successMessage && <div className="text-green-500 mb-2">{successMessage}</div>} {/* Success message */}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={`border text-black rounded-lg p-2 w-full mb-4 text-[13px] outline-none ${poppins.className}`}
          />
          <button type="submit" className={`bg-black text-[13px] hover:bg-primary text-white rounded-lg py-2 w-full transition-colors duration-300 ${poppins.className}`}>
            Send Reset Link
          </button>
        </form>
       
      </div>
    </div>
  );
};

export default ResetPasswordModal; 