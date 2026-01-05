import axios from 'axios';

// Base URL as requested: localhost:3000
// In production, this should be an environment variable.
const BASE_URL = 'http://localhost:3000';

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to attach token if needed (assuming "AUTH" implies some token)
// For now, simple implementation.
api.interceptors.request.use(
  (config) => {
    const token = localStorage?.getItem('token') ?? null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error.response || error.message);
    return Promise.reject(error);
  }
);
