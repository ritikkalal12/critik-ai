import axios from 'axios';

// Create an Axios instance with the base URL and credentials
const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL || 'http://localhost:8000',
  withCredentials: true, // Include cookies in requests
});

export default api;
