import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';

// AuthContext 타입 정의
interface AuthContextType {
    isLoggedIn: boolean;
    nickname: string;
    email: string;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
    setNickname: (nickname: string) => void;
    setEmail: (email: string) => void;
}

// 기본값 설정
const AuthContext = createContext<AuthContextType>({
    isLoggedIn: false,
    nickname: '',
    email: '',
    setIsLoggedIn: () => {},
    setNickname: () => {},
    setEmail: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        // 로컬 스토리지에서 토큰과 사용자 정보를 읽어와 상태를 업데이트
        const token = localStorage.getItem('token');
        const storedNickname = localStorage.getItem('nickName');
        const storedEmail = localStorage.getItem('email');

        if (token && storedNickname && storedEmail) {
            setIsLoggedIn(true);
            setNickname(storedNickname);
            setEmail(storedEmail);

            // axios 기본 헤더에 토큰 설정
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, nickname, email, setIsLoggedIn, setNickname, setEmail }}>
            {children}
        </AuthContext.Provider>
    );
};
