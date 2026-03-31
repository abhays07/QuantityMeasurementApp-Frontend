import { useState, useCallback } from 'react';
import { parseApiError } from '../utils/errors';
import type { ApiError } from '../types';

interface UseApiOptions<T> {
  onError?: (error: ApiError) => void;
  onSuccess?: (data: T) => void;
}

export const useApi = <T, Args extends unknown[] = unknown[]>(
  apiFunction: (...args: Args) => Promise<{ data: T }>,
  options?: UseApiOptions<T>
) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<ApiError | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const execute = useCallback(
    async (...args: Args): Promise<T> => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await apiFunction(...args);
        const responseData = response.data;
        setData(responseData);
        options?.onSuccess?.(responseData);
        return responseData;
      } catch (err) {
        const apiError = parseApiError(err);
        setError(apiError);
        options?.onError?.(apiError);
        throw apiError;
      } finally {
        setIsLoading(false);
      }
    },
    [apiFunction, options]
  );

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setIsLoading(false);
  }, []);

  return {
    data,
    error,
    isLoading,
    execute,
    reset,
  };
};
