// 마이페이지

import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
  /* min-width: 1280px; */
  height: 120vh;
  top: 120px;
`;

const Container_top = styled.div`
  width: 100%;
`;

const Container_top_left = styled.div`
  position: absolute;
  top: 10px;
  left: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const Container_top_right = styled.div`
  position: absolute;
  left: 750px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 30px;
  border-radius: 20px;
`;

const Container_mid = styled.div`
  position: absolute;
  top: 380px;
  left: 350px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Image = styled.div`
  border-radius: 10px;
  background-color: whitesmoke;
`;

const Container_t_r_name = styled.div`
  width: 400px;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  h2 {
    font-size: 50px;
  }
`;

const Container_t_r_follow = styled.div`
  width: 220px;
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: -10px;
`;

const Container_t_r_Info = styled.div`
  width: 400px;
  height: 140px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
  h2 {
    font-size: 18px;
    font-weight: bold;
  }
`;

const Info_nation = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 15px;
`;

const Button = styled(motion.button)`
  width: 100px;
  border: none;
  border-radius: 25px;
  box-shadow: 1px 1px 0.5px rgba(0, 0, 0, 0.1);
`;

const Progress = styled.progress`
  width: 120px;
  height: 14px;
  background-color: green;
  margin-left: 5px;
`;

const Board = styled.div`
  width: 800px;
  height: 200px;
  border-radius: 10px;
  background-color: whitesmoke;
`;

const ButtonVariants = {
  hover: {
    boxShadow: "3px 3px 1.5px rgba(0, 0, 0, 0.2)",
  },
  click: {
    background: "transparent",
  },
};

// 아래는 오버레이 관련
const Overlay_Back = styled(motion.div)`
  width: 100%;
  height: 100%;
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 100px;
  left: 300px;
  width: 1200px;
  height: 650px;
  opacity: 0;
  background-color: whitesmoke;
  border-radius: 10px;
`;

const Overlay_top = styled.div`
  width: 200px;
  height: 200px;
  background-color: black;
`;

const Overlay_top_left = styled.div``;

const Overlay_top_right = styled.div``;

const Overlay_mid = styled.div``;

const OverlayVariants = { ani: { opacity: 1 }, ex: { opacity: 0 } };

function MyPage() {
  const navigate = useNavigate();
  // useMatch 임시
  const match1 = useMatch("/mypage/(userId)");

  const onOverlayClick = () => {
    navigate("/mypage");
  };
  const onEditClick = () => {
    navigate("/mypage/(userId)");
  };

  console.log(match1);

  return (
    <Container>
      <Container_top>
        <Container_top_left>
          <Image style={{ width: "300px", height: "300px" }} />
        </Container_top_left>
        <Container_top_right>
          <Container_t_r_name>
            <h2>OOO 님</h2>
            <Button
              layoutId={match1 + ""}
              onClick={onEditClick}
              variants={ButtonVariants}
              whileHover="hover"
              whileTap="click"
            >
              프로필 수정 ✎
            </Button>
          </Container_t_r_name>
          <Container_t_r_follow>
            <span>팔로우 3명</span>
            <span>팔로잉 10명</span>
          </Container_t_r_follow>
          <Container_t_r_Info>
            <Info_nation>
              <h2>국적: 한국</h2>
              <Image
                style={{ width: "30px", height: "30px", borderRadius: "30px" }}
              />
            </Info_nation>
            <h2>학습 언어: 영어</h2>
            <h2>학습 레벨: LV.3</h2>
            <Progress value="20" max="100"></Progress>
          </Container_t_r_Info>
        </Container_top_right>
      </Container_top>
      <Container_mid>
        <Board>
          <h2 style={{ margin: "10px", fontSize: "20px" }}>안녕하세요</h2>
        </Board>
      </Container_mid>

      {/* 오버레이 */}
      <AnimatePresence>
        <Overlay_Back onClick={onOverlayClick} />
        {match1 ? (
          <Overlay
            layoutId={match1 + ""}
            variants={OverlayVariants}
            animate="ani"
            exit="ex"
          ></Overlay>
        ) : null}
      </AnimatePresence>
    </Container>
  );
}

export default MyPage;
