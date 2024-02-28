// 사이트 헤더
// css: style-component

import { useAnimation, useScroll } from "framer-motion";
import { useEffect } from "react";
import { Link } from "react-router-dom";
// s-dot naming 사용
import * as S from "../Styles/NavBar.style";

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
    <S.Layout variants={S.HeaderVariants} initial="up" animate={navAnimation}>
      <S.Container>
        {/* 로고 클릭 시 메인으로 이동 */}
        <Link to="">
          <S.Logo
            variants={S.LogoVairnats}
            whileHover="hover"
            whileTap="click"
          />
        </Link>
        <S.Items style={{ left: "250px" }}>
          {/* 클릭 시 FreeTalkingPage으로 이동 */}
          <Link to="/aifreetalking">
            <S.Item
              variants={S.LinkVariants}
              whileHover="hover"
              whileTap="click"
              style={{ width: "60px" }}
            >
              Ai 회화
              {/* {<Circle layoutId="circle" />} */}
            </S.Item>
          </Link>
          <Link to="">
            <S.Item
              variants={S.LinkVariants}
              whileHover="hover"
              whileTap="click"
              style={{ width: "70px" }}
            >
              회화 통화
              {/* {<Circle layoutId="circle" />} */}
            </S.Item>
          </Link>
          <Link to="">
            <S.Item
              variants={S.LinkVariants}
              whileHover="hover"
              whileTap="click"
              style={{ width: "70px" }}
            >
              수강후기
              {/* {<Circle layoutId="circle" />} */}
            </S.Item>
          </Link>
          <Link to="">
            <S.Item
              variants={S.LinkVariants}
              whileHover="hover"
              whileTap="click"
              style={{ width: "60px" }}
            >
              이벤트
              {/* {<Circle layoutId="circle" />} */}
            </S.Item>
          </Link>
        </S.Items>
        <S.Buttons>
          <S.Button
            variants={S.ButtonVariants}
            whileHover="hover"
            whileTap="click"
          >
            로그인
          </S.Button>
          <S.Button
            variants={S.ButtonVariants}
            whileHover="hover"
            whileTap="click"
          >
            회원가입
          </S.Button>
        </S.Buttons>
      </S.Container>
    </S.Layout>
  );
}

export default NavBar;
