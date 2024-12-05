// axiosInstance.js
import axios from 'axios';
import app_vars from './config';
import { toast } from 'sonner';
import auth from './auth';

const base_url = app_vars.domain.baseURL;

const axiosInstance = axios.create({
  baseURL: base_url,
});

// Add request interceptor to include the token
axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle success and errors globally
axiosInstance.interceptors.response.use(
  response => response.data,
  error => {
    handleError(error); // Use handleError for error processing
    // return Promise.reject(error);
  }
);

// Global error handling function
export const handleError = (error) => {
  const generalToastBlock = error?.request?.responseURL?.toString()
  const message = error?.response?.data?.message || 'Something went wrong';
  // Toast for error handling
  if (!generalToastBlock?.includes("general_api")) {
    if (error?.response?.status==401) {
      toast.error("Session Out")
      auth.logout();
     window.location.reload();
    }
    toast.error(message);
  }
  
  // Add any other global error handling logic (logging, retry, etc.)
};

// Export axiosInstance and the handleError function
export default axiosInstance;