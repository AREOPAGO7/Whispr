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
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Token verification failed:', errorText);
        throw new Error(`Token verification failed: ${response.statusText}`);
      }
     
      const data = await response.json();
  
      if (!data.users || !data.users[0]) {
        throw new Error('No user data in token response');
      }
  
      const user = data.users[0];
      return {
        exp: Math.floor(Date.now() / 1000) + (24 * 3600), // 1 hour from now
        user_id: user.localId,
        email: user.email
      };
    } catch (error) {
      console.error('Token verification error:', error);
      throw error;
    }
  }