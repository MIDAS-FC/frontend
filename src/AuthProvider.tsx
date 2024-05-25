import { ReactNode, createContext, useContext, useState } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  nickname: string;
  setNickname: (nickname: string) => void;
  email: string;
  setEmail: (email: string) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoggedIn, setIsLoggedInState] = useState<boolean>(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });
  const [nickname, setNicknameState] = useState<string>(() => {
    return localStorage.getItem("nickName") || "";
  });
  const [email, setEmailState] = useState<string>(() => {
    return localStorage.getItem("email") || "";
  });

  const setIsLoggedIn = (value: boolean) => {
    setIsLoggedInState(value);
    localStorage.setItem("isLoggedIn", String(value));
  };

  const setNickname = (value: string) => {
    setNicknameState(value);
    localStorage.setItem("nickName", value);
  };

  const setEmail = (value: string) => {
    setEmailState(value);
    localStorage.setItem("email", value);
  };

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
