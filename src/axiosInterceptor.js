// import axios from "axios";

// // Axios 인스턴스 생성
// const api = axios.create({
//   baseURL: "http://localhost:8080", // API 서버의 baseURL 설정
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // 응답 인터셉터 추가
// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     console.log(
//       "오류 status, code:",
//       error.response.status,
//       error.response.data.code
//     );

//     // 토큰 만료 시 처리
//     if (error.response.data.code === "SAT8" && !originalRequest._retry) {
//       // if (error.response.status === 401 && !originalRequest._retry) {
//       // if (error.response.status === 400 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       const accessToken = localStorage.getItem("accessToken");
//       const refreshToken = localStorage.getItem("refreshToken");
//       console.log("access: ", accessToken);
//       console.log("refresh: ", refreshToken);

//       // 토큰 값이 제대로 불러와졌는지 확인
//       if (!accessToken || !refreshToken) {
//         console.error("토큰 값이 없습니다.");
//         // 필요한 경우 로그인 페이지로 리디렉션
//         // window.location.href = "/login";
//         return Promise.reject(error);
//       }

//       try {
//         // 토큰 재발급 요청
//         const response = await axios.post(
//           "http://localhost:8080/token/reissue",
//           {},
//           {
//             headers: {
//               "Content-Type": "application/json",
//               "Authorization-Access": `Bearer ${accessToken}`,
//               "Authorization-Refresh": `Bearer ${refreshToken}`,
//             },
//           }
//         );

//         console.log("토큰 받아오기 성공");
//         // 응답 헤더에서 새로운 액세스 토큰과 리프레시 토큰 추출
//         const newAccessToken =
//           response.headers["authorization-access"].split(" ")[1];
//         const newRefreshToken =
//           response.headers["authorization-refresh"].split(" ")[1];

//         // 새로운 토큰 저장
//         localStorage.setItem("accessToken", newAccessToken);
//         localStorage.setItem("refreshToken", newRefreshToken);

//         originalRequest.headers[
//           "authorization-access"
//         ] = `Bearer ${newAccessToken}`;
//         originalRequest.headers[
//           "authorization-refresh"
//         ] = `Bearer ${newRefreshToken}`;

//         // 원래 요청 재시도
//         return api(originalRequest);
//       } catch (tokenError) {
//         console.error("토큰 재발급 실패:", tokenError);
//         // window.location.href = "/login"; // 로그인 페이지로 리디렉션
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// // 요청 인터셉터 추가
// api.interceptors.request.use(
//   (config) => {
//     const accessToken = localStorage.getItem("accessToken");
//     const refreshToken = localStorage.getItem("refreshToken");
//     if (accessToken) {
//       config.headers["authorization-access"] = `Bearer ${accessToken}`;
//     }
//     if (refreshToken) {
//       config.headers["authorization-refresh"] = `Bearer ${refreshToken}`;
//     }

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// export default api;

import axios from "axios";

// axios 인스턴스 생성
const api = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true, // 추가: 쿠키를 포함하여 요청
});

// 요청 인터셉터 추가
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    if (accessToken && refreshToken) {
      config.headers["Authorization-Access"] = `Bearer ${accessToken}`;
      config.headers["Authorization-Refresh"] = `Bearer ${refreshToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 추가
api.interceptors.response.use(
  (response) => {
    return response;
  },

  async (error) => {
    const originalRequest = error.config;
    if (error.response) {
      // 에러 상태가 401이고 에러 코드가 SAT8인 경우 (토큰 만료)
      if (
        error.response.status === 401 &&
        error.response.data.code === "SAT8"
      ) {
        try {
          // 토큰 재발급 엔드포인트 호출
          const response = await axios.post(
            "http://localhost:8080/token/reissue",
            {},
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (response.status === 200) {
            console.log(response.status);

            const newAccessToken =
              response.headers["authorization-access"].split(" ")[1];
            const newRefreshToken =
              response.headers["authorization-refresh"].split(" ")[1];

            localStorage.setItem("accessToken", newAccessToken);
            localStorage.setItem("refreshToken", newRefreshToken);

            // 원래 요청의 헤더를 새 토큰으로 업데이트
            originalRequest.headers[
              "Authorization-Access"
            ] = `Bearer ${newAccessToken}`;
            originalRequest.headers[
              "Authorization-Refresh"
            ] = `Bearer ${newRefreshToken}`;
            console.log("원래 요청의 헤더를 새 토큰으로 업데이트");

            // 새 토큰으로 원래 요청 재시도
            return api(originalRequest);
          }
        } catch (error) {
          console.error("토큰 갱신 오류", error);
          // 인증 오류가 발생하면 로그아웃 처리
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          window.location.href = "/login";
        }
      }
    }

    return Promise.reject(error);
  }
);

export default api;
