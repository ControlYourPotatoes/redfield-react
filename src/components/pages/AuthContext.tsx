// AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import axios from 'axios';

interface AuthContextType {
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
      return localStorage.getItem('isLoggedIn') === 'true'; // Initialize from persisted state
    });

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post('http://localhost:3001/api/login', { email, password });
      if (response.data) {
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', 'true'); // Persist login state
        localStorage.saveItem(response)
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn'); // Clear persisted state
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
