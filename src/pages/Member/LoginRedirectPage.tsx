import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthProvider';

const LoginRedirectPage = () => {
  const { setIsLoggedIn, setNickname, setEmail } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const email = params.get('email') || '';
    const nickName = params.get('nickName') || '';
    const socialId = params.get('socialId') || '';

    console.log("Email:", email);
    console.log("NickName:", nickName);
    console.log("SocialId:", socialId);

    // 세션 스토리지에서 토큰 가져오기
    const accessToken = sessionStorage.getItem('accessToken');
    const refreshToken = sessionStorage.getItem('refreshToken');

    if (accessToken && refreshToken) {
      localStorage.setItem('token', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('email', email);
      localStorage.setItem('nickName', nickName);

      setIsLoggedIn(true);
      setEmail(email);
      setNickname(nickName);

      // Axios 기본 헤더에 토큰 설정
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

      navigate('/');
    } else {
      console.log("로그인에 필요한 정보가 부족합니다.");
      navigate('/login');
    }
  }, [navigate, setIsLoggedIn, setEmail, setNickname]);

  return <div>로그인 처리 중...</div>;
};

export default LoginRedirectPage;
