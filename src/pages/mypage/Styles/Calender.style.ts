import styled from "styled-components";

export const CalendarWrapper = styled.div`
  width: 100%;
  background-size: cover;
  border-collapse: collapse;
`;

export const Table = styled.table`
  width: 100%;
`;

export const Thead = styled.thead``;

export const Th = styled.th`
  padding: 10px;
  text-align: center;
`;

export const Td = styled.td`
  padding: 30px 10px 10px 10px;
  text-align: center;
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
