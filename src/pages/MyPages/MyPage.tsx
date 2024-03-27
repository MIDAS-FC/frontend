// 마이페이지

import { useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { motion } from "framer-motion";
import Edit_mypage from "../../components/Edit_mypage";

const Layout = styled.div`
  min-width: 1280px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 120vh;
  padding: 50px;
`;

const Section_top = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 100px;
`;

const Section_top_left = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 30%; /* 변경: 좌측 컨테이너 크기 조정 */
`;

const Section_top_right = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  width: 65%; /* 변경: 우측 컨테이너 크기 조정 */
`;

const ImageBox = styled.div`
  border-radius: 50%;
  background-color: lightgray;
  width: 150px;
  height: 150px;
  overflow: hidden;
`;

const Item_follow = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
`;

const Item_nation = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
`;

const Button = styled(motion.button)`
  width: 120px;
  border: none;
  border-radius: 5px;
  background-color: lightgray;
  box-shadow: 1px 1px 0.5px rgba(0, 0, 0, 0.1);
`;

const Hr = styled.hr`
  width: 100%;
  border: none;
  height: 1px;
  background-color: lightgray;
  margin: 10px 0;
`;

const ProgressBar = styled.progress`
  width: 120px;
  height: 14px;
  border: none;
  border-radius: 5px;
  overflow: hidden;

  &::-webkit-progress-bar {
    background-color: lightgray;
    border-radius: 5px;
  }

  &::-webkit-progress-value {
    background-color: lightgreen; /* 변경: 초록색으로 설정 */
    border-radius: 5px;
  }
`;

const Board = styled.div`
  width: 100%;
  width: 600px;
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
    // 팝업창 url로 이동
    navigate("/mypage/editprofile");
    setModalIsOpen((prev) => !prev);
  };

  // 프로필 이미지 업로드 관련 함수
  const inputRef = useRef<HTMLInputElement | null>(null);
  const onUploadImage = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      try {
        if (!e.target.files) {
          return;
        }
        const file = e.target.files[0];
        const formData = new FormData();
        //profileImage: 임의로 정한 key값
        formData.append("profileImage", file);

        // 프로필 이미지 업로드 요청
        // "/user": 임의의 user api
        const response = await axios.post("/user", formData);
        console.log(response.data);
      } catch (error) {
        console.error("Error Uploading image: ", error);
      }
    },
    []
  );
  const onUploadClick = useCallback(() => {
    if (!inputRef.current) {
      return;
    }
    inputRef.current.click();
  }, []);

  return (
    <Layout>
      <Section_top>
        <Section_top_left>
          <ImageBox
            style={{ width: "250px", height: "250px", marginTop: "10px" }}
          />
          <Item_follow>
            <span>팔로우 3명 | </span>
            <span>팔로잉 10명</span>
          </Item_follow>
          <input
            type="file"
            accept="image/*"
            ref={inputRef}
            onChange={onUploadImage}
            style={{ display: "none" }}
          />
          <Button
            onClick={onUploadClick}
            variants={ButtonVariants}
            whileHover="hover"
            whileTap="click"
          >
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
        </Section_top_left>
        <Section_top_right>
          <h2>이름: OOO</h2>
          <Hr />
          <h2>성별: 남성</h2>
          <Hr />
          <Item_nation>
            <h2>국적: 한국</h2>
            <ImageBox style={{ width: "30px", height: "30px" }} />
          </Item_nation>
          <Hr />
          <h2>학습언어: 영어</h2>
          <Hr />
          <h2>자기소개</h2>
          <Board>
            <h2>안녕하세요!</h2>
          </Board>
        </Section_top_right>
      </Section_top>
      {/* react-modal: 팝업창 */}
      <Edit_mypage modalIsOpen={modalIsOpen} toggleModal={toggleModal} />
    </Layout>
  );
}

export default MyPage;
