// AI 프리토킹 페이지
// css: style-component

import styled from "styled-components";
import Slider_Talking from "../components/Slider_Talking";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal_Talking from "../components/Modal_Talking";

const Layout = styled.div`
  position: relative;
  width: 100%;
  min-width: 1280px;
  height: 180vh;
`;

const Container_top = styled.div`
  position: absolute;
  top: 150px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Container_mid = styled.div`
  position: absolute;
  top: 500px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Banner = styled.div`
  width: 1400px;
  height: 300px;
  background-color: purple;
`;

function TalkingPage() {
  return (
    <Layout>
      <Container_top>
        <Banner />
      </Container_top>
      <Container_mid>
        {/* slick을 이용한 slider */}
        <Slider_Talking />
      </Container_mid>
      {/* react-modal: 팝업창 */}
    </Layout>
  );
}

export default TalkingPage;
