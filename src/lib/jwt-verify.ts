import { setSessionCookie } from "./setSessionCookie";
import { refreshFirebaseToken } from './refreshToken';

interface DecodedToken {
  exp: number;
  user_id: string;
  email: string;
}

export async function verifyToken(token: string): Promise<DecodedToken> {
  try {
    console.log('Starting token verification');

    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idToken: token,
        }),
      }
    );

    console.log('Token verification response:', response);

    if (!response.ok) {
      const errorText = await response.text();

      // Check if token is expired
      if (errorText.includes('auth/id-token-expired')) {
        console.log('Token expired, attempting refresh');
        
        // Refresh the token
        const newToken = await refreshFirebaseToken();

        // Retry token verification with new token
        return verifyToken(newToken); // Retry verification with the new token
      }

      throw new Error(`Token verification failed: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.users || !data.users[0]) {
      throw new Error('No user data in token response');
    }

    const user = data.users[0];

    // Use the expiration from the token, if available, instead of hardcoding it
    const expirationTime = user.exp || Math.floor(Date.now() / 1000) + (60 * 60); // 1 hour default expiration if not present in response

    return {
      exp: expirationTime,
      user_id: user.localId,
      email: user.email,
    };
  } catch (error) {
    console.error('Token verification error:', error);
    throw error;
  }
}
