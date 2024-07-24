// src/services/axiosConfig.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api/', // Actualiza esta URL según sea necesario
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    accept: 'application/json',
  }
});

axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const { config, response: { status } } = error;
    const originalRequest = config;

    if (status === 401 && originalRequest.url === '/token/refresh/') {
      return Promise.reject(error);
    }

    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        try {
          const response = await axios.post('http://localhost:8000/api/token/refresh/', {
            refresh: refreshToken
          });
          const accessToken = response.data.access;
          localStorage.setItem('access_token', accessToken);
          axiosInstance.defaults.headers['Authorization'] = `Bearer ${accessToken}`;
          originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
          return axiosInstance(originalRequest);
        } catch (error) {
          console.error('Failed to refresh access token:', error);
        }
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
