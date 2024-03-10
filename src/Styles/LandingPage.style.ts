// // LandingPage css

// import styled from "styled-components";

// export const Layout = styled.div`
//   position: relative;
//   width: 100%;
//   min-width: 1280px;
//   height: 200vh;
// `;

// export const Container_top = styled.div`
//   position: absolute;
//   top: 100px;
//   width: 100%;
// `;

// export const Container_mid = styled.div`
//   position: absolute;
//   top: 700px;
//   width: 100%;
// `;

// export const Banner_main = styled.div`
//   width: 100%;
//   height: 400px;
//   background-color: pink;
//   cursor: pointer;
// `;

// LandingPage css

import styled from "styled-components";

export const Layout = styled.div`
  min-width: 1280px;
  height: 200vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Container_top = styled.div`
  width: 100%;
  margin-top: 150px;
`;

export const Container_mid = styled.div`
  width: 100%;
  margin-top: 250px;
`;

export const Banner_main = styled.div`
  width: 100%;
  height: 400px;
  background-color: ${(props) => props.theme.mainColor};
  cursor: pointer;
`;
