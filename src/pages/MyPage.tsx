// 마이페이지
// css: style-component

import { useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
// s-dot naming 사용
import * as S from "../Styles/Mypage.style";
import axios from "axios";
import Edit_Mypage from "./../Components/Modal/Edit_Mypage";

function Mypage() {
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
    <S.Layout>
      <S.Section_top>
        <S.Section_top_left>
          <S.ImageBox
            style={{ width: "250px", height: "250px", marginTop: "10px" }}
          />
          <S.Item_follow>
            <span>팔로우 3명 | </span>
            <span>팔로잉 10명</span>
          </S.Item_follow>
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
        </S.Section_top_left>
        <S.Section_top_right>
          <h2>이름: OOO</h2>
          <S.Hr />
          <h2>성별: 남성</h2>
          <S.Hr />
          <S.Item_nation>
            <h2>국적: 한국</h2>
            <S.ImageBox style={{ width: "30px", height: "30px" }} />
          </S.Item_nation>
          <S.Hr />
          <h2>학습언어: 영어</h2>
          <S.Hr />
          <h2>자기소개</h2>
          <S.Board>
            <h2>안녕하세요!</h2>
          </S.Board>
        </S.Section_top_right>
      </S.Section_top>
      {/* react-modal: 팝업창 */}
      <Edit_Mypage modalIsOpen={modalIsOpen} toggleModal={toggleModal} />
    </S.Layout>
  );
}

export default Mypage;
