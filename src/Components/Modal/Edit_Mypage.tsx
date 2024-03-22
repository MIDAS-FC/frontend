// Mypage modal(팝업) 커스텀
// css: style-component

import Modal from "react-modal";
import { useForm } from "react-hook-form";
//s-dot naming 사용
import * as S from "../../Styles/Edit_Mypage.style";
import axios from "axios";

// 유효성 검사
const checkName = {
  required: { value: true, message: "⚠ 이름을 작성해주십시오." },
};
const checkNation = {
  required: { value: true, message: "⚠ 국적을 선택해주십시오." },
};
const checkLang = {
  required: { value: true, message: "⚠ 언어를 선택해주십시오." },
};
const checkIntro = {
  required: { value: true, message: "⚠ 자기소개를 작성해주십시오." },
  minLength: { value: 10, message: "10자리 이상 입력해주세요." },
};

// form 요소의 타입
interface IForm {
  name: string;
  nation: string;
  language: string;
  introduction: string;
}

function Edit_Mypage({ modalIsOpen, toggleModal }: any) {
  // useform 사용
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();

  // axios를 통한 유저 정보 업데이트
  // data: form을 통해 얻은 유저의 새로운 정보
  const updateUserInfo = async (data: IForm) => {
    try {
      // "/user": 임의의 user api
      await axios.put("/user", data);
      console.log("Success about update userInfo");
      // 업데이트 성공하면 modal 창 닫기
      toggleModal();
    } catch (error) {
      console.log("Error about update userInfo: ", error);
    }
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      shouldCloseOnOverlayClick={false}
      ariaHideApp={false}
      style={{
        overlay: {
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(255, 255, 255, 0.9)",
        },
        // modal창
        content: {
          position: "absolute",
          top: "80px",
          left: "500px",
          bottom: "80px",
          width: "500px",
          height: "650px",
          background: "#fff",
          overflow: "auto",
          WebkitOverflowScrolling: "touch",
          borderRadius: "4px",
        },
      }}
    >
      <S.Form onSubmit={handleSubmit(updateUserInfo)}>
        <h2 style={{ fontSize: "20px" }}>프로필 정보 변경</h2>
        <label htmlFor="input">이름</label>
        <input
          {...register("name", checkName)}
          placeholder="새로운 이름을 작성해주십시오"
          style={{ width: "200px" }}
        />
        {errors.name && (
          <S.Errorbox variants={S.ErrorVariants} whileHover="hover">
            <span>{`${errors.name.message}`}</span>
          </S.Errorbox>
        )}
        <label htmlFor="selectbox">국적</label>
        <select
          {...register("nation", checkNation)}
          style={{ width: "100px" }}
          defaultValue=""
        >
          <option disabled value="">
            --선택--
          </option>
          <option>한국</option>
          <option>미국</option> <option>일본</option>
          <option>중국</option>
        </select>
        {errors.nation && (
          <S.Errorbox variants={S.ErrorVariants} whileHover="hover">
            <span>{`${errors.nation.message}`}</span>
          </S.Errorbox>
        )}
        <label htmlFor="selectbox">학습언어</label>
        <select
          {...register("language", checkLang)}
          style={{ width: "100px" }}
          defaultValue=""
        >
          <option disabled value="">
            --선택--
          </option>
          <option>한국어</option>
          <option>영어</option> <option>일본어</option>
          <option>중국어</option>
        </select>
        {errors.language && (
          <S.Errorbox variants={S.ErrorVariants} whileHover="hover">
            <span>{`${errors.language.message}`}</span>
          </S.Errorbox>
        )}
        <label htmlFor="input">자기소개</label>
        <textarea
          {...register("introduction", checkIntro)}
          style={{
            width: "400px",
            height: "200px",
            backgroundColor: "whitesmoke",
            border: "0.5px gray",
            marginTop: "20px",
          }}
        />
        {errors.introduction && (
          <S.Errorbox
            variants={S.ErrorVariants}
            whileHover="hover"
            style={{ width: "250px" }}
          >
            <span>{`${errors.introduction.message}`}</span>
          </S.Errorbox>
        )}
        <S.Buttons>
          <S.Button type="submit">저장</S.Button>
          <S.Button type="button" onClick={toggleModal}>
            취소
          </S.Button>
        </S.Buttons>
      </S.Form>
    </Modal>
  );
}

export default Edit_Mypage;
