// AI 프리토킹 페이지

import React, { FormEvent, useRef } from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";

const Layout = styled.div`
  position: relative;
  width: 100%;
  min-width: 1280px;
  height: 300vh;
`;

const Section_top = styled.div`
  position: absolute;
  top: 150px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const Section_mid = styled.div`
  position: absolute;
  top: 600px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Section_bot = styled.div`
  position: absolute;
  top: 1000px;
  width: 100%;
`;

const Banner = styled.div`
  width: 600px;
  height: 400px;
  background-color: ${(props) => props.theme.subColor};
`;

const Span = styled.span`
  width: 400px;
  font-size: 30px;
`;

const ComboBox = styled.select`
  padding: 8px;
  margin-right: 10px;
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Popup = styled(motion.div)`
  width: 700px;
  height: 600px;
  overflow-y: auto;
  background-color: white;
  margin-top: 50px;
  padding: 50px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
`;

const MessageContainer = styled.li<{ isMe: boolean }>`
  list-style-type: none;
  display: flex;
  justify-content: ${(props) => (props.isMe ? "flex-start" : "flex-end")};
`;

const MessageBubble = styled.span<{ isMe: boolean }>`
  background-color: ${(props) => (props.isMe ? "lightblue" : "lightgreen")};
  padding: 10px;
  border-radius: 5px;
  max-width: 250px;
  word-wrap: break-word; /* 단어 단위로 줄 바꿈 */
  overflow-wrap: break-word; /* 오버플로우 발생 시 단어 단위로 줄 바꿈 */
  word-break: break-all; /* 한 줄이 너무 길어서 표시할 수 없는 경우 단어를 분리하여 줄 바꿈 */
  white-space: pre-line; /* 공백 유지 및 줄 바꿈 유지 */
`;

const Container_chatInput = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 700px;
  padding: 20px;
  background-color: white;
  display: flex;
  align-items: center;
`;

const ChatInput = styled.textarea`
  width: calc(100% - 40px);
  height: 50px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: none;
`;

const SendButton = styled.button`
  width: 60px;
  height: 40px;
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
`;

const Button = styled.button`
  margin-right: 10px;
`;

const CloseButton = styled.button`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
`;

interface IMessage {
  message: string;
  isMe: boolean;
}

function AiSpeaking() {
  const navigate = useNavigate();
  const [isPopup, setIsPopup] = useState(false);
  const togglePopup = () => {
    setIsPopup((prev) => !prev);
    navigate(`/aispeaking/chatroom/${roomPk}`);

    // 팝업이 닫힐 때 채팅기록 초기화
    if (!isPopup) {
      setMessages([]);
    }
  };

  const [roomLanguage, setRoomLanguage] = useState<string>("en-US");
  const [level, setLevel] = useState<number>(2);
  const [roomPk, setRoomPk] = useState<number>(1);
  const [message, setMessage] = useState("");
  const [isMe, setIsMe] = useState(true);
  const [messages, setMessages] = useState<IMessage[]>([]);

  // 녹음-Web API 중 하나인 MediaRecorder 사용
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null); // MediaRecorder를 useRef로 관리
  const [recording, setRecording] = useState(false);

  // useEffect(() => {
  //   //room_pk?
  //   const ws = new WebSocket(`/ws/aichat/${roomPk}`);

  //   ws.onopen = (e) => {
  //     console.log("Connected to django channels");
  //   };

  //   ws.onclose = (e) => {
  //     console.log("Disconnected to django channels");
  //   };

  //   ws.onerror = (e) => {
  //     console.error("error connecting django channels", e);
  //   };

  //   ws.onmessage = (e) => {
  //     console.group("[onmessage]");
  //     const message_obj = JSON.parse(e.data);
  //     if (message_obj.type === "assistant-message") {
  //       const { message } = message_obj;
  //       console.log("assistant-message:", message);
  //       addMessage(message, false);
  //       sayMessage(message, roomLanguage);
  //     } else {
  //       console.error("알 수 없는 메시지 타입입니다.", message_obj);
  //     }
  //     console.groupEnd();
  //   };

  //   return () => {
  //     ws.close();
  //   };
  // }, [roomPk, roomLanguage]);

  // 임시 채팅 생성
  useEffect(() => {
    const interval = setInterval(() => {
      // 임의의 문자열 생성
      const length = Math.floor(Math.random() * (50 - 10 + 1)) + 10;
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let newMessage = "";
      for (let i = 0; i < length; i++) {
        newMessage += characters.charAt(
          Math.floor(Math.random() * characters.length)
        );
      }
      addMessage(newMessage, isMe);
      setIsMe((prevIsMe) => !prevIsMe);
    }, 5000);

    return () => clearInterval(interval); // 컴포넌트가 unmount될 때 interval 정리
  }, [isMe]);

  const addMessage = (message: string, isMe: boolean) => {
    setMessages((prevMessages) => [...prevMessages, { message, isMe }]);
  };

  // const addMessage = (message: string, isMe: boolean) => {
  //   const messageList = document.getElementById("chat-message-list");
  //   const messageElement = document.createElement("li");
  //   messageElement.className = "chat-message" + (isMe ? " me" : "");
  //   messageElement.innerHTML = `
  //           <span class="message">${message}</span>
  //       `;
  //   messageList.appendChild(messageElement);
  //   messageList.scrollTop = messageList.scrollHeight;

  //   messageElement.querySelector(".say")?.addEventListener("click", () => {
  //     sayMessage(message, roomLanguage);
  //   });
  // };

  const sayMessage = (message: string, language: string) => {
    const lang = language.split("-")[0];
    const voiceUrl = `/voice/?message=${encodeURIComponent(
      message
    )}&lang=${encodeURIComponent(lang)}`;
    const audio = new Audio();
    audio.src = voiceUrl;
    audio.play();
  };

  const sendMessage = (message: string) => {
    console.log(message);
  };

  // 스크롤은 항상 최신을 유지
  const chatBottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // 말풍선 목록이 변경될 때마다 스크롤을 맨 아래로 이동
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollTop = chatBottomRef.current.scrollHeight;
    }
  }, [messages]); // messages 상태가 변경될 때마다 실행

  // 팝업 상태시 웹페이지 스크롤 불가능
  useEffect(() => {
    // 팝업이 나타날 때 body의 overflow를 hidden으로 설정
    if (isPopup) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // 컴포넌트가 unmount될 때 body의 overflow를 다시 auto로 설정
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isPopup]);

  // 음성 녹음 설정
  useEffect(() => {
    if (!mediaRecorderRef.current) {
      // 마운트 시에 마이크 권한 요청 및 녹음 시작
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          const mediaRecorder = new MediaRecorder(stream);
          mediaRecorderRef.current = mediaRecorder;

          let chunks: Blob[] = []; // Blob 데이터를 저장할 배열 생성

          mediaRecorder.ondataavailable = (e) => {
            if (e.data.size > 0) {
              chunks.push(e.data); // Blob 데이터를 배열에 추가
            }
          };

          mediaRecorder.onstop = () => {
            // 녹음이 완료된 후 Blob을 생성하기 위해 저장된 Blob 데이터를 사용하여 Blob을 생성
            const audioBlob = new Blob(chunks, { type: "audio/mp3" });
            console.log(audioBlob);

            const audioUrl = URL.createObjectURL(audioBlob);

            // 녹음 파일 확인
            const audio = new Audio(audioUrl);
            audio.play(); // Blob 데이터를 들을 수 있음

            if (audioRef.current) {
              audioRef.current.src = audioUrl;
              audioRef.current.play();
            }
          };

          mediaRecorder.onerror = (err) => {
            console.log("Error: ", err);
          };
        })
        .catch((error) => {
          console.error("Error accessing microphone:", error);
        });
    }

    return () => {
      if (
        mediaRecorderRef.current &&
        mediaRecorderRef.current.state !== "inactive"
      ) {
        mediaRecorderRef.current.stop(); // 컴포넌트 언마운트 시 녹음 중지
      }
    };
  }, [audioChunks]);

  // 녹음 시작/중지 함수
  const handleRecording = () => {
    if (mediaRecorderRef.current?.state === "recording") {
      mediaRecorderRef.current.stop();
      //
      //서버로 전송하는건데 receive_json 수신받는 함수를 작성해야함
      // socketRef.current(audioBlob);
      setRecording(false);
    } else {
      mediaRecorderRef.current?.start();
      setRecording(true);
    }
  };

  return (
    <Layout>
      <Section_top>
        <Banner />
        <Span>
          언제 어디서든, 어떤 주제에 대해서든 대화하세요 스픽 튜터는 완전히
          개인화된 커리큘럼을 제공합니다.당신만을 위한 맞춤 수업을 추천해줄
          거예요.
        </Span>
      </Section_top>
      <Section_mid>
        <div>
          <label htmlFor="roomLanguage">Room Language: </label>
          <ComboBox
            id="roomLanguage"
            value={roomLanguage}
            onChange={(e) => setRoomLanguage(e.target.value)}
          >
            <option value="en-US">English</option>
            <option value="zh-CN">Chinese</option>
            <option value="ja-JP">Japanese</option>
            <option value="ko-KR">Korean</option>
          </ComboBox>
        </div>
        <div>
          <label htmlFor="level">Level: </label>
          <ComboBox
            id="level"
            value={level}
            onChange={(e) => setLevel(parseInt(e.target.value))}
          >
            <option value="1">입문</option>
            <option value="2">초급</option>
            <option value="3">중급</option>
            <option value="4">중상급</option>
            <option value="5">상급</option>
            <option value="ko-KR">고급</option>
          </ComboBox>
        </div>
        <button onClick={togglePopup}>채팅방 생성</button>
      </Section_mid>
      <>
        <AnimatePresence>
          {isPopup && (
            <Overlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Popup
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                ref={chatBottomRef}
              >
                {/* 채팅 메시지 목록 표시 */}
                <div className="card-body">
                  <ul id="chat-message-list">
                    {messages.map((msg, index) => (
                      <MessageContainer
                        key={index}
                        isMe={msg.isMe}
                        // className={`chat-message${msg.isMe ? " me" : ""}`}
                      >
                        <MessageBubble
                          isMe={msg.isMe}
                          // className="message"
                        >
                          {msg.message}
                          <ButtonGroup>
                            {msg.isMe && <Button>수정</Button>}
                            {msg.isMe && <Button>전송</Button>}
                            <Button>번역</Button>
                          </ButtonGroup>
                        </MessageBubble>
                      </MessageContainer>
                    ))}
                  </ul>
                  <Container_chatInput>
                    <ChatInput
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="메시지를 입력하세요..."
                    />
                    <SendButton onClick={() => sendMessage}>전송</SendButton>
                  </Container_chatInput>
                  <Button onClick={handleRecording}>
                    {recording ? "녹음 중지" : "녹음 시작"}
                  </Button>
                  <CloseButton onClick={togglePopup}>종료하기</CloseButton>
                </div>
              </Popup>
            </Overlay>
          )}
        </AnimatePresence>
      </>
    </Layout>
  );
}

export default AiSpeaking;
