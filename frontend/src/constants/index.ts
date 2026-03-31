import type { CategoriesData } from '../types';

// API Configuration
const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080';
export const API_BASE_URL = apiUrl;

// Frontend URL for redirects
export const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL || 'http://localhost:5173';
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  DASHBOARD: '/dashboard',
} as const;

// Design Tokens - Colors
export const COLORS = {
  primary: {
    main: '#2563eb',
    dark: '#1e293b',
    light: '#f8fafc',
    50: '#eff6ff',
    100: '#dbeafe',
  },
  accent: '#0ea5e9',
  success: '#10b981',
  error: '#ef4444',
  warning: '#f59e0b',
  info: '#3b82f6',
  grey: {
    text: '#64748b',
    border: '#e2e8f0',
    light: '#f1f5f9',
    bg: '#f8fafc',
  },
} as const;

// Spacing
export const SPACING = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '2.5rem',
  '3xl': '3rem',
} as const;

// Unit Categories
export const UNIT_CATEGORIES: CategoriesData = {
  length: { units: ['FEET', 'INCHES', 'YARDS', 'CENTIMETERS'] },
  temperature: { units: ['CELSIUS', 'FAHRENHEIT', 'KELVIN'] },
  volume: { units: ['LITRE', 'MILLILITRE', 'GALLON'] },
  weight: { units: ['GRAM', 'KILOGRAM', 'MILLIGRAM', 'POUND', 'TONNE'] },
};

// Default Units
export const DEFAULT_UNITS = {
  length: 'FEET',
  temperature: 'CELSIUS',
  volume: 'LITRE',
  weight: 'GRAM',
} as const;

// Form Validation Rules
export const VALIDATION_RULES = {
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Please enter a valid email address',
  },
  password: {
    minLength: 6,
    message: 'Password must be at least 6 characters',
  },
  name: {
    minLength: 2,
    message: 'Name must be at least 2 characters',
  },
  mobile: {
    pattern: /^[0-9\+\-\s\(\)]{10,}$/,
    message: 'Please enter a valid phone number',
  },
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  INVALID_CREDENTIALS: 'Invalid email or password',
  NETWORK_ERROR: 'Network error. Please check your connection',
  REGISTRATION_FAILED: 'Registration failed. Please try again',
  OPERATION_NOT_SUPPORTED: 'Operation not supported for this category',
  PARSE_ERROR: 'Failed to parse user data',
  REQUIRED_FIELD: 'This field is required',
  AUTHENTICATION_REQUIRED: 'Please login to continue',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful!',
  SIGNUP_SUCCESS: 'Registration successful! Please login.',
  LOGOUT_SUCCESS: 'Logged out successfully',
} as const;

// API Request Timeout
export const API_TIMEOUT = 30000; // 30 seconds

// Storage Keys
export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'currentUser',
  IS_LOGGED_IN: 'isLoggedIn',
} as const;

// Authentication
export const AUTH_HEADER_PREFIX = 'Bearer';
