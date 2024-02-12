import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import { ReactComponent as Left } from "../Design/icons/left.svg";
import { ReactComponent as Right } from "../Design/icons/right.svg";
import { useState } from "react";
import Slider_custom from "../components/Slider_custom";

const Container = styled.div`
  position: relative;
  height: 200vh;
`;

const Container_top = styled.div`
  position: absolute;
  top: 100px;
  width: 100%;
`;

const Container_mid = styled.div`
  position: absolute;
  top: 700px;
  /* right: 220px; */
  width: 100%;
`;

const Banner_main = styled.div`
  width: 100%;
  height: 400px;
  background-color: pink;
`;

function LandingPage() {
  return (
    <Container>
      <Container_top>
        <Banner_main />
      </Container_top>
      <Container_mid>
        <Slider_custom />
      </Container_mid>
    </Container>
  );
}

export default LandingPage;
