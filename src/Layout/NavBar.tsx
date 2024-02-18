// 사이트 헤더
// style component 사용

import { useAnimation, useScroll } from "framer-motion";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  ButtonVariants,
  Buttons,
  Container,
  HeaderVariants,
  Item,
  Items,
  Layout,
  LinkVariants,
  Logo,
  LogoVairnats,
} from "../Styles/NavBar.style";

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
      <Container>
        {/* 로고 클릭 시 메인으로 이동 */}
        <Link to="">
          <Logo variants={LogoVairnats} whileHover="hover" whileTap="click" />
        </Link>
        <Items style={{ left: "250px" }}>
          {/* 클릭 시 FreeTalkingPage으로 이동 */}
          <Link to="/aifreetalking">
            <Item
              variants={LinkVariants}
              whileHover="hover"
              whileTap="click"
              style={{ width: "60px" }}
            >
              Ai 회화
              {/* {<Circle layoutId="circle" />} */}
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
              {/* {<Circle layoutId="circle" />} */}
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
              {/* {<Circle layoutId="circle" />} */}
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
              {/* {<Circle layoutId="circle" />} */}
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
      </Container>
    </Layout>
  );
}

export default NavBar;
