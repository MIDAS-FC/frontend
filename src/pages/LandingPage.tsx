// 메인 페이지
// css: style-component

//s-dot 네이밍 사용
import * as S from "../Styles/LandingPage.style";
import Slider_LandingPage from "./../components/Slider_LandingPage";

function LandingPage() {
  return (
    <S.Layout>
      <S.Container_top>
        <S.Banner_main>메인페이지-레벨테스트</S.Banner_main>
      </S.Container_top>
      <S.Container_mid>
        {/* slick을 이용한 slider */}
        <Slider_LandingPage />
      </S.Container_mid>
    </S.Layout>
  );
}

export default LandingPage;
