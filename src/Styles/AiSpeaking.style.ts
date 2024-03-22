//TalkigPage css

import styled from "styled-components";

export const Layout = styled.div`
  position: relative;
  width: 100%;
  min-width: 1280px;
  height: 300vh;
`;

export const Section_top = styled.div`
  position: absolute;
  top: 150px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const Section_mid = styled.div`
  position: absolute;
  top: 600px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Section_bot = styled.div`
  position: absolute;
  top: 1000px;
  width: 100%;
`;

export const Banner = styled.div`
  width: 600px;
  height: 400px;
  background-color: ${(props) => props.theme.subColor};
`;
