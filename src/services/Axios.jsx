import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://auth.leadmastercrm.pro/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
