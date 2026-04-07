import axios from 'axios';

const api = axios.create({
  baseURL: 'https://allsheneedsback-production-a650.up.railway.app',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // optionally trigger a redirect here using window.location or a global event
    }
    return Promise.reject(error);
  }
);

export default api;
