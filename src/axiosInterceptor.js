/////////////////////////////////////////

import axios from "axios";

// axios 인스턴스 생성
const api = axios.create({
  baseURL: "http://localhost:8080",
});

// 요청 인터셉터 추가
api.interceptors.request.use(
  (config) => {
    // access token이 존재하면 헤더에 추가
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization-Access"] = `Bearer ${accessToken}`;
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
      // 에러 상태가 400이고 에러 코드가 SAT8인 경우 (토큰 만료)
      if (
        error.response.status === 400 &&
        error.response.data.code === "SAT8"
      ) {
        try {
          const accessToken = localStorage.getItem("accessToken");
          const refreshToken = localStorage.getItem("refreshToken");

          // 토큰 재발급 엔드포인트 호출
          const response = await axios.post(
            "http://localhost:8080/token/reissue",
            {},
            {
              headers: {
                "Authorization-Access": `Bearer ${accessToken}`,
                "Authorization-Refresh": `Bearer ${refreshToken}`,
              },
            }
          );
          console.log("API 호출완료:   ", response);

          if (response.status === 200) {
            console.log(response.status);

            // 로컬 스토리지에 새 토큰 저장
            console.log(response.headers["authorization-access"]);
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
            console.log("원래 요청의 헤더를 새 토큰으로 업데이트");

            // 새 토큰으로 원래 요청 재시도
            return api(originalRequest);
          }
        } catch (error) {
          console.error("토큰 갱신 오류", error);
        }
      }
    }

    return Promise.reject(error);
  }
);

export default api;

// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "./AuthProvider";

// // API 인스턴스 생성
// export const api = axios.create({
//   baseURL: "http://localhost:8080",
//   headers: {
//     "Authorization-Access": `Bearer ${localStorage.getItem("accessToken")}`,
//   },
// });

// // Refresh Token API 호출 함수
// export async function postRefreshToken() {
//   try {
//     const response = await api.post(
//       "http://localhost:8080/auth/token/reissue",
//       {},
//       {
//         headers: {
//           "Authorization-Access": `Bearer ${localStorage.getItem(
//             "accessToken"
//           )}`,
//           "Authorization-Refresh": `Bearer ${localStorage.getItem(
//             "refreshToken"
//           )}`,
//         },
//       }
//     );

//     if (response.status === 200) {
//       const newAccessToken = response.headers["Authorization-Access"];
//       const newRefreshToken = response.headers["Authorization-Refresh"];
//       // const newAccessToken = response.headers["access-token"];
//       // const newRefreshToken = response.headers["refresh-token"];
//       localStorage.setItem("accessToken", newAccessToken);
//       localStorage.setItem("refreshToken", newRefreshToken);
//       api.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
//       return { newAccessToken, newRefreshToken };
//     }

//     throw new Error("Failed to refresh token");
//   } catch (error) {
//     console.error("Failed to refresh token:", error);
//     throw error;
//   }
// }

// // 인터셉터 설정
// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const navigate = useNavigate();
//     const { setIsLoggedIn } = useAuth();
//     const {
//       config,
//       response: { status },
//     } = error;

//     if (status === 401 && error.response.data.code === "SAT8") {
//       const originRequest = config;

//       try {
//         const { newAccessToken } = await postRefreshToken();
//         originRequest.headers[
//           "Authorization-Access"
//         ] = `Bearer ${newAccessToken}`;
//         return api(originRequest);
//       } catch (refreshError) {
//         alert("Session expired. Please log in again.");
//         setIsLoggedIn(false);
//         // navigate("/login");
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default api;
