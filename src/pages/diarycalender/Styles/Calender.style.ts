import { motion } from "framer-motion";
import styled from "styled-components";

export const CalendarWrapper = styled.div`
  border: 1px solid red;
  background-color: rgba(255, 255, 255, 0.1); // 반투명한 배경색
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  color: #fff; // 텍스트 색상 변경
`;

export const Thead = styled.thead`
  background-color: rgba(0, 0, 0, 0.3); // 헤더 배경색 변경
  color: #fff; // 헤더 텍스트 색상 변경
`;

export const Td = styled.td`
  width: 14.28%;
  height: 60px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.2); // 테두리 색상 변경
  transition: background-color 0.3s ease, transform 0.3s ease;
  position: relative;
  color: #fff; // 텍스트 색상 변경

  &:hover {
    background-color: rgba(176, 224, 230, 0.3); // 호버 배경색 변경
  }
`;

// 테이블 헤더 셀 요소
export const Th = styled.th`
  padding: 15px;
  text-align: center;
  font-weight: bold;
  border-bottom: 2px solid #dee2e6;
`;

// 오늘 날짜를 강조하는 요소
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

// 꽃 이미지 컨테이너
export const FlowerContainer = styled.div`
  display: inline-block;
  padding-top: 5px;
  float: right;
`;

// 꽃 이미지 요소
export const Flower = styled.img`
  width: 30px;
  height: 30px;
  position: absolute;
  top: -5px;
  right: 0;
`;

// 팝업 상자
export const PopupBox = styled(motion.div)`
  border: 1px solid red;
  position: absolute;
  top: -50px;
  right: -30px;
  background: rgba(255, 255, 255, 0.9); /* 팝업 배경색 변경 */
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
  width: 150px;
  text-align: center;
  font-size: 14px; /* 폰트 크기 변경 */
  line-height: 1.4;
`;
