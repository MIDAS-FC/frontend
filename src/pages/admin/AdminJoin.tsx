import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./Styles/Admin.style";
import axios from "axios";

const generateStarPositions = (numStars: number) => {
  return Array.from({ length: numStars }).map(() => ({
    top: Math.random() * 100 + "%",
    left: Math.random() * 100 + "%",
  }));
};

const Stars = () => {
  const [starPositions, setStarPositions] = useState(generateStarPositions(50));

  useEffect(() => {
    setStarPositions(generateStarPositions(50));
  }, []);

  return (
    <>
      {starPositions.map((pos, index) => (
        <S.Star key={index} style={{ top: pos.top, left: pos.left }} />
      ))}
    </>
  );
};

const AdminJoin = () => {
  const [formData, setFormData] = useState({
    password: "",
    email: "",
    adminCode: "",
    role: "ADMIN",
  });

  const { password, email, adminCode } = formData;
  const navigate = useNavigate();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("/auth/admin/register", formData);
      if (response.status === 204) {
        alert("회원가입 성공!");
        navigate("/");
      }
    } catch (error) {
      console.error("에러발생", error);
      alert("admin code를 확인해주세요.");
    }
  };

  return (
    <S.Container>
      <Stars />
      <S.JoinPage>
        <S.JoinForm onSubmit={onSubmit}>
          <div>
            <S.JoinInput
              placeholder="e-mail"
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              required
            />
          </div>
          <div>
            <S.JoinInput
              placeholder="password"
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              required
            />
          </div>
          <div>
            <S.JoinInput
              placeholder="ddmin code"
              type="password"
              name="adminCode"
              value={adminCode}
              onChange={onChange}
              required
            />
          </div>
          <S.JoinBtn type="submit">관리자 회원가입</S.JoinBtn>
        </S.JoinForm>
      </S.JoinPage>
    </S.Container>
  );
};

export default AdminJoin;
