import styled, { keyframes } from "styled-components";

const twinkle = keyframes`
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
`;

export const Star = styled.div`
    width: 4px;
    height: 4px;
    background: #f8f8ff;
    border-radius: 100%;
    position: absolute;
    animation: ${twinkle} 1.5s infinite ease-in-out;
`;


const gradientBackground = `
    background: linear-gradient(to bottom, rgba(0, 4, 40, 0.8), rgba(0, 78, 146, 0.8));
    background-size: cover;
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

export const JoinPage = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const JoinForm = styled.form`
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

export const JoinInput = styled.input`
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

export const JoinBtn = styled.button`
    text-transform: uppercase;
    outline: 0;
    background: none;
    width: 100%;
    border: none;
    padding: 15px 0;
    margin-top:20px;
    margin-bottom: 5px;
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
`;