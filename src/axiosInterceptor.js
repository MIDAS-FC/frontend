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
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

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
                "Authorization-Access": accessToken,
                "Authorization-Refresh": refreshToken,
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

<<<<<<< HEAD
export default api;
=======
export default api;
>>>>>>> 264d80643a6d9a2887cbce5cad0184ca5e671a8d
