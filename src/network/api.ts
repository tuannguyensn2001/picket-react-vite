import axios from "axios";
import config from "~/config";

const API = axios.create({
  baseURL: config.backend,
});
// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
// API.defaults.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;

API.interceptors.request.use(
  (config) => {
    if (config.headers) {
      const token = localStorage.getItem("token");
      if (token) {
        // @ts-ignore
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }
    return config;
  },
  async (err) => {
    return await Promise.reject(err);
  }
);

export default API;
