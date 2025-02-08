'use client';
import { useEffect, useCallback } from 'react';
import { auth } from '../firebase/config';

export const useTokenRefresh = () => {
  const refreshToken = useCallback(async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        // Force token refresh
        const newToken = await user.getIdToken(true);
        // Update the cookie with new token
        document.cookie = `auth-token=${newToken}; path=/`;
        return newToken;
      }
    } catch (error) {
      console.error('Error refreshing token:', error);
      // Handle token refresh error (e.g., redirect to login)
      window.location.href = '/';
    }
  }, []);

  useEffect(() => {
    // Set up token refresh interval (every 55 minutes)
    const interval = setInterval(refreshToken, 55 * 60 * 1000);

    // Set up token refresh on focus
    const handleFocus = () => {
      refreshToken();
    };
    window.addEventListener('focus', handleFocus);

    return () => {
      clearInterval(interval);
      window.removeEventListener('focus', handleFocus);
    };
  }, [refreshToken]);

  return { refreshToken };
}; 