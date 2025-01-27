export const setSessionCookie = async (token: string, setError: (error: string) => void) => {
    try {
      await fetch('/api/auth/session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });
    } catch (error) {
      console.error('Failed to set session:', error);
      setError("Failed to create session. Please try again.");
    }
  };