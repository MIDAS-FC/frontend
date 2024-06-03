import google from "src/assets/icons/social/google.webp";
import kakao from "src/assets/icons/social/kakao.webp";
import naver from "src/assets/icons/social/naver.webp";
import styled, { keyframes } from "styled-components";


const twinkle = keyframes`
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
`;

const gradientBackground = `
    background: linear-gradient(to bottom, rgba(0, 4, 40, 0.8), rgba(0, 78, 146, 0.8));
    background-size: cover;
`;

export const Star = styled.div`
    width: 4px;
    height: 4px;
    background: #f8f8ff;
    border-radius: 100%;
    position: absolute;
    animation: ${twinkle} 1.5s infinite ease-in-out;
`;

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    ${gradientBackground}
    position: relative;
    overflow: hidden;
`;

export const LoginForm = styled.div`
    background: rgba(255, 255, 255, 0.1);
    width: 90%;
    max-width: 400px;
    padding: 45px;
    text-align: center;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    color: #ffffff;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.3);
`;

export const LoginFuncion = styled.form``;

export const LoginInput = styled.input`
    outline: 0;
    width: 100%;
    margin: 0 0 15px;
    padding: 15px;
    box-sizing: border-box;
    font-size: 16px;
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.2);
    color: #ffffff;
    transition: border-color 0.3s;
    &::placeholder {
        color: #e0e0e0;
    }
    &:focus {
        border-color: #82d4f2;
    }
`;

export const LoginBtnGroup = styled.div`
    width:100%;
    background:none;
    border:none;
    margin-bottom:70px;
    padding:0;
    justify-content: space-between;
    display:flex;
`;

export const LoginBtn = styled.button`
    text-transform: uppercase;
    outline: 0;
    background: none;
    width: 45%;
    border: 0;
    padding: 15px 0;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    border-radius: 5px;
    transition: background-color 0.3s ease;
    cursor: pointer;
    &:hover {
        background-color: #6bbcd6;
    }
`;

export const Gray = styled.span`
    color: #fff;
`;

export const Red = styled.span`
    margin: 0 5px;
    color: #82d4f2;
    &:hover {
        text-decoration: underline;
    }
`;

export const SNS = styled.div`
    position: relative;
    top: 25px;
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: center;
`;

export const Kakao = styled.button`
    background-image: url(${kakao});
    background-size:cover;
    width: 34.31px;
    height: 34.31px;
    border-radius: 50%;
    border: none;
    margin: 0 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Naver = styled.button`
    background-image: url(${naver});
    background-size:cover;
    width: 34.31px;
    height: 34.31px;
    border: none;
    border-radius: 50%;
    margin: 0 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Google = styled.button`
    background-image: url(${google});
    background-size:cover;
    width: 34.31px;
    height: 34.31px;
    border: none;
    border-radius: 50%;
    margin: 0 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
`;



// 회원가입
export const JoinPage = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const JoinForm = styled.div`
    background: rgba(255, 255, 255, 0.1);
    width: 90%;
    max-width: 500px;
    padding: 45px;
    text-align: center;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    color: #ffffff;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
`;

export const JoinFunction = styled.form`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    width: 100%;
`;

export const JoinInput = styled.input`
    outline: 0;
    width: 100%;
    padding: 15px;
    box-sizing: border-box;
    font-size: 16px;
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.2);
    color: #ffffff;
    transition: border-color 0.3s;
    &::placeholder {
        color: #e0e0e0;
    }
    &:focus {
        border-color: #82d4f2;
    }
    grid-column: span 2;
`;

export const FullWidthBtn = styled.button`
    text-transform: uppercase;
    outline: 0;
    background: none;
    width: 100%;
    border:none;
    padding: 15px 0;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    border-radius: 5px;
    transition: background-color 0.3s ease;
    cursor: pointer;
    &:hover {
        background-color: #6bbcd6;
    }
    &:disabled {
        background: #ffe2e0;
        cursor: normal;
    }
    grid-column: span 2;
`;

export const FileInput = styled.input`
    margin-bottom: 15px;
    color: #ffffff;
    grid-column: span 2;
`;