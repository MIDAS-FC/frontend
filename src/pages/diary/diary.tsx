import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import * as S from "./Styles/WriteDiary.style";

function WriteDiary() {
  const location = useLocation();
  const { day, month, year } = location.state || {};
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleSave = () => {
    // 저장 로직 구현
    alert("일기가 저장되었습니다!");
  };

  return (
    <S.Container>
      <S.Header>감성 일기작성</S.Header>
      <div>
        {year}년 {month}월 {day}일
      </div>
      <S.Form>
        <S.Input
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="제목을 입력하세요"
        />
        <S.TextArea
          value={content}
          onChange={handleContentChange}
          placeholder="오늘의 이야기를 들려주세요..."
        />
        <S.ButtonGroup>
          <S.Button onClick={handleSave}>일기 작성</S.Button>
        </S.ButtonGroup>
      </S.Form>
    </S.Container>
  );
}

export default WriteDiary;
