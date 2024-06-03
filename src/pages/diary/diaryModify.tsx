import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthProvider";
import api from "../../axiosInterceptor";
import * as S from "./Styles/WriteDiary.style";

interface DiaryModifyProps {
  diaryId: number;
  title: string;
  comment: string;
}

const DiaryModify = () => {
  const [diaryInfo, setDiaryInfo] = useState<DiaryModifyProps | null>(null);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    const params = new URLSearchParams(location.search);
    const year = params.get("year");
    const month = params.get("month");
    const day = params.get("day");

    if (year && month && day) {
      fetchDiaryInfo(parseInt(year), parseInt(month), parseInt(day));
    }
  }, [location, isLoggedIn]);

  const fetchDiaryInfo = async (year: number, month: number, day: number) => {
    try {
      const response = await api.get("/diary/calendar/day", {
        params: { year, month, day },
      });
      const diaryData = response.data;
      setDiaryInfo(diaryData);
      setTitle(decodeText(diaryData.title));
      setComment(decodeText(diaryData.comment));
    } catch (error: any) {
      console.log("Failed to fetch diary info:", error);
    }
  };

  const decodeText = (text: string) => {
    return decodeURIComponent(text).replace(/\+/g, " ");
  };

  const handleSaveClick = async (e: React.FormEvent) => {
    e.preventDefault();
    if (diaryInfo) {
      try {
        await api.put(
          `/diary/${diaryInfo.diaryId}`,
          {
            title: encodeURIComponent(title),
            comment: encodeURIComponent(comment),
          }
        );
        navigate("/");
      } catch (error: any) {
        console.log("Failed to save diary info:", error);
        if (error.response && error.response.status === 302) {
          console.log("Redirect loop detected. Check the backend configuration.");
        }
      }
    }
  };

  const handleCancelClick = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <S.Container>
      <S.Form onSubmit={handleSaveClick}>
        <S.Header>제목</S.Header>
        <S.Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <S.Header>내용</S.Header>
        <S.TextArea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <S.ButtonGroup>
          <S.Button type="submit">저장</S.Button>
          <S.Button type="button" onClick={handleCancelClick}>취소</S.Button>
        </S.ButtonGroup>
      </S.Form>
    </S.Container>
  );
};

export default DiaryModify;