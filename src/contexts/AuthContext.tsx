
import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'buyer' | 'marketer' | 'company';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (user: Omit<User, 'id'>, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  
  useEffect(() => {
    // Check local storage for user data
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Mock login functionality
    // In a real app, this would call an authentication API
    console.log('Login attempt with:', email, password);

    // Simulate API call
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        // Mock user data for demo purposes
        const mockUser: User = {
          id: '1',
          name: 'John Doe',
          email,
          role: 'buyer',
        };
        
        setUser(mockUser);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(mockUser));
        resolve();
      }, 1000);
    });
  };

  const register = async (userData: Omit<User, 'id'>, password: string) => {
    // Mock registration
    // In a real app, this would call an API endpoint
    console.log('Register attempt with:', userData, password);

    // Simulate API call
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const newUser = {
          ...userData,
          id: Math.random().toString(36).substring(2, 9)
        };
        
        setUser(newUser);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(newUser));
        resolve();
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
