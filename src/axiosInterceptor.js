import axios from "axios";

const getToken = () => localStorage.getItem("token");
const setToken = (token) => localStorage.setItem("token", token);
const clearToken = () => localStorage.removeItem("token");

const api = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers["authorization-access"] = `${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const response = await axios.post(
          "http://localhost:8080/auth/token/reissue",
          {},
          { withCredentials: true }
        );
        const newToken = response.data.token;
        setToken(newToken);
        originalRequest.headers["Authorization-Access"] = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (tokenRefreshError) {
        clearToken();
        console.error("Token refresh failed:", tokenRefreshError);
        return Promise.reject(tokenRefreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
