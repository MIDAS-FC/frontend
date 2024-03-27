// 사이트 헤더

import { motion, useAnimation, useScroll } from "framer-motion";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../Design/logos/logo.svg";
import styled from "styled-components";

const Layout = styled(motion.div)`
  position: fixed;
  height: 70px;
  width: 100%;
  min-width: 1280px;
  z-index: 10;
  background-color: transparent;
`;

const Section = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const Logos = styled(motion.div)`
  position: absolute;
  top: 10px;
  left: 10px;
  transform-origin: center left;
  cursor: pointer;
`;

const Items = styled.div`
  position: absolute;
  top: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;
`;

const Item = styled(motion.h2)`
  font-weight: bold;
  cursor: pointer;
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

const Button = styled(motion.button)`
  width: 80px;
  height: 30px;
  border: none;
  border-radius: 30px;
  cursor: pointer;
`;

const HeaderVariants = {
  up: { backgroundColor: "rgba(0, 0, 0, 0)" },
  scroll: { backgroundColor: "#E58C8A" },
};

const LogoVairnats = {
  hover: {
    scaleX: 1.2,
  },
  click: {
    backgroundColor: "transparent",
  },
};

const ButtonVariants = {
  hover: {
    boxShadow: "3px 3px 1.5px rgba(0, 0, 0, 0.2)",
  },
  click: {
    background: "transparent",
  },
};

const LinkVariants = {
  hover: { scale: 1.1 },
  click: {
    color: "transparent",
  },
};

function NavBar() {
  // 스크롤에 따라 헤더 배경색상 변경
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
    <Layout variants={HeaderVariants} initial="up" animate={navAnimation}>
      <Section>
        {/* 로고 클릭 시 메인으로 이동 */}
        <Link to="">
          <Logos variants={LogoVairnats} whileHover="hover" whileTap="click">
            <Logo />
          </Logos>
        </Link>
        <Items style={{ left: "250px" }}>
          {/* 클릭 시 FreeTalkingPage으로 이동 */}
          <Link to="/aispeaking">
            <Item
              variants={LinkVariants}
              whileHover="hover"
              whileTap="click"
              style={{ width: "60px" }}
            >
              Ai 회화
            </Item>
          </Link>
          <Link to="">
            <Item
              variants={LinkVariants}
              whileHover="hover"
              whileTap="click"
              style={{ width: "70px" }}
            >
              회화 통화
            </Item>
          </Link>
          <Link to="">
            <Item
              variants={LinkVariants}
              whileHover="hover"
              whileTap="click"
              style={{ width: "70px" }}
            >
              수강후기
            </Item>
          </Link>
          <Link to="">
            <Item
              variants={LinkVariants}
              whileHover="hover"
              whileTap="click"
              style={{ width: "60px" }}
            >
              이벤트
            </Item>
          </Link>
        </Items>
        <Buttons>
          <Button variants={ButtonVariants} whileHover="hover" whileTap="click">
            로그인
          </Button>
          <Button variants={ButtonVariants} whileHover="hover" whileTap="click">
            회원가입
          </Button>
        </Buttons>
      </Section>
    </Layout>
  );
}

export default NavBar;
