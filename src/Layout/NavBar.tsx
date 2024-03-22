// 사이트 헤더
// style component 사용
import axios from 'axios';
import { motion, useAnimation, useScroll } from "framer-motion";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../AuthProvider";

axios.defaults.baseURL = '/auth';


const Wrapper = styled(motion.div)`
  position: fixed;
  height: 70px;
  width: 100%;
  min-width: 1280px;
  z-index: 10;
  background-color: transparent;
`;

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const Logo = styled(motion.div)`
  position: absolute;
  top: 10px;
  left: 10px;
  width: 120px;
  height: 50px;
  transform-origin: center left;
  background-color: pink;
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

// header의 item 클릭할 때마다 원이 이동
const Circle = styled(motion.span)`
  position: absolute;
  width: 5px;
  height: 5px;
  bottom: -5px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: pink;
  border-radius: 50px;
`;

const HeaderVariants = {
  up: { backgroundColor: "rgba(0,0,0,0)" },
  scroll: { backgroundColor: "lightgray" },
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
  const { scrollY } = useScroll();
  const navAnimation = useAnimation();
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true); // 로그인 상태를 true로 변경
    }

    scrollY.on("change", () => {
      if (scrollY.get() > 20) {
        navAnimation.start("scroll");
      } else {
        navAnimation.start("up");
      }
    });
  }, [isLoggedIn]);

  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/pages/Member/Login");
  }

  const handleJoinClick = () => {
    navigate("/pages/Member/Join");
  }

  const handleLogoutClick = () => {
    alert('로그아웃 성공.');
    localStorage.removeItem('token'); // 토큰 삭제
    setIsLoggedIn(false); // 로그인 상태를 false로 변경
    navigate('/'); // 홈페이지로 이동
  }


  return (
    <Wrapper variants={HeaderVariants} initial="up" animate={navAnimation}>
      <Container>
        <Link to="">
          {/* 로고 클릭 시 메인으로 이동 */}
          <Logo variants={LogoVairnats} whileHover="hover" whileTap="click" />
        </Link>
        <Items style={{ left: "250px" }}>
          <Link to="">
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
        {!isLoggedIn ? (
            <>
              <Button variants={ButtonVariants} whileHover="hover" whileTap="click" onClick={handleLoginClick}>
                로그인
              </Button>
              <Button variants={ButtonVariants} whileHover="hover" whileTap="click" onClick={handleJoinClick}>
                회원가입
              </Button>
            </>
          ) : (
            <Button variants={ButtonVariants} whileHover="hover" whileTap="click" onClick={handleLogoutClick}>
              로그아웃
            </Button>
          )}
        </Buttons>
      </Container>
    </Wrapper>
  );
}

export default NavBar;
