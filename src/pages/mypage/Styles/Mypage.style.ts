import styled from "styled-components";

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

export const Section = styled.div`
  width: 100%;
  max-width: 1200px;
  margin-bottom: 170px;

  &:last-child {
    margin-bottom: 0;
  }
`;
