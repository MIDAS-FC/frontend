// refresh token 관련

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const response = await api.post("/auth/token/reissue", null, {
          headers: { "Refresh-Token": `Bearer ${refreshToken}` },
        });

        const newAccessToken = response.headers["access-token"];
        const newRefreshToken = response.headers["refresh-token"];

        // localStorage에 토큰 업데이트
        localStorage.setItem("accessToken", newAccessToken);
        localStorage.setItem("refreshToken", newRefreshToken);

        // Authorization 헤더 업데이트
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newAccessToken}`;

        // 새로운 토큰으로 원래 요청 재시도
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (reissueError) {
        console.error("토큰 재발급 실패:", reissueError);
        // 토큰 재발급 실패 시 로그아웃 처리
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login"; // 로그인 페이지로 리다이렉트
      }
    }
    return Promise.reject(error);
  }
);

export default api;
