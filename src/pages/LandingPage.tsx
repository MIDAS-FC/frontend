// 메인 페이지

import styled from "styled-components";
import Slider_custom from "../components/Slider_custom";
import { motion } from "framer-motion";

const Layout = styled.div`
  min-width: 1280px;
  height: 350vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container_top = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;
  margin-top: 200px;
`;

const Container_mid = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;
  margin-top: 200px;
`;

const Container_bot = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 100px;
  margin-top: 100px;
`;

const Banner_main = styled.div`
  width: 600px;
  height: 500px;
  background-color: ${(props) => props.theme.subColor};
  cursor: pointer;
`;

const Banner_sub = styled.div`
  width: 600px;
  height: 500px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
`;

const Box = styled(motion.div)`
  width: 240px;
  height: 240px;
  margin: 0 auto;
  border-radius: 20px;
  background-color: ${(props) => props.theme.subColor};
`;

const Banner_text = styled.div`
  width: 500px;
  height: 300px;
  margin-top: 150px;
  h2 {
    font-size: 25px;
    margin-top: 10px;
  }
`;

const BoxVairnats = {
  hover: {
    scale: 1.15,
  },
  click: {
    backgroundColor: "transparent",
  },
};

const offset = [0, 1, 2, 3];

function LandingPage() {
  return (
    <Layout>
      <Container_top>
        <Banner_text>
          <h2>24시간 언제든 무료 레벨테스트</h2>
          <h2>어떻게 시작해야 할 지 모르겠다면?</h2>
          <h2>
            AI와 내 회화 실력을 확인하고 내게 딱 맞는 코스 추천까지! 언제
            어디서든 3분이면 OK
          </h2>
        </Banner_text>
        <Banner_main>메인배너-레벨테스트 관련</Banner_main>
      </Container_top>
      <Container_mid>
        <Banner_sub>
          {offset.map((i) => (
            <Box
              key={i}
              variants={BoxVairnats}
              whileHover="hover"
              whileTap="click"
            >
              {i}AI 프리토킹 상황 이미지
            </Box>
          ))}
        </Banner_sub>
        <Banner_text>
          <h2>무료 AI 학습 콘텐츠 MiMi Talk with ChatGPT</h2>
          <h2>
            ChatGPT로 학습한 AI MiMi와 매주 새로운 주제에 대해 자유롭게
            대화해보세요
          </h2>
        </Banner_text>
      </Container_mid>
      <Container_bot>
        <Banner_text>
          <h2>실제 수강생수업 만족도 97%</h2>
          <h2>왜, 또, 스피쿠스일까요?</h2>
          <h2>처음 스피쿠스를 선택한 이유,연장 수강을 하고 있는 이유,</h2>
          <h2>실제 수강생들의 솔직 후기로 확인해보세요!</h2>
        </Banner_text>
        {/* slick을 이용한 slider */}
        <Slider_custom />
      </Container_bot>
    </Layout>
  );
}

export default LandingPage;
