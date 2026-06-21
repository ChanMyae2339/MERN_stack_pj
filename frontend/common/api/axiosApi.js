import axios from 'axios';

const axiosApi = axios.create({
  baseURL:import.meta.env.VITE_BACKEND_URL ||'/api',  //to know vercel frontend or local from backend
  headers: {
    'Content-Type': 'application/json',

  },
  withCredentials: true
});

export default axiosApi;