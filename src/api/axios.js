// src/api/axios.js
import axios from 'axios';

// Create instance for axios
const api = axios.create({
  baseURL: 'https://api.dineflex.ie', // Waiting for API adress from backend
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Automatically Attach JWT Token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Response Interceptor: Handle Response Data
api.interceptors.response.use((response) => {
  return response.data; // Directly Return Response Data
}, (error) => {
  return Promise.reject(error.response || error); // return error msg
});

export default api;
