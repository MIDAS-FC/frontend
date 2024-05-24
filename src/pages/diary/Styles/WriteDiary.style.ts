import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #fde4e4; /* 따뜻한 배경 색상 */
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 50px auto;
  text-align: center;
`;

export const Header = styled.h1`
  font-family: "Malgun Gothic", sans-serif; /* 맑은 고딕 폰트 */
  font-size: 36px;
  color: #d38b8b;
  margin-bottom: 20px;
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Input = styled.input`
  font-family: "Malgun Gothic", sans-serif; /* 맑은 고딕 폰트 */
  font-size: 24px;
  padding: 10px;
  margin-bottom: 10px;
  border: 2px solid #d38b8b;
  border-radius: 10px;
  outline: none;
  background-color: rgba(255, 255, 255, 0.8);
  transition: background-color 0.3s ease;

  &:focus {
    background-color: rgba(255, 255, 255, 1);
  }
`;

export const TextArea = styled.textarea`
  font-family: "Malgun Gothic", sans-serif; /* 맑은 고딕 폰트 */
  font-size: 18px;
  padding: 10px;
  height: 200px;
  margin-bottom: 10px;
  border: 2px solid #d38b8b;
  border-radius: 10px;
  outline: none;
  background-color: rgba(255, 255, 255, 0.8);
  resize: none;
  transition: background-color 0.3s ease;

  &:focus {
    background-color: rgba(255, 255, 255, 1);
  }
`;

export const ImageContainer = styled.div`
  margin: 20px 0;
`;

export const BackgroundImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px;
`;

export const Button = styled.button`
  font-family: "Malgun Gothic", sans-serif; /* 맑은 고딕 폰트 */
  font-size: 24px;
  padding: 10px 20px;
  background-color: #d38b8b;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: #bf7171;
    transform: scale(1.05);
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;
