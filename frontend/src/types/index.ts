// Auth Types
export interface User {
  id?: string;
  name: string;
  email: string;
  mobile?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData extends LoginCredentials {
  name: string;
  mobile?: string;
}

// Quantity Types
export interface Quantity {
  value: number;
  unit: string;
}

export interface QuantityInput {
  thisQuantityDTO: Quantity;
  thatQuantityDTO: Quantity;
}

export interface QuantityResponse {
  value: number;
  unit: string;
}

export interface QuantityMeasurementEntity {
  id?: string;
  operand1: string;
  operation: string;
  operand2: string;
  result: string;
  timestamp?: string;
  status?: string;
  errorMessage?: string;
}

// API Response Types
export interface ApiError {
  message: string;
  status?: number;
  data?: any;
}

// Category Types
export type QuantityCategory = 'length' | 'temperature' | 'volume' | 'weight';

export interface CategoryData {
  units: string[];
}

export interface CategoriesData {
  length: CategoryData;
  temperature: CategoryData;
  volume: CategoryData;
  weight: CategoryData;
}

// Form Validation
export interface ValidationError {
  field: string;
  message: string;
}

// Notification Types
export type NotificationType = 'success' | 'error' | 'info' | 'warning';

export interface Notification {
  id: string;
  message: string;
  type: NotificationType;
  duration?: number;
}
