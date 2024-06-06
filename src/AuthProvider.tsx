import {
  FunctionComponent,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  nickname: string;
  setNickname: (nickname: string) => void;
  email: string;
  setEmail: (email: string) => void;
  accessToken: string;
  setAccessToken: (token: string) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FunctionComponent<AuthProviderProps> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedInState] = useState<boolean>(
    () => localStorage.getItem("isLoggedIn") === "true"
  );
  const [nickname, setNicknameState] = useState<string>(
    () => localStorage.getItem("nickName") || ""
  );
  const [email, setEmailState] = useState<string>(
    () => localStorage.getItem("email") || ""
  );
  const [accessToken, setAccessTokenState] = useState<string>(
    () => localStorage.getItem("accessToken") || ""
  );

  const setIsLoggedIn = (value: boolean) => {
    localStorage.setItem("isLoggedIn", String(value));
    setIsLoggedInState(value);
  };

  const setNickname = (nickname: string) => {
    localStorage.setItem("nickName", nickname);
    setNicknameState(nickname);
  };

  const setEmail = (email: string) => {
    localStorage.setItem("email", email);
    setEmailState(email);
  };

  const setAccessToken = (token: string) => {
    localStorage.setItem("accessToken", token);
    setAccessTokenState(token);
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setAccessToken(token);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        nickname,
        setNickname,
        email,
        setEmail,
        accessToken,
        setAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
