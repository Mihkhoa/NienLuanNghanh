import axios from "axios";
import queryString from "query-string";

const axiosClient = axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});
axiosClient.interceptors.request.use(async (config) => {
  // Handle token here ...
  return config;
});
axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
        return response.data;
      }
      return response.data;
    }
    return response.data;
  },
  (error) => {
    // Handle errors
    throw error;
  },
);

export default axiosClient;
