import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");

    // Check if the request URL includes "/auth" and prevent adding auth header
    if (accessToken && !config.url.startsWith("/auth")) {
      config.headers["Authorization-Access"] = `${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
          throw new Error("No refresh token available");
        }

        const response = await api.post("/auth/token/reissue", null, {
          headers: { "Refresh-Token": `${refreshToken}` },
        });

        const newAccessToken = response.headers["access-token"];
        const newRefreshToken = response.headers["refresh-token"];

        if (newAccessToken && newRefreshToken) {
          localStorage.setItem("accessToken", newAccessToken);
          localStorage.setItem("refreshToken", newRefreshToken);

          // Update default headers for future requests
          api.defaults.headers.common[
            "Authorization-Access"
          ] = `${newAccessToken}`;

          // Update the original request's headers for the retry
          originalRequest.headers["Authorization-Access"] = `${newAccessToken}`;

          return api(originalRequest);
        } else {
          throw new Error("Failed to refresh tokens");
        }
      } catch (reissueError) {
        console.error("토큰 재발급 실패:", reissueError);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      }
    }
    return Promise.reject(error);
  }
);

export default api;
