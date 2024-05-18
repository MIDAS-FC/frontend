import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 10px;

  h2 {
    margin: 0;
  }

  button {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
  }
`;

export const ReportBox = styled.div`
  width: 80%;
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #f9f9f9;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  line-height: 1.5;
`;

export const List = styled.ul`
  list-style-type: disc;
  padding-left: 20px;
`;

export const ListItem = styled.li`
  margin-bottom: 10px;
`;

export const Text = styled.p`
  margin-top: 10px;
`;
