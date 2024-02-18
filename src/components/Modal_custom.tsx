// Mypage modal(팝업) 커스텀

import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 600px;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
`;

const Button = styled(motion.button)`
  width: 100px;
  border-radius: 5px;
  background-color: lightgray;
  box-shadow: 1px 1px 0.5px rgba(0, 0, 0, 0.1);
`;

const Errorbox = styled(motion.div)`
  width: 200px;
  height: 40px;
  background-color: khaki;
  border-radius: 10px;
  padding: 2px;
`;

const ErrorVariants = {
  hover: { scale: 1.05 },
};

// form 요소의 타입
interface IForm {
  name: string;
  nation: string;
  language: string;
  introduction: string;
}

function Modal_custom({ modalIsOpen, toggleModal }: any) {
  // useform 사용
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IForm>();
  const onValid = (data: IForm) => {
    console.log(data);
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      shouldCloseOnOverlayClick={false}
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
      <Form onSubmit={handleSubmit(onValid)}>
        <h2 style={{ fontSize: "20px" }}>프로필 정보 변경</h2>
        <label htmlFor="input">이름</label>
        <input
          {...register("name", {
            required: { value: true, message: "⚠ 이름을 작성해주십시오." },
          })}
          placeholder="새로운 이름을 작성해주십시오"
          style={{ width: "200px" }}
        />
        {errors.name && (
          <Errorbox variants={ErrorVariants} whileHover="hover">
            <span>{`${errors.name.message}`}</span>
          </Errorbox>
        )}
        <label htmlFor="selectbox">국적</label>
        <select
          {...register("nation", {
            required: { value: true, message: "⚠ 국적을 선택해주십시오." },
          })}
          style={{ width: "100px" }}
        >
          <option disabled selected value="">
            --선택--
          </option>
          <option>한국</option>
          <option>미국</option> <option>일본</option>
          <option>중국</option>
        </select>
        {errors.nation && (
          <Errorbox variants={ErrorVariants} whileHover="hover">
            <span>{`${errors.nation.message}`}</span>
          </Errorbox>
        )}
        <label htmlFor="selectbox">학습언어</label>
        <select
          {...register("language", {
            required: { value: true, message: "⚠ 언어를 선택해주십시오." },
          })}
          style={{ width: "100px" }}
        >
          <option disabled selected value="">
            --선택--
          </option>
          <option>한국어</option>
          <option>영어</option> <option>일본어</option>
          <option>중국어</option>
        </select>
        {errors.language && (
          <Errorbox variants={ErrorVariants} whileHover="hover">
            <span>{`${errors.language.message}`}</span>
          </Errorbox>
        )}
        <label htmlFor="input">자기소개</label>
        <input
          {...register("introduction", {
            required: { value: true, message: "⚠ 자기소개를 작성해주십시오." },
          })}
          style={{
            width: "400px",
            height: "200px",
            backgroundColor: "whitesmoke",
            outline: "0.5px gray",
            marginTop: "20px",
          }}
        />
        {errors.introduction && (
          <Errorbox
            variants={ErrorVariants}
            whileHover="hover"
            style={{ width: "250px" }}
          >
            <span>{`${errors.introduction.message}`}</span>
          </Errorbox>
        )}
        <Buttons>
          <Button>저장</Button>
          <Button onClick={toggleModal}>취소</Button>
        </Buttons>
      </Form>
    </Modal>
  );
}

export default Modal_custom;
