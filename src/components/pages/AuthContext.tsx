import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AuthContextType } from '../../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<any>(null); // Consider defining a more specific type for users
  const [authToken, setAuthToken] = useState<string>("");

  const login = (token: string) => {
    setAuthToken(token);
    // Optionally decode token to set currentUser
    const decodedToken = decodeToken(token);
    if (decodedToken) {
      const { id, email } = decodedToken;
      setCurrentUser({ id, email });
    }
  };

  const logout = () => {
    setAuthToken("");
    setCurrentUser(null);
    // Clear token from storage
  };

  const value = {
    currentUser,
    authToken,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
