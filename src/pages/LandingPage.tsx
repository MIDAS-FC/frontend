// 메인 페이지
// css: style-component

//s-dot 네이밍 사용
import * as S from "../Styles/LandingPage.style";
import Slider_LandingPage from "../Components/Slider/Review";

const offset = [0, 1, 2, 3];

function LandingPage() {
  return (
    <S.Layout>
      <S.Container_top>
        <S.Banner_text>
          <h2>24시간 언제든 무료 레벨테스트</h2>
          <h2>어떻게 시작해야 할 지 모르겠다면?</h2>
          <h2>
            AI와 내 회화 실력을 확인하고 내게 딱 맞는 코스 추천까지! 언제
            어디서든 3분이면 OK
          </h2>
        </S.Banner_text>
        <S.Banner_main>메인배너-레벨테스트 관련</S.Banner_main>
      </S.Container_top>
      <S.Container_mid>
        <S.Banner_sub>
          {offset.map((i) => (
            <S.box
              key={i}
              variants={S.BoxVairnats}
              whileHover="hover"
              whileTap="click"
            >
              {i}AI 프리토킹 상황 이미지
            </S.box>
          ))}
        </S.Banner_sub>
        <S.Banner_text>
          <h2>무료 AI 학습 콘텐츠 MiMi Talk with ChatGPT</h2>
          <h2>
            ChatGPT로 학습한 AI MiMi와 매주 새로운 주제에 대해 자유롭게
            대화해보세요
          </h2>
        </S.Banner_text>
      </S.Container_mid>
      <S.Container_bot>
        <S.Banner_text>
          <h2>실제 수강생수업 만족도 97%</h2>
          <h2>왜, 또, 스피쿠스일까요?</h2>
          <h2>처음 스피쿠스를 선택한 이유,연장 수강을 하고 있는 이유,</h2>
          <h2>실제 수강생들의 솔직 후기로 확인해보세요!</h2>
        </S.Banner_text>
        {/* slick을 이용한 slider */}
        <Slider_LandingPage />
      </S.Container_bot>
    </S.Layout>
  );
}

export default LandingPage;
