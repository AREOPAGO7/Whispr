'use client';
import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { AuthService } from '../services/userService';
import { useAuthContext } from '../contexts/AuthContext';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { user } = useAuthContext();

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    setError('');
    try {
      await AuthService.login(email, password);
      router.push('/explore');
    } catch (err: any) {
      setError(AuthService.getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, [router]);

  const signup = useCallback(async (email: string, password: string, name?: string) => {
    setLoading(true);
    setError('');
    try {
      const uid = await AuthService.signup(email, password, name);
      router.push('/explore');
      return uid;
    } catch (err: any) {
      setError(AuthService.getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, [router]);

  const googleSignIn = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      await AuthService.googleSignIn(); // Ensure this method is implemented
      router.push('/explore');
    } catch (err: any) {
      setError(AuthService.getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, [router]);



  const githubSignIn = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      await AuthService.githubSignIn(); // Call the new GitHub sign-in method
      router.push('/explore');
    } catch (err: any) {
      setError(AuthService.getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, [router]);


  const logout = useCallback(async () => {
    setLoading(true);
    try {
      await AuthService.logout();
      router.push('/');
    } catch (err: any) {
      setError(AuthService.getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, [router]);

  const resetPassword = useCallback(async (email: string) => {
    setLoading(true);
    setError('');
    try {
      const message = await AuthService.resetPassword(email); // Set success message as error to display it
    } catch (err: any) {
      setError(AuthService.getErrorMessage(err)); // Use the getErrorMessage method for specific error handling
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    user,
    loading,
    error,
    login,
    signup,
    logout,
    googleSignIn,
    githubSignIn, // Ensure this is included in the return object
    resetPassword, // Added resetPassword to the return object
    setError
  };
}; 