import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import { ReactComponent as Left } from "../Design/icons/left.svg";
import { ReactComponent as Right } from "../Design/icons/right.svg";
import { useState } from "react";

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
  width: 100%;
`;

const Slider = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 400px;
`;

const Banner_main = styled.div`
  width: 100%;
  height: 400px;
  background-color: pink;
`;

const Banner_sub = styled(motion.div)`
  position: absolute;
  width: 900px;
  height: 400px;
  background-color: lightgray;
`;

const Arrows = styled.div`
  position: absolute;
  top: 160px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Arrow_left = styled(motion.div)`
  opacity: 0;
`;

const Arrow_right = styled(motion.div)`
  opacity: 0;
`;

const SlideVariants = {
  init: (slideBack: boolean) => ({
    x: slideBack ? -window.outerWidth : window.outerWidth,
  }),
  ani: { x: 0 },
  ex: (slideBack: boolean) => ({
    x: slideBack ? window.outerWidth : -window.outerWidth,
  }),
};

const ArrowVariants = {
  hover: { opacity: 1 },
};

// 임의 배너
const offset = [0, 1, 2, 3, 4];

function LandingPage() {
  
  // 슬라이드 배너
  const [slideIndex, SetSlideIndex] = useState(0);
  const [slideLeaving, setSlideLeaving] = useState(false);
  const [slideBack, setSlideBack] = useState(false);
  const slideToggleLeaving = () => {
    setSlideLeaving((prev) => !prev);
  };

  const IncreaseSlideIndex = () => {
    if (slideLeaving) return;
    slideToggleLeaving();
    setSlideBack(false);
    SetSlideIndex((prev) => (prev === 4 ? 4 : prev + 1));
  };

  const DecreaseSlideIndex = () => {
    if (slideLeaving) return;
    slideToggleLeaving();
    setSlideBack(true);
    SetSlideIndex((prev) => (prev === 0 ? 0 : prev - 1));
  };

  return (
    <Container>
      <Container_top>
        <Banner_main />
      </Container_top>
      <Container_mid>

        {/* 슬라이더 구현 */}
        <Slider>
          <AnimatePresence
            initial={false}
            onExitComplete={slideToggleLeaving}
            custom={slideBack}
          >
            {offset.map((i) =>
              i === slideIndex ? (
                <Banner_sub
                  key={i}
                  variants={SlideVariants}
                  custom={slideBack}
                  initial="init"
                  animate="ani"
                  exit="ex"
                  transition={{ type: "tween" }}
                >
                  <Arrows>
                    <Arrow_left
                      variants={ArrowVariants}
                      whileHover="hover"
                      onClick={DecreaseSlideIndex}
                    >
                      <Left />
                    </Arrow_left>
                    <Arrow_right
                      variants={ArrowVariants}
                      whileHover="hover"
                      onClick={IncreaseSlideIndex}
                    >
                      <Right />
                    </Arrow_right>
                  </Arrows>
                  {i}
                </Banner_sub>
              ) : null
            )}
          </AnimatePresence>
        </Slider>
      </Container_mid>
    </Container>
  );
}

export default LandingPage;
