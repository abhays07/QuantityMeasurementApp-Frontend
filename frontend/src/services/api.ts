import axios from 'axios';
import type { AxiosResponse } from 'axios';
import { API_BASE_URL, API_TIMEOUT, STORAGE_KEYS } from '../constants';
import type {
  LoginCredentials,
  SignupData,
  AuthResponse,
  User,
  QuantityInput,
  QuantityResponse
} from '../types';

const API = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  withCredentials: true, // Important for CORS with cookies
});

// JWT request interceptor
API.interceptors.request.use((config) => {
  const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Error response interceptor
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid - clear auth and redirect
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER);
      localStorage.removeItem(STORAGE_KEYS.IS_LOGGED_IN);
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

/**
 * Login with email and password
 * Backend returns: { token: "jwt-token" }
 * useApi hook will extract response.data
 */
export const loginUser = (credentials: LoginCredentials): Promise<AxiosResponse<AuthResponse>> =>
  API.post('/auth/login', credentials);

/**
 * Register new user
 * Backend returns: User object
 */
export const registerUser = (userData: SignupData): Promise<AxiosResponse<User>> =>
  API.post('/auth/register', userData);

/**
 * Initiate Google OAuth login
 * Direct redirect approach (simpler than popup)
 * Backend will handle OAuth and redirect back to /oauth-callback
 */
export const initiateGoogleLogin = (): void => {
  // Redirect browser to Spring Security OAuth2 endpoint
  // Spring will handle Google auth and redirect back to /oauth/success
  // We'll handle the token in GoogleCallback page
  window.location.href = `${API_BASE_URL}/oauth2/authorization/google`;
};

// Quantity Measurement APIs
export const convertQuantity = (
  quantityDTO: { value: number; unit: string },
  targetUnit: string
): Promise<AxiosResponse<QuantityResponse>> =>
  API.post(`/api/v1/quantities/convert/${targetUnit}`, quantityDTO);

export const compareQuantities = (input: QuantityInput): Promise<AxiosResponse<boolean>> =>
  API.post('/api/v1/quantities/compare', input);

export const addQuantities = (input: QuantityInput): Promise<AxiosResponse<QuantityResponse>> =>
  API.post('/api/v1/quantities/add', input);

export const subtractQuantities = (input: QuantityInput): Promise<AxiosResponse<QuantityResponse>> =>
  API.post('/api/v1/quantities/subtract', input);

export default API;