import styled from "styled-components";

export const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const Header = styled.h1`
  font-family: "Malgun Gothic", sans-serif; /* 맑은 고딕 폰트 */
  font-size: 36px;
  color: #d38b8b;
  margin-bottom: 20px;
  text-align: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Input = styled.input`
  font-family: "Malgun Gothic", sans-serif; /* 맑은 고딕 폰트 */
  font-size: 24px;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

export const TextArea = styled.textarea`
  font-family: "Malgun Gothic", sans-serif; /* 맑은 고딕 폰트 */
  font-size: 18px;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  height: 200px;
  resize: none;
`;

export const FileInput = styled.input`
  margin-bottom: 10px;
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
  justify-content: center;
  margin-top: 20px;
`;
