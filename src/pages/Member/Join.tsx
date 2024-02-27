import axios from 'axios';
import { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    position: relative;
    height: 120vh;
    top: 100px;
`;

const JoinPage = styled.div`
    width: 100%;
    height: 100%;
    background: #FFB8B3;
    overflow: auto;
`;

const JoinForm = styled.form`
    background: #FFFFFF;
    width: 30%;
    margin:100px auto 0 auto;
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
  border-top:none;
  border-right:none;
  border-left:none;
  border-bottom:1px solid #ccc;
`
const JoinBtn = styled.button`
  text-transform: uppercase;
  outline: 0;
  background: #FF8379;
  width: 100%;
  border: 0;
  padding: 15px;
  margin-bottom:30px;
  color: #FFFFFF;
  font-size: 14px;
  -webkit-transition: all 0.3 ease;
  transition: all 0.3 ease;
  cursor: pointer;
`


const Join = () => {
  const [email, setEmail] = useState("");
  const [nickName, setNickName] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLFormElement>) =>{
    setFile(event.target.files[0]);
  }

  const register = async() => {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('nickName', nickName);
    formData.append('password', password);
    if(file){
      formData.append('file', file);
    }

    const response = await axios.post('/signup', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) =>{
    event.preventDefault();
    const data = await register();
    console.log(data);
  }
  
  return (
    <Container>
      <JoinPage>
        <JoinForm onSubmit={handleSubmit}>
          <JoinInput name="email" placeholder="username" value={email} onChange={e => setEmail(e.target.value)}></JoinInput>
          <JoinInput name="nickName" placeholder="nickname" value={nickName} onChange={e => setNickName(e.target.value)}></JoinInput>
          <JoinInput name="password" type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)}></JoinInput>
          <JoinBtn type="submit">Sign up</JoinBtn>
        </JoinForm>
      </JoinPage>
    </Container>
  );
};

export default Join;
