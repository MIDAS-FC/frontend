// MyPage css
import { motion } from "framer-motion";
import styled from "styled-components";

export const Layout = styled.div`
  min-width: 1280px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 120vh;
  padding: 50px;
`;

export const Section_top = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 100px;
`;

export const Section_top_left = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 30%; /* 변경: 좌측 컨테이너 크기 조정 */
`;

export const Section_top_right = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  width: 65%; /* 변경: 우측 컨테이너 크기 조정 */
`;

export const ImageBox = styled.div`
  border-radius: 50%;
  background-color: lightgray;
  width: 150px;
  height: 150px;
  overflow: hidden;
`;

export const Item_follow = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
`;

export const Item_nation = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
`;

export const Button = styled(motion.button)`
  width: 120px;
  border: none;
  border-radius: 5px;
  background-color: lightgray;
  box-shadow: 1px 1px 0.5px rgba(0, 0, 0, 0.1);
`;

export const Hr = styled.hr`
  width: 100%;
  border: none;
  height: 1px;
  background-color: lightgray;
  margin: 10px 0;
`;

export const ProgressBar = styled.progress`
  width: 120px;
  height: 14px;
  border: none;
  border-radius: 5px;
  overflow: hidden;

  &::-webkit-progress-bar {
    background-color: lightgray;
    border-radius: 5px;
  }

  &::-webkit-progress-value {
    background-color: lightgreen; /* 변경: 초록색으로 설정 */
    border-radius: 5px;
  }
`;

export const Board = styled.div`
  width: 100%;
  width: 600px;
  height: 200px;
  border-radius: 5px;
  background-color: whitesmoke;
`;

export const ButtonVariants = {
  hover: {
    boxShadow: "3px 3px 1.5px rgba(0, 0, 0, 0.2)",
  },
  click: {
    background: "transparent",
  },
};
