// LandingPage css

import { motion } from "framer-motion";
import styled from "styled-components";

export const Layout = styled.div`
  min-width: 1280px;
  height: 350vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Container_top = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;
  margin-top: 200px;
`;

export const Container_mid = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;
  margin-top: 200px;
`;

export const Container_bot = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 100px;
  margin-top: 100px;
`;

export const Banner_main = styled.div`
  width: 600px;
  height: 500px;
  background-color: ${(props) => props.theme.subColor};
  cursor: pointer;
`;

export const Banner_sub = styled.div`
  width: 600px;
  height: 500px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
`;

export const box = styled(motion.div)`
  width: 240px;
  height: 240px;
  margin: 0 auto;
  border-radius: 20px;
  background-color: ${(props) => props.theme.subColor};
`;

export const Banner_text = styled.div`
  width: 500px;
  height: 300px;
  margin-top: 150px;
  h2 {
    font-size: 25px;
    margin-top: 10px;
  }
`;

export const BoxVairnats = {
  hover: {
    scale: 1.15,
  },
  click: {
    backgroundColor: "transparent",
  },
};
