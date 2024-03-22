// AI 프리토킹 페이지
// css: style-component

// s-dot naming 사용
import React, { FormEvent } from "react";
import { useEffect, useState } from "react";
import * as S from "../Styles/AiSpeaking.style";
import { useNavigate } from "react-router-dom";
import Modal_Chat from "../Components/Modal/Chat";
import styled from "styled-components";
import axios from "axios";

const Span = styled.span`
  width: 400px;
  font-size: 30px;
`;

function AiSpeaking() {
  // // 채팅방 생성 관련
  // const [situation, setSituation] = useState<string>("");
  // const [language, setLanguage] = useState<string>("");
  // const [level, setLevel] = useState<number>(0);
  // // 채팅방 목록 관련
  // const [chatRooms, setChatRooms] = useState([]);

  // useEffect(() => {
  //   fetchChatRooms();
  // }, []);

  // const fetchChatRooms = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:8000/aichat/list/");
  //     setChatRooms(response.data);
  //   } catch (error) {
  //     console.log("Fetching rooms error: ", error);
  //   }
  // };

  // // 폼 제출 핸들러
  // const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   try {
  //     const response = await axios.post("http://localhost:8000/aichat/new/", {
  //       situation,
  //       language,
  //       level,
  //     });
  //     console.log(response);

  //     if (response.data.success) {
  //       console.log("ChatRoom created successfully");
  //       console.log("ChatRoom ID:", response.data.ChatRoom_id);
  //       // 채팅방 목록 갱신
  //       fetchChatRooms();

  //       // 폼 초기화
  //       setSituation("");
  //       setLanguage("");
  //       setLevel(0);
  //     } else {
  //       console.log("ChatRoom creation failed");
  //     }
  //   } catch (error) {
  //     console.log("Submit error: ", error);
  //   }
  // };

  const navigate = useNavigate();

  // Modal 관련 함수
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const toggleModal = () => {
    navigate("/aispeaking/room");
    setModalIsOpen((prev) => !prev);
  };

  return (
    <S.Layout>
      <S.Section_top>
        <S.Banner />
        <Span>
          언제 어디서든, 어떤 주제에 대해서든 대화하세요 스픽 튜터는 완전히
          개인화된 커리큘럼을 제공합니다.당신만을 위한 맞춤 수업을 추천해줄
          거예요.
        </Span>
      </S.Section_top>
      <S.Section_mid>
        {/* <form onSubmit={handleSubmit}>
          <textarea
            value={situation}
            onChange={(e) => setSituation(e.target.value)}
            placeholder="Enter situation..."
          />
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="">Select language</option>
            <option value="en-US">English</option>
            <option value="ja-JP">Japanese</option>
            <option value="zh-CN">Chinese</option>
            <option value="ko-KR">Korean</option>
          </select>
          <select value={level} onChange={(e) => setLevel(+e.target.value)}>
            <option value="">Select level</option>
            <option value="1">초급</option>
            <option value="2">고급</option>
          </select>
          <button type="submit">Submit</button>
        </form> */}
      </S.Section_mid>
      <S.Section_bot></S.Section_bot>
      <Modal_Chat modalIsOpen={modalIsOpen} toggleModal={toggleModal} />
    </S.Layout>
  );
}

export default AiSpeaking;
