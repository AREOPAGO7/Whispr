import { auth } from '@/firebase/firebaseConfig';

export async function refreshFirebaseToken() {
  const currentUser = auth.currentUser;
  
  if (!currentUser) {
    throw new Error('No user logged in');
  }

  try {
    const newToken = await currentUser.getIdToken(true);
    
    // Update session with new token
    const response = await fetch('/api/auth/session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: newToken }),
    });

    if (!response.ok) {
      throw new Error('Failed to update session with new token');
    }

    return newToken;
  } catch (error) {
    console.error('Token refresh failed:', error);
    throw error;
  }
}