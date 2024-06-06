import { motion } from "framer-motion";
import styled, { keyframes } from "styled-components";

const twinkle = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Background = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
    to bottom,
    rgba(0, 4, 40, 0.8),
    rgba(0, 78, 146, 0.8)
  );
  background-size: cover;
  position: relative;
  overflow: hidden;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  background-color: rgba(
    255,
    255,
    255,
    0.9
  ); /* Slightly transparent white background */
  border: 1px solid rgba(219, 219, 219, 0.5); /* Softer border */
  border-radius: 15px; /* More rounded corners */
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2); /* Softer shadow */
  width: 600px;
`;

export const Header = styled.h1`
  font-family: "Arial", sans-serif;
  font-size: 28px;
  color: #262626;
  margin-bottom: 20px;
`;

export const DateDisplay = styled.div`
  font-family: "Arial", sans-serif;
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
  font-family: "Arial", sans-serif;
  font-size: 16px;
  padding: 12px;
  margin-bottom: 15px;
  border: 1px solid rgba(219, 219, 219, 0.5); /* Softer border */
  border-radius: 5px; /* More rounded corners */
  outline: none;
  transition: border-color 0.3s;

  &:focus {
    border-color: #a8a8a8;
  }
`;

export const TextArea = styled.textarea`
  font-family: "Arial", sans-serif;
  font-size: 16px;
  padding: 12px;
  margin-bottom: 15px;
  border: 1px solid rgba(219, 219, 219, 0.5); /* Softer border */
  border-radius: 5px; /* More rounded corners */
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
  font-family: "Arial", sans-serif;
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

// MusicModal

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
  width: 700px; /* 모달 크기를 더 크게 */
  height: 600px;
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

export const AlbumCoverContainer = styled.div`
  position: relative;
  width: 350px;
  height: 350px;
  margin: 30px 0;
`;

export const AlbumCover = styled.img`
  width: 350px; /* 크기를 더 크게 */
  height: 350px; /* 크기를 더 크게 */
  border-radius: 50%; /* Make it circular */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  animation: ${rotate} 10s linear infinite; /* Apply the rotation animation */
`;

export const StylusArm = styled.div`
  position: absolute;
  width: 170px;
  height: 5px;
  background: #000;
  top: 50%;
  left: 0;
  transform: rotate(-10deg);
  transform-origin: 0% 50%;
  &:before {
    content: "";
    position: absolute;
    width: 15px;
    height: 15px;
    background: #000;
    border-radius: 50%;
    top: -5px;
    left: -10px;
  }
`;

export const AudioPlayer = styled.audio`
  width: 100%;
  margin: 20px 0;
`;

export const LikeButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 2.5rem;
  color: #ff4d4d;
`;

export const ModalButton = styled.button`
  position: absolute;
  top: -25px;
  right: -25px;
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

export const ImagePreviewContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

export const ImagePreview = styled.div`
  position: relative;
  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
  }
`;

export const DeleteButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: red;
  color: white;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

// star
export const Star = styled.div`
  width: 4px;
  height: 4px;
  background: #f8f8ff;
  border-radius: 100%;
  position: absolute;
  animation: ${twinkle} 1.5s infinite ease-in-out;
`;
