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

const JoinForm = styled.div`
    background: #FFFFFF;
    width: 30%;
    margin: 100px auto 0 auto;
    padding: 45px;
    text-align: center;
    box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.1);
`;

const JoinFunction = styled.form``;

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
    background: #FF8379;
    width: 100%;
    border: 0;
    padding: 15px;
    margin-bottom: 30px;
    color: #FFFFFF;
    font-size: 14px;
    -webkit-transition: all 0.3 ease;
    transition: all 0.3 ease;
    cursor: pointer;

    &:disabled {
        background: #FFE2E0;
        cursor: normal;
    }
`;


const Join = () => {
    const [email, setEmail] = useState("");
    const [nickName, setNickName] = useState("");
    const [password, setPassword] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [verificationCode, setVerificationCode] = useState("");
    const [randomNum, setRandomNum] = useState("");
    const [isVerified, setIsVerified] = useState(false);


    // 이메일 인증번호 보내기
    const sendEmail = async () => {
        try{
            const response = await axios.post('/send-email', { email, emailType: "someType", socialType: "someSocialType" });
            setRandomNum(response.data.randomNum);
            alert('인증번호가 전송되었습니다.');
            setIsVerified(true);
        }catch (error){
            console.error('인증번호 전송 오류:', error);
        }
    };
    

    // 인증
    const verifyEmail = async () => {
        try{
        const response = await axios.post('/verify-email', {
            email,
            socialType: "someSocialType",
            randomNum,
            inputNum: verificationCode,
            sendTime: new Date(),
            expireTime: new Date(new Date().getTime() + 30*1000) //인증번호 유효시간 30초
        });
            alert("인증 성공!");
            setIsVerified(true);
        } catch(error){
            alert("인증 실패. 다시 시도해 주세요.");
        }
    };
    

    // 이메일 재전송
    const resendEmail = async () => {
        const response = await axios.post('/resend-email', { email });
    };

    
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFile(event.target.files[0]);
        }
    };

    // 회원가입
    const register = async () => {
        const formData = new FormData();
        formData.append('file', file || "");
        
        const userRequestDto = {
            email,
            nickName,
            password,
        };
        
        const userRequestDtoBlob = new Blob([JSON.stringify(userRequestDto)], { type: 'application/json' });
        
        formData.append('userRequestDto', userRequestDtoBlob);
        
        try {
            const response = await axios.post('/signup', formData);
        
            console.log(response.data);
        } catch (error) {
            console.error('Error during registration:', error);
        }
        
        console.log('Registered with the following data:');
        console.log('email:', email);
        console.log('NickName:', nickName);
        console.log('Password:', password);
        
    };
    
    
    

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await register();
    };

    return (
        <Container>
            <JoinPage>
                <JoinForm>
                    <JoinInput disabled={isVerified} name="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <JoinBtn type="button" onClick={sendEmail} disabled={isVerified}>
                        인증번호 전송
                    </JoinBtn>
                    <JoinInput name="verificationCode" placeholder="Verification Code" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} />
                    <JoinBtn type="button" onClick={verifyEmail}>
                        인증하기
                    </JoinBtn>
                    <JoinBtn type="button" onClick={resendEmail}>
                        이메일 재전송
                    </JoinBtn>
                    <JoinFunction onSubmit={handleSubmit}>
                        <JoinInput name="nickName" placeholder="nickname" value={nickName} onChange={(e) => setNickName(e.target.value)} />
                        <JoinInput name="password" type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <input type="file" name="file" onChange={handleFileChange} />
                        <JoinBtn type="submit">Sign up</JoinBtn>
                    </JoinFunction>
                </JoinForm>
            </JoinPage>
        </Container>
    );
};

export default Join;
