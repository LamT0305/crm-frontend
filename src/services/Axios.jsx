import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "https://crm-backend-bz03.onrender.com/api/v1",
  baseURL: "http://localhost:3000/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
