// NavBar css

import { motion } from "framer-motion";
import styled from "styled-components";

export const Layout = styled(motion.div)`
  position: fixed;
  height: 70px;
  width: 100%;
  min-width: 1280px;
  z-index: 10;
  background-color: transparent;
`;

export const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const Logo = styled(motion.div)`
  position: absolute;
  top: 10px;
  left: 10px;
  width: 120px;
  height: 50px;
  transform-origin: center left;
  background-color: pink;
  cursor: pointer;
`;

export const Items = styled.div`
  position: absolute;
  top: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;
`;

export const Item = styled(motion.h2)`
  font-weight: bold;
  cursor: pointer;
`;

export const Buttons = styled.div`
  position: absolute;
  top: 20px;
  right: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

export const Button = styled(motion.button)`
  width: 80px;
  height: 30px;
  border: none;
  border-radius: 30px;
  cursor: pointer;
`;

// header의 item 클릭할 때마다 원이 이동
export const Circle = styled(motion.span)`
  position: absolute;
  width: 5px;
  height: 5px;
  bottom: -5px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: pink;
  border-radius: 50px;
`;

export const HeaderVariants = {
  up: { backgroundColor: "rgba(0,0,0,0)" },
  scroll: { backgroundColor: "lightgray" },
};

export const LogoVairnats = {
  hover: {
    scaleX: 1.2,
  },
  click: {
    backgroundColor: "transparent",
  },
};

export const ButtonVariants = {
  hover: {
    boxShadow: "3px 3px 1.5px rgba(0, 0, 0, 0.2)",
  },
  click: {
    background: "transparent",
  },
};

export const LinkVariants = {
  hover: { scale: 1.1 },
  click: {
    color: "transparent",
  },
};
