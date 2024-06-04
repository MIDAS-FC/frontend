import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

export const CalendarWrapper = styled.div`
  width: 90%;
  max-width: 800px;
  margin: auto;
  padding: 20px;
  border-radius: 12px;
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  }
`;

export const Table = styled.table`
  width: 100%;
  border-spacing: 0;
  border-collapse: collapse;
  @media (max-width: 600px) {
    height: 40px;
  }
`;

export const Thead = styled.thead`
  background-color: #87ceeb;
  color: #fff;
`;

export const Th = styled.th`
  padding: 15px;
  text-align: center;
  font-weight: bold;
  border-bottom: 2px solid #dee2e6;
`;

export const Td = styled.td`
  width: 14.28%;
  height: 60px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  border: 1px solid #dee2e6;
  transition: background-color 0.3s ease, transform 0.3s ease;
  position: relative;
  &:hover {
    background-color: #b0e0e6;
    transform: scale(1.2);
  }
`;

export const Today = styled.div`
  background-color: rgba(255, 255, 204, 0.8);
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  font-weight: bold;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  position: relative;
`;

export const FlowerContainer = styled.div`
  display: inline-block;
  padding-top: 5px;
  float: right;
`;

export const Flower = styled.img`
  width: 30px;
  height: 30px;
  position: absolute;
  top: -5px;
  right: 0;
`;
