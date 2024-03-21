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

interface DecodedUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

function decodeToken(token: string): DecodedUser {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  console.log('Decoded token: ', jsonPayload)
  return JSON.parse(jsonPayload) as DecodedUser;
}



export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<DecodedUser | null>(null);
  const [authToken, setAuthToken] = useState<string>("");

  const login = (token: string) => {
    setAuthToken(token);
    // Decode the token to get user details
    const decodedUser = decodeToken(token);
    setCurrentUser(decodedUser); // Set the decoded user details
    document.cookie = `token=${token}; path=/; max-age=86400; Secure; SameSite=Strict`;
  };

  const validateAndSetToken = (token: string) => {
    if (!token) return;
    // Here, add server-side validation of token if necessary
    setAuthToken(token);
    const decodedUser = decodeToken(token);
    setCurrentUser(decodedUser);
  };
  
  const logout = () => {
    setAuthToken("");
    setCurrentUser(null);
    document.cookie = 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  };

  const value = {
    currentUser,
    authToken,
    login,
    logout,
    validateAndSetToken
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
