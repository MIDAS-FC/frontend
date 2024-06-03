import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #dbdbdb;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 20px auto;
`;

export const Header = styled.h1`
  font-family: 'Arial', sans-serif;
  font-size: 24px;
  color: #262626;
  margin-bottom: 20px;
`;

export const DateDisplay = styled.div`
  font-family: 'Arial', sans-serif;
  font-size: 14px;
  color: #8e8e8e;
  margin-bottom: 20px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Input = styled.input`
  font-family: 'Arial', sans-serif;
  font-size: 16px;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #dbdbdb;
  border-radius: 3px;
  outline: none;
  transition: border-color 0.3s;

  &:focus {
    border-color: #a8a8a8;
  }
`;

export const TextArea = styled.textarea`
  font-family: 'Arial', sans-serif;
  font-size: 16px;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #dbdbdb;
  border-radius: 3px;
  height: 200px;
  resize: none;
  outline: none;
  transition: border-color 0.3s;

  &:focus {
    border-color: #a8a8a8;
  }
`;

export const FileInput = styled.input`
  margin-bottom: 15px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const Button = styled.button`
  background-color: #0095f6;
  color: #fff;
  font-family: 'Arial', sans-serif;
  font-size: 14px;
  padding: 10px 20px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #007bb5;
  }
`;


export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  text-align: center;
  position: relative;
`;

export const ModalContent = styled.div`
  max-height: 80vh;
  overflow-y: auto;
`;

export const ModalButton = styled.button`
  margin: 10px;
  padding: 10px 20px;
  background: #007BFF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: #0056b3;
  }
`;

export const LikeButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;

  svg {
    width: 24px;
    height: 24px;
    transition: fill 0.3s;

    &:hover {
      fill: red;
    }
  }
`;