import { motion } from "framer-motion";
import styled from "styled-components";

export const Layout = styled(motion.div)`
  position: relative;
  width: 100%;
  min-width: 1280px;
  // 항상 화면 밑에 고정
  height: auto;
  min-height: 100%;
  padding-bottom: 200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: whitesmoke;
`;

export const Container_left = styled.div`
  position: relative;
  height: auto;
`;

export const Container_right = styled.div`
  position: absolute;
  top: 80px;
  right: 100px;
  height: auto;
`;

export const Items_top = styled.div`
  position: absolute;
  top: 20px;
  left: 140px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
`;

export const Items_mid = styled.div`
  position: absolute;
  top: 100px;
  left: 140px;
  display: flex;
`;

export const Items_bot_1 = styled.div`
  position: absolute;
  top: 140px;
  left: 140px;
  width: 600px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const Items_bot_2 = styled.div`
  position: absolute;
  top: 120px;
  left: 470px;
  width: 300px;
`;

export const Item = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 100px;
  background-color: ivory;
`;
