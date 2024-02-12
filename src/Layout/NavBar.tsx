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
  font-weight: bold;
`;

const Buttons = styled.div`
  position: absolute;
  top: 20px;
  right: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const Button = styled.button`
  width: 80px;
  height: 30px;
  border: none;
  border-radius: 30px;
`;

const HeaderVariants = {
  up: { backgroundColor: "rgba(0,0,0,0)" },
  scroll: { backgroundColor: "lightgray" },
};

function NavBar() {
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
            <Item style={{ width: "60px" }}>Ai 회화</Item>
          </Link>
          <Link to="">
            <Item style={{ width: "70px" }}>회화 통화</Item>
          </Link>
          <Link to="">
            <Item style={{ width: "70px" }}>수강후기</Item>
          </Link>
          <Link to="">
            <Item style={{ width: "60px" }}>이벤트</Item>
          </Link>
        </Items>
        <Buttons>
          <Button>로그인</Button>
          <Button>회원가입</Button>
        </Buttons>
      </Container>
    </Wrapper>
  );
}

export default NavBar;
