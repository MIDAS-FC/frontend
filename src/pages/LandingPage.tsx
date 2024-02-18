// 메인 페이지

import {
  Banner_main,
  Container_mid,
  Container_top,
  Layout,
} from "../Styles/LandingPage.style";
import Slider_custom from "../components/Slider_custom";

function LandingPage() {
  return (
    <Layout>
      <Container_top>
        <Banner_main>메인페이지-레벨테스트</Banner_main>
      </Container_top>
      <Container_mid>
        {/* slick을 이용한 slider */}
        <Slider_custom />
      </Container_mid>
    </Layout>
  );
}

export default LandingPage;
