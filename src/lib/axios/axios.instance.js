import axios from "axios";

// axios instance
const $axios = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
});

// axios request  interceptor
$axios.interceptors.request.use(function (config) {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});
export default $axios;
