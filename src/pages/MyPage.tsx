// 마이페이지
// css: style-component

import { useCallback, useRef, useState } from "react";
import Modal_mypage from "../components/Modal_MyPage";
import { useNavigate } from "react-router-dom";
// s-dot naming 사용
import * as S from "../Styles/MyPage.style";

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
    <S.Layout>
      <S.Container_top>
        <S.Container_top_left>
          <S.ImageBox
            style={{ width: "250px", height: "250px", marginTop: "10px" }}
          />
          <S.Info_1>
            <span>팔로우 3명 | </span>
            <span>팔로잉 10명</span>
          </S.Info_1>
          <input
            type="file"
            accept="image/*"
            ref={inputRef}
            onChange={onUploadImage}
            style={{ display: "none" }}
          />
          <S.Button
            onClick={onUploadClick}
            variants={S.ButtonVariants}
            whileHover="hover"
            whileTap="click"
          >
            사진 수정
          </S.Button>
          <S.Button
            onClick={toggleModal}
            variants={S.ButtonVariants}
            whileHover="hover"
            whileTap="click"
          >
            프로필 수정
          </S.Button>
        </S.Container_top_left>
        <S.Container_top_right>
          <h2>이름: OOO</h2>
          <S.Hr />
          <h2>성별: 남성</h2>
          <S.Hr />
          <S.Info_2>
            <h2>국적: 한국</h2>
            <S.ImageBox style={{ width: "30px", height: "30px" }} />
          </S.Info_2>
          <S.Hr />
          <h2>학습언어: 영어</h2>
          <S.Hr />
          <S.Info_3>
            <h2>학습레벨: LV.3</h2>
            <S.ProgressBar value="50" max="100" />
          </S.Info_3>
          <S.Hr />
          <h2>자기소개</h2>
          <S.Board>
            <h2>안녕하세요!</h2>
          </S.Board>
        </S.Container_top_right>
      </S.Container_top>
      {/* react-modal: 팝업창 */}
      <Modal_mypage modalIsOpen={modalIsOpen} toggleModal={toggleModal} />
    </S.Layout>
  );
}

export default MyPage;
