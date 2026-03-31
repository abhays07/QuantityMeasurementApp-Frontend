import { jwtDecode } from 'jwt-decode';
import type { User } from '../types';

interface JwtPayload {
  sub?: string; // subject (email in our case)
  iat?: number; // issued at
  exp?: number; // expiration
  email?: string;
  name?: string;
  id?: string;
  mobile?: string;
  [key: string]: unknown; // Additional claims with safe type
}

/**
 * Decode JWT token and extract user information
 * Backend JWT contains email in the 'sub' claim
 */
export const decodeToken = (token: string): JwtPayload | null => {
  try {
    return jwtDecode<JwtPayload>(token);
  } catch (error) {
    console.error('Failed to decode token:', error);
    return null;
  }
};

/**
 * Extract user from JWT token
 * Creates a User object from token claims
 */
export const extractUserFromToken = (token: string): User | null => {
  const payload = decodeToken(token);

  if (!payload || !payload.sub) {
    return null;
  }

  // Create user object from JWT claims
  // Backend uses email as 'sub' claim
  return {
    email: payload.sub,
    name: payload.name || payload.sub.split('@')[0], // Fallback to email prefix
    id: payload.id,
    mobile: payload.mobile,
  };
};

/**
 * Check if token is expired
 */
export const isTokenExpired = (token: string): boolean => {
  const payload = decodeToken(token);

  if (!payload || !payload.exp) {
    return true;
  }

  // Check if expiration time is in the past
  return payload.exp * 1000 < Date.now();
};

/**
 * Get remaining time in token (in milliseconds)
 */
export const getTokenExpiryTime = (token: string): number | null => {
  const payload = decodeToken(token);

  if (!payload || !payload.exp) {
    return null;
  }

  const expiryMs = payload.exp * 1000;
  const now = Date.now();

  return expiryMs - now;
};
