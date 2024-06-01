import styled from "styled-components";

export const CalendarWrapper = styled.div`
  width: 100%;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background: linear-gradient(135deg, #f0f9ff, #cfeefb);
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #ffffff;
  border-radius: 10px;
`;

export const Thead = styled.thead`
  background-color: rgb(135, 206, 250, 0.4);
`;

export const Th = styled.th`
  padding: 10px;
  text-align: center;
  color: #ffffff;
  font-weight: bold;
`;

export const Td = styled.td<{ isToday?: boolean }>`
  width: calc(100% / 7);
  padding: 20px;
  text-align: center;
  border: 1px solid #e0e0e0;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: ${(props) =>
      props.isToday ? "rgba(255, 255, 0, 0.8)" : "#f0f0f0"};
  }
`;

export const Today = styled.div`
  background-color: rgba(255, 255, 0, 0.8);
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  font-weight: bold;
  font-size: 1em;
`;
