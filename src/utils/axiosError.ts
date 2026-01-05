// utils/handleError.ts
import axios, { AxiosError } from 'axios';

export const handleError = (
  error: unknown,
  fallback = 'Something went wrong'
): never => {
  if (axios.isAxiosError(error)) {
    // If Axios error, get response message if available
    throw new Error(error.response?.data?.message || error.message || fallback);
  }
  // Fallback for normal errors
  throw new Error(error instanceof Error ? error.message : fallback);
};
