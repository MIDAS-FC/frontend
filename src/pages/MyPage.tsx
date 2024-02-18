// 마이페이지

import { useCallback, useRef, useState } from "react";
import Modal_mypage from "../components/Modal_custom";
import { useNavigate } from "react-router-dom";
import {
  Board,
  Button,
  ButtonVariants,
  Container_mid,
  Container_top,
  Container_top_left,
  Container_top_right,
  Hr,
  ImageBox,
  Info_Level,
  Info_follow,
  Info_name,
  Info_nation,
  Layout,
  ProgressBar,
} from "../Styles/MyPage.style";

function MyPage() {
  const navigate = useNavigate();

  // Modal 관련 함수
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const toggleModal = () => {
    navigate("/mypage/(userId)/editprofile");
    setModalIsOpen((prev) => !prev);
  };

  // 프로필 이미지 업로드 관련 함수
  const inputRef = useRef<HTMLInputElement | null>(null);
  const onUploadImage = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) {
        return;
      }
      console.log(e.target.files[0].name);
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
      <Container_top>
        <Container_top_left>
          <ImageBox
            style={{ width: "250px", height: "250px", marginTop: "10px" }}
          />
          <Info_follow>
            <span>팔로우 3명 | </span>
            <span>팔로잉 10명</span>
          </Info_follow>
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
            <ImageBox style={{ width: "30px", height: "30px" }} />
          </Info_nation>
          <Hr />
          <h2>학습언어: 영어</h2>
          <Hr />
          <Info_Level>
            <h2>학습레벨: LV.3</h2>
            <ProgressBar value="50" max="100" />
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
    </Layout>
  );
}

export default MyPage;
