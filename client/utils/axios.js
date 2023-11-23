// axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 403){
      sessionStorage.removeItem('user');
      window.location.replace('/login');
    };
    return Promise.reject(error);
  }
);

export default axiosInstance;