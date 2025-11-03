import axios from 'axios';

const baseURL = import.meta.env.VITE_BACKEND_URL;

export const apiService = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Adds a token to each request
apiService.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');

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
    const { status, config } = error.response || {};
    const originalRequestUrl = config?.url || '';

    if (status === 401) {
      const isAuthPath =
        originalRequestUrl.endsWith('/users/login') ||
        originalRequestUrl.endsWith('/users/register');

      if (!isAuthPath) {
        console.error('[ApiService] Intercepted 401. Token invalid. Logging out...');
        localStorage.removeItem('accessToken');

        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  },
);
