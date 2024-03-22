// AI프리토킹 modal(팝업) 커스텀
// css: style-component

import { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import io from "socket.io-client";

interface ModalTalkingProps {
  modalIsOpen: boolean;
  toggleModal: () => void;
}

function Chat({ modalIsOpen, toggleModal }: ModalTalkingProps) {
  // 녹음-Web API 중 하나인 MediaRecorder 사용
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null); // MediaRecorder를 useRef로 관리
  const [recording, setRecording] = useState(false);

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
            // UploadRecording(audioBlob);
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
    } else {
      mediaRecorderRef.current?.start();
      setRecording(true);
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
          zIndex: 11,
        },
        // modal창
        content: {
          position: "absolute",
          top: "40px",
          left: "450px",
          bottom: "80px",
          width: "700px",
          height: "650px",
          background: "#fff",
          overflow: "auto",
          WebkitOverflowScrolling: "touch",
          borderRadius: "4px",
          zIndex: 11,
        },
      }}
    >
      <button onClick={toggleModal}>X</button>
      <button onClick={handleRecording}>
        {recording ? "Stop Recording" : "Start Recording"}
      </button>
    </Modal>
  );
}

export default Chat;
