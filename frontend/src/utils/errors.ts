import type { ApiError } from '../types';
import { ERROR_MESSAGES } from '../constants';

// Typed interface for Axios-like error responses
interface AxiosErrorResponse {
  response?: {
    status?: number;
    data?: {
      message?: string;
      [key: string]: unknown;
    };
  };
  message?: string;
  code?: string;
}

const getAxiosError = (error: unknown): AxiosErrorResponse | null => {
  if (typeof error === 'object' && error !== null && 'response' in error) {
    return error as AxiosErrorResponse;
  }
  return null;
};

export const getErrorMessage = (error: unknown): string => {
  if (!error) return ERROR_MESSAGES.NETWORK_ERROR;

  if (error instanceof Error) {
    return error.message;
  }

  const axiosError = getAxiosError(error);
  if (axiosError) {
    const response = axiosError.response;

    if (response?.data?.message) {
      return response.data.message;
    }

    if (response?.status === 401) {
      return ERROR_MESSAGES.AUTHENTICATION_REQUIRED;
    }

    if (response?.status === 403) {
      return 'You do not have permission to perform this action';
    }

    if (response?.status === 404) {
      return 'Resource not found';
    }

    if (response?.status === 500) {
      return 'Server error. Please try again later';
    }
  }

  if (typeof error === 'string') {
    return error;
  }

  return ERROR_MESSAGES.NETWORK_ERROR;
};

export const parseApiError = (error: unknown): ApiError => {
  const message = getErrorMessage(error);

  const axiosError = getAxiosError(error);
  const status = axiosError?.response?.status;

  return {
    message,
    status,
    data: axiosError?.response?.data,
  };
};

export const isNetworkError = (error: unknown): boolean => {
  if (error instanceof Error) {
    return error.message?.includes('Network') ?? false;
  }

  const axiosError = getAxiosError(error);
  return !!(
    axiosError?.message?.includes('Network') ||
    axiosError?.code === 'ECONNABORTED' ||
    axiosError?.code === 'ERR_NETWORK'
  );
};

export const isAuthError = (error: unknown): boolean => {
  const axiosError = getAxiosError(error);
  return axiosError?.response?.status === 401;
};

export const isValidationError = (error: unknown): boolean => {
  const axiosError = getAxiosError(error);
  return axiosError?.response?.status === 400;
};
