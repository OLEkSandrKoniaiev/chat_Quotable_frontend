import axios from 'axios';

const baseURL = 'http://localhost:3000';

export const apiService = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Adds a token to each request
apiService.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: unknown) => {
    return Promise.reject(error);
  },
);

// Handles errors, 401
apiService.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { status } = error.response || {};

    if (status === 401) {
      console.error('[ApiService] Intercepted 401. Token invalid. Performing logout...');

      localStorage.removeItem('authToken');

      window.location.href = '/login';
    }

    return Promise.reject(error);
  },
);
