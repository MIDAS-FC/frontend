import { motion, useAnimate, useAnimation, useScroll } from "framer-motion";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled(motion.div)`
  position: fixed;
  height: 70px;
  width: 100%;
  z-index: 10;
  background-color: transparent;
`;

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const Logo = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  width: 120px;
  height: 50px;
  background-color: pink;
`;

const Items = styled.div`
  position: absolute;
  top: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;
`;

const Item = styled.h2`
  width: 70px;
  font-weight: bold;
`;

const HeaderVariants = {
  up: { backgroundColor: "rgba(0,0,0,0)" },
  scroll: { backgroundColor: "lightgray" },
};

function Header() {
  // 스크롤에 따라 헤더 색상 변경
  const { scrollY } = useScroll();
  const navAnimation = useAnimation();
  useEffect(() => {
    scrollY.on("change", () => {
      if (scrollY.get() > 20) {
        navAnimation.start("scroll");
      } else {
        navAnimation.start("up");
      }
    });
  });

  return (
    <Wrapper variants={HeaderVariants} initial="up" animate={navAnimation}>
      <Container>
        {/* 로고 클릭 시 메인으로 이동 */}
        <Link to="">
          <Logo />
        </Link>
        <Items style={{ left: "250px" }}>
          <Link to="">
            <Item>Ai 회화</Item>
          </Link>
          <Link to="">
            <Item>회화 통화</Item>
          </Link>
          <Link to="">
            <Item>수강후기</Item>
          </Link>
          <Link to="">
            <Item>이벤트</Item>
          </Link>
        </Items>
        <Items style={{ right: "10px" }}>
          <Item>로그인</Item>
          <Item>회원가입</Item>
        </Items>
      </Container>
    </Wrapper>
  );
}

export default Header;
