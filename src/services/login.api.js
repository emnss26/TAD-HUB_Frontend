import axios from 'axios';

const loginapi = axios.create({
  baseURL: 'http://localhost:3000/api/auth' 
});

// Interceptor para añadir el token en cada request
loginapi.interceptors.request.use((config) => {
  const token = localStorage.getItem('firebaseToken'); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default loginapi;