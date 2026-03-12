import axios from 'axios';

const api = axios.create({
  baseURL: 'https://56.228.34.79/api/v1',
});

api.interceptors.request.use(
  (config) => {
    // Add logic here to include auth token if needed
    // const token = useAuthStore.getState().token;
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
