import axios from "axios";

// axios 인스턴스 생성
const api = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
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
    console.log("response", response);
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
          console.log("현재 refreshtoken을 불러옴");

          // 토큰 재발급 엔드포인트 호출
          const response = await axios.post(
            "http://localhost:8080/token/reissue",
            {},
            {
              headers: {
                "Authorization-Access": `Bearer ${accessToken}`,
                "Authorization-Refresh": `Bearer ${refreshToken}`,
              },
              withCredentials: true,
            }
          );
          console.log("response", response);
          console.log("api 호출 완료");
          if (response.status === 200) {
            console.log(response.status);

            // 로컬 스토리지에 새 토큰 저장
            console.log(response.headers["authorization-access"]);
            const newAccessToken =
              response.headers["authorization-access"].split(" ")[1];
            const newRefreshToken =
              response.headers["authorization-refresh"].split(" ")[1];

            console.log("newAccessToken을 받아왔습니다.", newAccessToken);
            console.log("newRefreshToken을 받아왔습니다.", newRefreshToken);
            localStorage.setItem("accessToken", newAccessToken);
            localStorage.setItem("refreshToken", newRefreshToken);
            console.log("로컬스토리지에 저장");

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

// // axios 인스턴스 생성
// const api = axios.create({
//   baseURL: "http://localhost:8080",
//   withCredentials: true,
// });

// // 요청 인터셉터 추가
// api.interceptors.request.use(
//   (config) => {
//     // access token이 존재하면 헤더에 추가
//     const accessToken = localStorage.getItem("accessToken");
//     if (accessToken) {
//       config.headers["Authorization-Access"] = `Bearer ${accessToken}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // 응답 인터셉터 추가
// api.interceptors.response.use(
//   (response) => {
//     console.log("response", response);
//     return response;
//   },

//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response) {
//       // 에러 상태가 400이고 에러 코드가 SAT8인 경우 (토큰 만료)
//       if (
//         error.response.status === 400 &&
//         error.response.data.code === "SAT8"
//       ) {
//         try {
//           const accessToken = localStorage.getItem("accessToken");
//           const refreshToken = localStorage.getItem("refreshToken");
//           console.log("현재 refreshtoken을 불러옴");

//           // 토큰 재발급 엔드포인트 호출
//           const response = await axios.post(
//             "http://localhost:8080/token/reissue",
//             {},
//             {
//               headers: {
//                 "Authorization-Access": `Bearer ${accessToken}`,
//                 "Authorization-Refresh": `Bearer ${refreshToken}`,
//               },
//               withCredentials: true,
//             }
//           );
//           console.log("response", response);
//           console.log("api 호출 완료");
//           if (response.status === 200) {
//             console.log(response.status);

//             // 로컬 스토리지에 새 토큰 저장
//             console.log(response.headers["authorization-access"]);
//             const newAccessToken =
//               response.headers["authorization-access"].split(" ")[1];
//             const newRefreshToken =
//               response.headers["authorization-refresh"].split(" ")[1];

//             console.log("newAccessToken을 받아왔습니다.", newAccessToken);
//             console.log("newRefreshToken을 받아왔습니다.", newRefreshToken);
//             localStorage.setItem("accessToken", newAccessToken);
//             localStorage.setItem("refreshToken", newRefreshToken);
//             console.log("로컬스토리지에 저장");

//             // 원래 요청의 헤더를 새 토큰으로 업데이트
//             originalRequest.headers[
//               "Authorization-Access"
//             ] = `Bearer ${newAccessToken}`;
//             console.log("원래 요청의 헤더를 새 토큰으로 업데이트");

//             // 새 토큰으로 원래 요청 재시도
//             return api(originalRequest);
//           }
//         } catch (error) {
//           console.error("토큰 갱신 오류", error);
//         }
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default api;
