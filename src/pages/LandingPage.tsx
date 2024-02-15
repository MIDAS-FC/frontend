// 메인 페이지

import styled from "styled-components";
import Slider_custom from "../components/Slider_custom";

const Container = styled.div`
  position: relative;
  width: 100%;
  min-width: 1280px;
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
  width: 100%;
`;

const Banner_main = styled.div`
  width: 100%;
  height: 400px;
  background-color: pink;
  cursor: pointer;
`;

function LandingPage() {
  return (
    <Container>
      <Container_top>
        <Banner_main />
      </Container_top>
      <Container_mid>
        <Slider_custom /> {/* slick을 이용한 slider */}
      </Container_mid>
    </Container>
  );
}

export default LandingPage;
