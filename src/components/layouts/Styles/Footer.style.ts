import styled from "styled-components";

export const FooterContainer = styled.footer`
  border:1px solid green;
  background-color: #f8f8f8;
  padding: 20px;
  text-align: center;
  font-size: 14px;
  color: #333;
  border-top: 1px solid #e7e7e7;
`;

export const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
`;

export const FooterColumn = styled.div`
  flex: 1;
  padding: 0 20px;
`;

export const FooterSection = styled.div`
  margin: 10px 0;
`;

export const FooterLink = styled.a`
  color: #0073e6;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
