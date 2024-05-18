import styled from "styled-components";

export const CalendarWrapper = styled.div`
  width: 90%;
  max-width: 800px;
  margin: auto;
  padding: 10px;
  border-radius: 8px;
  border-collapse: collapse;
  background-size: cover;
  background-color: whitesmoke;
`;

export const Table = styled.table`
  width: 100%;
`;

export const Thead = styled.thead``;

export const Th = styled.th`
  padding: 10px;
  text-align: center;
`;

// export const Td = styled.td`
//   padding: 30px 10px 10px 10px;
//   text-align: center;
// `;

export const Td = styled.td`
  width: 14.28%;
  height: 40px; /* Adjust height as needed */
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  &:hover {
    background-color: #87ceeb;
  }
`;

export const Today = styled.div`
  background-color: rgba(255, 255, 0, 0.8);
  border-radius: 50%;
  width: 20px;
  height: 20px;
  margin: 0 auto;
`;
