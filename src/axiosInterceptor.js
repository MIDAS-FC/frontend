// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:8080",
// });

// // 요청 인터셉터 설정
// api.interceptors.request.use(
//   (config) => {
//     // auth로 시작하지 않는 엔드포인트에 대해서만 Authorization-Access 헤더 추가
//     if (!config.url.startsWith("/auth")) {
//       const token = localStorage.getItem("accessToken");
//       if (token) {
//         config.headers["Authorization-Access"] = `Bearer ${token}`;
//       }
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // 응답 인터셉터 설정
// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       try {
//         const refreshToken = localStorage.getItem("refreshToken");
//         const response = await api.post("/auth/token/reissue", null, {
//           headers: { "Refresh-Token": `Bearer ${refreshToken}` },
//         });

//         const newAccessToken = response.headers["access-token"];
//         const newRefreshToken = response.headers["refresh-token"];

//         // localStorage에 토큰 업데이트
//         localStorage.setItem("accessToken", newAccessToken);
//         localStorage.setItem("refreshToken", newRefreshToken);

//         // Authorization-Access 헤더 업데이트
//         api.defaults.headers.common[
//           "Authorization-Access"
//         ] = `Bearer ${newAccessToken}`;

//         // 새로운 토큰으로 원래 요청 재시도
//         originalRequest.headers[
//           "Authorization-Access"
//         ] = `Bearer ${newAccessToken}`;
//         return api(originalRequest);
//       } catch (reissueError) {
//         console.error("토큰 재발급 실패:", reissueError);
//         // 토큰 재발급 실패 시 로그아웃 처리
//         localStorage.removeItem("accessToken");
//         localStorage.removeItem("refreshToken");
//         window.location.href = "/login"; // 로그인 페이지로 리다이렉트
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// export default api;

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

// 요청 인터셉터 설정
api.interceptors.request.use(
  (config) => {
    // auth로 시작하지 않는 엔드포인트에 대해서만 Authorization 헤더 추가
    if (!config.url.startsWith("/auth")) {
      const token = localStorage.getItem("accessToken");
      if (token) {
        config.headers["Authorization-Access"] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 설정
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (!error.response) {
      // 네트워크 오류
      console.error("Network Error:", error);
      alert("Network Error 발생. 서버와 연결할 수 없습니다.");
      return Promise.reject(error);
    }

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
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
          "Authorization-Access"
        ] = `Bearer ${newAccessToken}`;

        // 새로운 토큰으로 원래 요청 재시도
        originalRequest.headers[
          "Authorization-Access"
        ] = `Bearer ${newAccessToken}`;
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
