import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from '../../axiosInterceptor';
import * as S from "./Styles/WriteDiary.style";

function WriteDiary() {
  const location = useLocation();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [currentYear, setCurrentYear] = useState<number | null>(null);
  const [currentMonth, setCurrentMonth] = useState<number | null>(null);
  const [images, setImages] = useState<File[]>([]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const year = searchParams.get("year");
    const month = searchParams.get("month");
    const day = searchParams.get("day");

    if (year && month && day) {
      setCurrentYear(Number(year));
      setCurrentMonth(Number(month));
      setSelectedDate(Number(day));
    }
  }, [location.search]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentYear || !currentMonth || !selectedDate) {
      alert("날짜를 선택해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append('year', currentYear.toString());
    formData.append('month', currentMonth.toString());
    formData.append('day', selectedDate.toString());

    const diaryData = JSON.stringify({ title, comment: content });
    formData.append('diary', new Blob([diaryData], { type: "application/json" }));

    images.forEach((image) => formData.append('images', image));

    try {
      const response = await api.post('/diary/calendar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response);
      alert("일기가 저장되었습니다!");
    } catch (error: any) {
      console.error("Error saving diary:", error);
      if (error.response) {
        console.error("응답 데이터:", error.response.data);
        console.error("응답 상태:", error.response.status);
        console.error("응답 헤더:", error.response.headers);
      } else if (error.request) {
        console.error("요청 데이터:", error.request);
      } else {
        console.error("에러 메시지:", error.message);
      }

      if (error.response?.status === 401) {
        alert("인증 오류입니다. 다시 로그인해주세요.");
        navigate("/login");
      }
    }
  };

  return (
    <S.Container>
      <S.Header>감성 일기작성</S.Header>
      <div>
        {currentYear}년 {currentMonth}월 {selectedDate}일
      </div>
      <S.Form onSubmit={handleSave}>
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
        <S.FileInput
          type="file"
          multiple
          onChange={handleFileChange}
        />
        <S.ButtonGroup>
          <S.Button type="submit">일기 작성</S.Button>
        </S.ButtonGroup>
      </S.Form>
    </S.Container>
  );
}

export default WriteDiary;
