// const searchConsole = document.getElementById("search_console");

// // ----- 현재 브라우저에서 API 사용이 유효한가를 검증
// function availabilityFunc() {
//   //현재 SpeechRecognition을 지원하는 크롬 버전과 webkit 형태로 제공되는 버전이 있으므로 둘 중 해당하는 생성자를 호출한다.
//   recognition = new webkitSpeechRecognition() || new SpeechRecognition();
//   recognition.lang = "ko"; // 음성인식에 사용되고 반환될 언어를 설정한다.
//   recognition.maxAlternatives = 5; //음성 인식결과를 5개 까지 보여준다.

//   if (!recognition) {
//     alert("현재 브라우저는 사용이 불가능합니다.");
//   }
// }

// // --- 음성녹음을 실행하는 함수
// function startRecord() {
//   console.log("시작");

//   // ⏺️클릭 시 음성인식을 시작한다.
//   recognition.addEventListener("speechstart", () => {
//     console.log("인식");
//   });

//   //음성인식이 끝까지 이루어지면 중단된다.
//   recognition.addEventListener("speechend", () => {
//     console.log("인식2");
//   });

//   //음성인식 결과를 반환
//   // SpeechRecognitionResult 에 담겨서 반환된다.
//   recognition.addEventListener("result", (e) => {
//     searchConsole.value = e.results[0][0].transcript;
//   });

//   recognition.start();
// }
// //  🛑 클릭 시 종료(안 눌러도 음성인식은 알아서 종료됨)
// function endRecord() {
//   console.log("종료");
//   recognition.stop(); // 음성인식을 중단하고 중단까지의 결과를 반환
// }

// window.addEventListener("load", availabilityFunc);

import React, { useState, useRef, useEffect } from "react";

const SpeechToText = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recgonitionRef = useRef<SpeechRecognition | null>(null); // useRef의 제네릭 타입을 설정

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) {
      console.error("web speech api error: ");
      return;
    }

    recgonitionRef.current = new window.webkitSpeechRecognition();
    const recognition = recgonitionRef.current;
    if (!recognition) return; // null 체크

    recognition.interimResults = true; // options.interimResults 대신에 true를 사용
    recognition.lang = "en-US"; // options.lang 대신에 "en-US"를 사용
    recognition.continuous = false; // options.continuous 대신에 false를 사용

    if ("webkitSpeechGrammarList" in window) {
      const grammar =
        "#JSGF V1.0; grammar punctuation; public <punc>=. | , | ? | ! | ; | : | ;";
      const speechRecognitionList = new window.webkitSpeechGrammarList();
      speechRecognitionList.addFromString(grammar, 1);
      recognition.grammars = speechRecognitionList; // 오타 수정: grammrs -> grammars
    }
    recognition.onresult = (event: SpeechRecognitionEvent) => {
      // 이벤트 타입 명시
      let text = "";
      for (let i = 0; i < event.results.length; i++) {
        text += event.results[i][0].transcript;
      }
      setTranscript(text);
    };

    recognition.onerror = (event: SpeechRecognitionError) => {
      // 이벤트 타입 명시
      console.error("speech recognition error:", event.error);
    };

    // 음성 인식이 없을 시 자동 녹음 종료
    recognition.onend = () => {
      setIsListening(false);
      setTranscript("");
    };

    return () => {
      if (recognition) recognition.stop();
    };
  }, []);

  const startListening = () => {
    if (recgonitionRef.current && !isListening) {
      recgonitionRef.current.start();
      setIsListening(true);
    }
  };

  const stopListening = () => {
    if (recgonitionRef.current && isListening) {
      recgonitionRef.current.stop();
      setIsListening(false);
    }
  };

  return { isListening, transcript, startListening, stopListening };
};

export default SpeechToText;
