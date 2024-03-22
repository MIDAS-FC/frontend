//MyPage의 modal css

import { motion } from "framer-motion";
import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 600px;
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
`;

export const Button = styled(motion.button)`
  width: 100px;
  border: none;
  border-radius: 5px;
  background-color: lightgray;
  box-shadow: 1px 1px 0.5px rgba(0, 0, 0, 0.1);
`;

export const Errorbox = styled(motion.div)`
  width: 200px;
  height: 40px;
  background-color: khaki;
  border-radius: 10px;
  padding: 2px;
`;

export const ErrorVariants = {
  hover: { scale: 1.05 },
};
