'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase/config';  // Import auth from config
import { onAuthStateChanged, User } from 'firebase/auth';
import { useTokenRefresh } from '../hooks/useTokenRefresh';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  refreshUserToken: () => Promise<string | undefined>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  refreshUserToken: async () => undefined
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { refreshToken } = useTokenRefresh();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Automatically update the user state when the authentication state changes
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
  
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, refreshUserToken: refreshToken }}>
      {children}
    </AuthContext.Provider>
  );
}

// Export the context hook
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
