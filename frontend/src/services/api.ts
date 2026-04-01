import axios from 'axios';
import type { AxiosResponse } from 'axios';
import { API_BASE_URL, API_TIMEOUT, STORAGE_KEYS } from '../constants';
import type {
  LoginCredentials,
  SignupData,
  AuthResponse,
  User,
  QuantityInput,
  QuantityResponse,
  QuantityMeasurementEntity
} from '../types';

const API = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  withCredentials: true,
});

// 1. JWT request interceptor: Automatically attach token if it exists
API.interceptors.request.use((config) => {
  const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 2. Error response interceptor: Handle Expired Tokens (Clean 401s)
API.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response ? error.response.status : null;

    if (status === 401) {
      const currentToken = localStorage.getItem(STORAGE_KEYS.TOKEN);
      
      // If a 401 happens and we have a token, it means the token is EXPIRED/INVALID
      if (currentToken) {
        console.warn("Session expired or token invalid. Logging out...");
        localStorage.removeItem(STORAGE_KEYS.TOKEN);
        localStorage.removeItem(STORAGE_KEYS.USER);
        localStorage.removeItem(STORAGE_KEYS.IS_LOGGED_IN);
        
        // Redirect to login with an expired flag to show a notification
        window.location.href = '/login?expired=true';
      }
      // If status is 401 but no token exists, it's just a wrong password on the login page.
      // We don't redirect; we let the Login component handle the error.
    }
    
    return Promise.reject(error);
  }
);

/**
 * Login with email and password
 * Backend returns: { token: "jwt-token" }
 */
export const loginUser = (credentials: LoginCredentials): Promise<AxiosResponse<AuthResponse>> =>
  API.post('/auth/login', credentials);

/**
 * Register new user
 */
export const registerUser = (userData: SignupData): Promise<AxiosResponse<User>> =>
  API.post('/auth/register', userData);

/**
 * Initiate Google OAuth login
 * Direct browser redirect triggers the Spring Security flow
 */
export const initiateGoogleLogin = (): void => {
  // Direct redirect to trigger Google Account Picker
  window.location.href = `${API_BASE_URL}/oauth2/authorization/google`;
};

// Quantity Measurement APIs

/**
 * Perform conversion - Open to Guests
 */
export const convertQuantity = (
  quantityDTO: { value: number; unit: string },
  targetUnit: string
): Promise<AxiosResponse<QuantityResponse>> =>
  API.post(`/api/v1/quantities/convert/${targetUnit}`, quantityDTO);

/**
 * Compare two quantities - Open to Guests
 */
export const compareQuantities = (input: QuantityInput): Promise<AxiosResponse<boolean>> =>
  API.post('/api/v1/quantities/compare', input);

/**
 * Add two quantities - Saves to DB only if Authenticated
 */
export const addQuantities = (input: QuantityInput): Promise<AxiosResponse<QuantityResponse>> =>
  API.post('/api/v1/quantities/add', input);

/**
 * Subtract two quantities - Saves to DB only if Authenticated
 */
export const subtractQuantities = (input: QuantityInput): Promise<AxiosResponse<QuantityResponse>> =>
  API.post('/api/v1/quantities/subtract', input);

/**
 * Fetch the user's operation history
 * Requires valid JWT. Returns empty array for guests (handled by backend logic).
 */
export const getHistory = (): Promise<AxiosResponse<QuantityMeasurementEntity[]>> =>
  API.get('/api/v1/quantities/history');

export default API;