//TalkigPage css

import styled from "styled-components";

export const Layout = styled.div`
  position: relative;
  width: 100%;
  min-width: 1280px;
  height: 180vh;
`;

export const Container_top = styled.div`
  position: absolute;
  top: 150px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const Container_mid = styled.div`
  position: absolute;
  top: 500px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const Banner = styled.div`
  width: 1400px;
  height: 300px;
  background-color: ${(props) => props.theme.subColor};
`;
