/**
 * api.js
 *
 * Axios instance configuration for making HTTP requests to the backend API.
 * Automatically attaches JWT token from localStorage to the Authorization header
 * for authenticated requests.
 *
 * Usage:
 *   Import this module and use `api.get`, `api.post`, etc. to interact with the backend.
 */

import axios from 'axios';

/**
 * Create an Axios instance with a predefined base URL.
 */
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

/**
 * Request interceptor to attach JWT token to Authorization header if available.
 * This ensures all outgoing requests include authentication credentials.
 */
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
