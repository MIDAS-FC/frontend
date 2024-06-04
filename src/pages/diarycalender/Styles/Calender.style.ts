import styled from "styled-components";

export const CalendarWrapper = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  height:450px;
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
  width: 150px;
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
  background-color: rgba(0, 4, 40, 0.8);
  border-radius:50%;
  width: 30px;
  height: 30px;
  display: flex;
  margin:0 auto;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
  position: relative;
  color:#fff;
`;

// 꽃 이미지 컨테이너
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