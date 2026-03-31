import React, { createContext, useState, useCallback, useEffect } from 'react';
import type { User } from '../types';
import { STORAGE_KEYS } from '../constants';
import API from '../services/api';
import { isTokenExpired, extractUserFromToken } from '../utils/jwt';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  setUser: (user: User) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

const getInitialState = (): { token: string | null; user: User | null; isLoading: boolean } => {
  if (typeof window === 'undefined') return { token: null, user: null, isLoading: true };
  
  // First, check URL for OAuth token (Google Login redirect)
  const params = new URLSearchParams(window.location.search);
  const urlToken = params.get('token');
  
  if (urlToken) {
    const extractedUser = extractUserFromToken(urlToken);
    if (extractedUser) {
      // Set default header immediately so early API calls have it
      API.defaults.headers.common.Authorization = `Bearer ${urlToken}`;
      return { token: urlToken, user: extractedUser, isLoading: false };
    }
  }

  // Fallback to localStorage
  const storedToken = localStorage.getItem(STORAGE_KEYS.TOKEN);
  const storedUser = localStorage.getItem(STORAGE_KEYS.USER);

  if (storedToken && storedUser && storedUser !== 'undefined') {
    if (!isTokenExpired(storedToken)) {
      try {
        const parsedUser = JSON.parse(storedUser);
        
        // Sync API defaults immediately
        API.defaults.headers.common.Authorization = `Bearer ${storedToken}`;
        
        return {
          token: storedToken,
          user: parsedUser,
          isLoading: false
        };
      } catch (error) {
        console.error('Failed to parse stored user data', error);
      }
    }
    // Token is expired or invalid - clear storage
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.IS_LOGGED_IN);
  }

  return { token: null, user: null, isLoading: false };
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [initial] = useState(getInitialState); // computed once on mount
  const [user, setUserState] = useState<User | null>(initial.user);
  const [token, setToken] = useState<string | null>(initial.token);
  const [isLoading] = useState(initial.isLoading);

  useEffect(() => {
    // If we loaded the token from the URL, persist it and clean the URL
    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get('token');
    
    if (urlToken && initial.token === urlToken && initial.user) {
      localStorage.setItem(STORAGE_KEYS.TOKEN, urlToken);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(initial.user));
      localStorage.setItem(STORAGE_KEYS.IS_LOGGED_IN, 'true');
      
      // Remove token from URL smoothly
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [initial]);

  const login = useCallback((newToken: string, newUser: User) => {
    setToken(newToken);
    setUserState(newUser);

    localStorage.setItem(STORAGE_KEYS.TOKEN, newToken);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(newUser));
    localStorage.setItem(STORAGE_KEYS.IS_LOGGED_IN, 'true');

    // Set default auth header for all future requests
    API.defaults.headers.common.Authorization = `Bearer ${newToken}`;
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserState(null);

    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.IS_LOGGED_IN);

    delete API.defaults.headers.common.Authorization;
  }, []);

  const setUser = useCallback((newUser: User) => {
    setUserState(newUser);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(newUser));
  }, []);

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated: !!token && !!user,
    isLoading,
    login,
    logout,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.displayName = 'AuthProvider';
