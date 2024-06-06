import styled from "styled-components";

export const CalendarWrapper = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 0 10px 10px 0;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 400px; /* 캘린더의 너비 조정 */
  height: 445px; /* 캘린더의 높이 조정 */
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
  width: 30px; /* 셀 너비 조정 */
  height: 30px; /* 셀 높이 조정 */
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

export const Th = styled.th`
  padding: 10px;
  text-align: center;
  font-weight: bold;
  border-bottom: 2px solid #dee2e6;
`;

export const Today = styled.div`
  background-color: rgba(0, 4, 40, 0.8);
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
  position: relative;
  color: #fff;
`;

export const FlowerContainer = styled.div`
  display: inline-block;
  padding-top: 5px;
  float: right;
`;

export const Flower = styled.img`
  width: 20px;
  height: 20px;
  position: absolute;
  top: -5px;
  right: 0;
`;
