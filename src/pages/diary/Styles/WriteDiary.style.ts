import { motion } from 'framer-motion';
import styled, { keyframes } from 'styled-components';

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

export const FormGroup = styled.div`
  margin-bottom: 20px;
`;

export const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
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



//MusicModal
export const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8); /* 배경화면을 어둡고 투명하게 변경 */
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContainer = styled.div`
  background: #222;
  border-radius: 20px;
  padding: 40px;
  width: 90%;
  max-width: 600px; /* 모달 크기를 더 크게 */
  z-index: 1000;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  color: #fff;
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 100%;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 2rem;
  color: #fff;
  cursor: pointer;
`;

export const TrackInfo = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

export const TrackName = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const Artists = styled.div`
  font-size: 1.2rem;
  color: #aaa;
  margin-bottom: 10px;
`;

export const AlbumName = styled.div`
  font-size: 1rem;
  color: #bbb;
  margin-bottom: 20px;
`;

export const AlbumCover = styled.img`
  width: 200px; /* 크기를 더 크게 */
  height: 200px; /* 크기를 더 크게 */
  border-radius: 20px;
  margin: 20px 0;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
`;

export const AudioPlayer = styled.audio`
  width: 100%;
  margin: 20px 0;
`;

export const LikeButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 2rem;
  color: #ff4d4d;
`;

export const ModalButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

export const Notification = styled(motion.div)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  z-index: 1000;
`;

export const ErrorMessage = styled.p`
  color: #ff4d4d;
  font-size: 1.2rem;
`;

export const LoadingMessage = styled.p`
  color: #fff;
  font-size: 1.2rem;
`;