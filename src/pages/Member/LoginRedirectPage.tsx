import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthProvider";
import api from "../../axiosInterceptor";

interface QueryParams {
  email: string;
  nickName: string;
  socialId: string;
  accessToken: string;
  refreshToken: string;
}

const LoginRedirectPage = () => {
  const { setIsLoggedIn, setNickname, setEmail, setAccessToken } = useAuth();
  const navigate = useNavigate();
  const [queryParams, setQueryParams] = useState<QueryParams | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const email = params.get("email") || "";
    const nickName = decodeURIComponent(params.get("nickName") || "");
    const socialId = params.get("socialId") || "";
    const accessToken = params.get("accessToken") || "";
    const refreshToken = params.get("refreshToken") || "";

    setQueryParams({ email, nickName, socialId, accessToken, refreshToken });

    console.log("Email:", email);
    console.log("NickName:", nickName);
    console.log("SocialId:", socialId);
    console.log("AccessToken:", accessToken);
    console.log("RefreshToken:", refreshToken);
  }, []);

  useEffect(() => {
    if (!queryParams) return;

    const { email, nickName, socialId, accessToken, refreshToken } =
      queryParams;

    if (accessToken && refreshToken && email && nickName && socialId) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("email", email);
      localStorage.setItem("nickName", nickName);
      localStorage.setItem("socialId", socialId);

      setIsLoggedIn(true);
      setEmail(email);
      setNickname(nickName);
      setAccessToken(accessToken);

      // axios.defaults.headers.common[
      //   "Authorization-Access"
      // ] = `Bearer ${accessToken}`;
      // axios.defaults.headers.common[
      //   "Authorization-Refresh"
      // ] = `Bearer ${refreshToken}`;
      // axios 대신 api 사용
      api.defaults.headers.common[
        "Authorization-Access"
      ] = `Bearer ${accessToken}`;
      api.defaults.headers.common[
        "Authorization-Refresh"
      ] = `Bearer ${refreshToken}`;

      navigate("/");
    } else {
      console.log("로그인에 필요한 정보가 부족합니다.");
      navigate("/login");
    }
  }, [
    queryParams,
    navigate,
    setIsLoggedIn,
    setEmail,
    setNickname,
    setAccessToken,
  ]);

  return <div>로그인 처리 중...</div>;
};

export default LoginRedirectPage;
