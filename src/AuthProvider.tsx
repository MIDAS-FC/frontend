import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

// AuthContext 타입 정의
interface AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  nickname: string;
  setNickname: (nickname: string) => void;
  email: string;
  setEmail: (email: string) => void;
}

// AuthContext 생성
const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });
  const [nickname, setNickname] = useState<string>(() => {
    return localStorage.getItem("nickName") || "";
  });
  const [email, setEmail] = useState<string>(() => {
    return localStorage.getItem("email") || "";
  });

  useEffect(() => {
    // 로그인 상태와 사용자 정보를 localStorage에 저장
    localStorage.setItem("isLoggedIn", String(isLoggedIn));
    localStorage.setItem("nickName", nickname);
    localStorage.setItem("email", email);
  }, [isLoggedIn, nickname, email]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        nickname,
        setNickname,
        email,
        setEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext) as AuthContextType;
