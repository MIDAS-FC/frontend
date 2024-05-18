import styled from "styled-components";

export const List = styled.div`
  width: 600px;
  margin-top: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #f9f9f9;
  padding: 10px;
`;

export const Item = styled.div`
  padding: 10px;
  border-bottom: 1px solid #ddd;
  &:last-child {
    border-bottom: none;
  }
`;
