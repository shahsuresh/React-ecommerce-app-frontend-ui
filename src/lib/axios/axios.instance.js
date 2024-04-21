import axios from "axios";

// axios instance
const $axios = axios.create({
  baseURL: "http://localhost:5000",
  timeout: 5000,
});

export default $axios;
