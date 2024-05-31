import axios from 'axios';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

axios.defaults.baseURL = "/auth";

const AdminJoin = () => {
  const [formData, setFormData] = useState({
    username: '관리자',
    password: '',
    email: '',
    adminCode: '',
  });

  const { username, password, email, adminCode } = formData;
  const navigate = useNavigate();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('/admin/register', formData);
      if (response.status === 204) {
        alert('회원가입 성공!');
        navigate("/");
      }
    } catch (error) {
      console.error('에러발생', error);
      alert('admin code를 확인해주세요.');
    }
  };

  return (
    <Container>
      <JoinPage>
        <JoinForm onSubmit={onSubmit}>
          <div>
            <label>Email</label>
            <JoinInput type="email" name="email" value={email} onChange={onChange} required />
          </div>
          <div>
            <label>Password</label>
            <JoinInput type="password" name="password" value={password} onChange={onChange} required />
          </div>
          <div>
            <label>Admin Code</label>
            <JoinInput type="text" name="adminCode" value={adminCode} onChange={onChange} required />
          </div>
          <JoinBtn type="submit">Register</JoinBtn>
        </JoinForm>
      </JoinPage>
    </Container>
  );
};

export default AdminJoin;

const Container = styled.div`
  position: relative;
  height: 120vh;
  top: 100px;
`;

const JoinPage = styled.div`
  width: 100%;
  height: 100%;
  background: #ffb8b3;
  overflow: auto;
`;

const JoinForm = styled.form`
  background: #ffffff;
  width: 30%;
  margin: 100px auto 0 auto;
  padding: 45px;
  text-align: center;
  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.1);
`;

const JoinInput = styled.input`
  outline: 0;
  width: 100%;
  margin: 0 0 15px;
  padding: 15px 0;
  box-sizing: border-box;
  font-size: 14px;
  border-top: none;
  border-right: none;
  border-left: none;
  border-bottom: 1px solid #ccc;
`;

const JoinBtn = styled.button`
  text-transform: uppercase;
  outline: 0;
  background: #ff8379;
  width: 100%;
  border: 0;
  padding: 15px;
  margin-bottom: 30px;
  color: #ffffff;
  font-size: 14px;
  transition: all 0.3s ease;
  cursor: pointer;

  &:disabled {
    background: #ffe2e0;
    cursor: normal;
  }
`;
