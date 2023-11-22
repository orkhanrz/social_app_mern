import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => {
    // Log successful responses
    console.log("Response status:", response.status);
    return response;
  },
  (error) => {
    console.log("error from axios");
    if (error.response && error.response.status === 403) {
      // Redirect to your desired page
      // Using react-router for navigation in a React application
      sessionStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
