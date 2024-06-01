import axios from "axios";
import { useNavigate } from "react-router-dom"; // useNavigate 임포트

const getToken = () => localStorage.getItem("accessToken");
const setToken = (token) => localStorage.setItem("accessToken", token);
const clearToken = () => localStorage.removeItem("accessToken");

const api = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
});

let isRefreshing = false;
let refreshSubscribers = [];

const onRrefreshed = (token) => {
  refreshSubscribers.map((callback) => callback(token));
};

const addRefreshSubscriber = (callback) => {
  refreshSubscribers.push(callback);
};

api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers["Authorization-Access"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { config, response } = error;
    const originalRequest = config;

    if (response && response.status === 401 && !originalRequest._retry) {
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const { data } = await axios.post(
            "http://localhost:8080/token/refresh",
            {
              refreshToken: localStorage.getItem("refreshToken"),
            }
          );

          localStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem("refreshToken", data.refreshToken);

          api.defaults.headers.common[
            "Authorization-Access"
          ] = `Bearer ${data.accessToken}`;
          api.defaults.headers.common[
            "Authorization-Refresh"
          ] = `Bearer ${data.refreshToken}`;

          isRefreshing = false;
          onRrefreshed(data.accessToken);
          refreshSubscribers = [];
        } catch (err) {
          console.error("토큰 재발급 실패:", err);
          localStorage.clear();
          window.location.href = "/login"; // useNavigate 대신 직접 경로 설정
          return Promise.reject(err);
        }
      }

      const retryOriginalRequest = new Promise((resolve) => {
        addRefreshSubscriber((token) => {
          originalRequest.headers["Authorization-Access"] = `Bearer ${token}`;
          resolve(api(originalRequest)); // api 인스턴스 사용
        });
      });

      return retryOriginalRequest;
    }

    return Promise.reject(error);
  }
);

export default api;

// import axios from "axios";

// const getToken = () => localStorage.getItem("accessToken");
// const setToken = (token) => localStorage.setItem("accessToken", token);
// const clearToken = () => localStorage.removeItem("accessToken");

// const api = axios.create({
//   baseURL: "http://localhost:8080",
//   withCredentials: true,
// });

// api.interceptors.request.use(
//   (config) => {
//     const token = getToken();
//     if (token) {
//       config.headers["Authorization-Access"] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// api.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     const { config, response } = error;
//     const originalRequest = config;

//     if (response && response.status === 401 && !originalRequest._retry) {
//       if (!isRefreshing) {
//         isRefreshing = true;
//         try {
//           const { data } = await axios.post(
//             "http://localhost:8080/token/refresh",
//             {
//               refreshToken: localStorage.getItem("refreshToken"),
//             }
//           );

//           localStorage.setItem("accessToken", data.accessToken);
//           localStorage.setItem("refreshToken", data.refreshToken);

//           api.defaults.headers.common[
//             "Authorization-Access"
//           ] = `Bearer ${data.accessToken}`;
//           api.defaults.headers.common[
//             "Authorization-Refresh"
//           ] = `Bearer ${data.refreshToken}`;

//           isRefreshing = false;
//           onRrefreshed(data.accessToken);
//           refreshSubscribers = [];
//         } catch (err) {
//           console.error("토큰 재발급 실패:", err);
//           localStorage.clear();
//           useNavigate().push("/login");
//           return Promise.reject(err);
//         }
//       }

//       const retryOriginalRequest = new Promise((resolve) => {
//         addRefreshSubscriber((token) => {
//           originalRequest.headers["Authorization-Access"] = `Bearer ${token}`;
//           resolve(axios(originalRequest));
//         });
//       });

//       return retryOriginalRequest;
//     }

//     return Promise.reject(error);
//   }
// );

// export default api;

// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     if (
//       error.response &&
//       error.response.status === 401 &&
//       !originalRequest._retry
//     ) {
//       originalRequest._retry = true;
//       try {
//         const response = await axios.post(
//           "http://localhost:8080/auth/token/reissue",
//           {},
//           { withCredentials: true }
//         );
//         const newToken = response.data.accessToken;
//         setToken(newToken);
//         originalRequest.headers["Authorization-Access"] = `Bearer ${newToken}`;
//         return api(originalRequest);
//       } catch (tokenRefreshError) {
//         clearToken();
//         console.error("Token refresh failed:", tokenRefreshError);
//         return Promise.reject(tokenRefreshError);
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// export default api;
