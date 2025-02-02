import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyToken } from '@/lib/jwt-verify';
import { auth } from '@/firebase/firebaseConfig';
import React from 'react';
import { onAuthStateChanged } from 'firebase/auth';

const withAuth = (WrappedComponent: React.ComponentType<any>) => {
  return async (props: any) => {
    const cookieStore = await cookies();
    const session = cookieStore.get('session');

    if (!session?.value) {
      redirect('/');
    }

    try {
      // Try to verify the current token
      const decodedToken = await verifyToken(session.value);
      const tokenExpirationTime = decodedToken.exp * 1000;
      const fiveMinutes = 5 * 60 * 1000;

      if (Date.now() + fiveMinutes >= tokenExpirationTime) {
        // Token is about to expire, refresh it
        await refreshFirebaseToken();
       console.log('firebase token refreshed');
      }
    } catch (error: any) {
      console.error('Token verification failed:', error);
      
      if (error.code === 'TOKEN_EXPIRED') {
        try {
          await refreshFirebaseToken();
        } catch (refreshError) {
          console.error('Token refresh failed:', refreshError);
          redirect('/');
        }
      } else {
        redirect('/');
      }
    }

    return <WrappedComponent {...props} />;
  };
};

async function refreshFirebaseToken() {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      unsubscribe(); // Immediately unsubscribe to avoid memory leaks
      
      if (user) {
        try {
          const newToken = await user.getIdToken(true); // Force refresh
          
          // Update the cookie with the new token
          (await
            // Update the cookie with the new token
            cookies()).set('session', newToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/'
          });
          
          resolve(newToken);
        } catch (error) {
          reject(error);
        }
      } else {
        reject(new Error('No authenticated user'));
      }
    });

    // Set a timeout to avoid hanging
    setTimeout(() => {
      unsubscribe();
      reject(new Error('Auth state change timeout'));
    }, 10000);
  });
}

export default withAuth;