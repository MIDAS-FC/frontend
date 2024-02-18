import { motion } from "framer-motion";
import styled from "styled-components";

export const Layout = styled.div`
  position: relative;
  /* min-width: 1280px; */
  height: 120vh;
  top: 120px;
`;

export const Container_top = styled.div`
  width: 100%;
`;

export const Container_top_left = styled.div`
  position: absolute;
  top: 10px;
  width: 380px;
  height: 420px;
  left: 220px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  background-color: whitesmoke;
  border-radius: 4px;
`;

export const Container_top_right = styled.div`
  position: absolute;
  top: 10px;
  left: 720px;
  width: 550px;
  height: 400px;
  padding-top: 10px;
  padding-left: 50px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  background-color: whitesmoke;
  border-radius: 4px;
`;

export const Container_mid = styled.div`
  position: absolute;
  top: 500px;
  left: 220px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const ImageBox = styled.div`
  border-radius: 100px;
  background-color: ivory;
`;

export const Info_name = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
`;

export const Info_follow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

export const Info_nation = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 15px;
`;

export const Info_Level = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;
`;

export const Button = styled(motion.button)`
  width: 100px;
  border-radius: 5px;
  background-color: lightgray;
  box-shadow: 1px 1px 0.5px rgba(0, 0, 0, 0.1);
`;

export const Hr = styled.hr`
  width: 300px;
  border: 0.5px solid lightgray;
  text-align: left;
  margin-left: 0;
  margin-top: 0;
`;

export const ProgressBar = styled.progress`
  width: 120px;
  height: 14px;
`;

export const Board = styled.div`
  width: 1050px;
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
