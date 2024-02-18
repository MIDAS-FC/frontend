// 마이페이지

import { motion } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";
import Modal_mypage from "../components/Modal_custom";
import { useNavigate } from "react-router-dom";

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
  width: 380px;
  height: 420px;
  left: 220px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  background-color: whitesmoke;
  border-radius: 4px;
`;

const Container_top_right = styled.div`
  position: absolute;
  top: 10px;
  left: 720px;
  width: 550px;
  height: 400px;
  padding-top: 10px;
  padding-left: 50px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  background-color: whitesmoke;
  border-radius: 4px;
`;

const Container_mid = styled.div`
  position: absolute;
  top: 500px;
  left: 220px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Image = styled.div`
  border-radius: 100px;
  background-color: ivory;
`;

const Info_name = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
`;

const Info_follow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

const Info_nation = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 15px;
`;

const Info_Level = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;
`;

const Button = styled(motion.button)`
  width: 100px;
  border-radius: 5px;
  background-color: lightgray;
  box-shadow: 1px 1px 0.5px rgba(0, 0, 0, 0.1);
`;

const Hr = styled.hr`
  width: 300px;
  border: 0.5px solid lightgray;
  text-align: left;
  margin-left: 0;
  margin-top: 0;
`;

const Progress = styled.progress`
  width: 120px;
  height: 14px;
`;

const Board = styled.div`
  width: 1050px;
  height: 200px;
  border-radius: 5px;
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

function MyPage() {
  const navigate = useNavigate();

  // Modal 관련 함수
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const toggleModal = () => {
    navigate("/mypage/(userId)/editprofile");
    setModalIsOpen((prev) => !prev);
  };

  return (
    <Container>
      <Container_top>
        <Container_top_left>
          <Image
            style={{ width: "250px", height: "250px", marginTop: "10px" }}
          />
          <Info_follow>
            <span>팔로우 3명</span>
            <span>팔로잉 10명</span>
          </Info_follow>
          <Button variants={ButtonVariants} whileHover="hover" whileTap="click">
            사진 수정
          </Button>
          <Button
            onClick={toggleModal}
            variants={ButtonVariants}
            whileHover="hover"
            whileTap="click"
          >
            프로필 수정
          </Button>
        </Container_top_left>
        <Container_top_right>
          <Info_name>
            <h2 style={{ fontSize: "50px" }}>OOO</h2>
            <h2 style={{ marginTop: "20px" }}>님</h2>
          </Info_name>
          <Hr />
          <h2>성별: 남성</h2>
          <Hr />
          <Info_nation>
            <h2>국적: 한국</h2>
            <Image style={{ width: "30px", height: "30px" }} />
          </Info_nation>
          <Hr />
          <h2>학습언어: 영어</h2>
          <Hr />
          <Info_Level>
            <h2>학습레벨: LV.3</h2>
            <Progress value="50" max="100" />
          </Info_Level>
        </Container_top_right>
      </Container_top>
      <Container_mid>
        <Board>
          <h2>안녕하세요!</h2>
        </Board>
      </Container_mid>
      {/* react-modal: 팝업창 */}
      <Modal_mypage modalIsOpen={modalIsOpen} toggleModal={toggleModal} />
    </Container>
  );
}

export default MyPage;
