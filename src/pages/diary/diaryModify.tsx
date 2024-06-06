import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../axiosInterceptor";
import EmotionModal from "./EmotionModal";
import MusicModal from "./MusicModal";
import * as S from "./Styles/WriteDiary.style";

const generateStarPositions = (numStars: number) => {
  return Array.from({ length: numStars }).map(() => ({
    top: Math.random() * 100 + "%",
    left: Math.random() * 100 + "%",
  }));
};

const Stars = () => {
  const [starPositions, setStarPositions] = useState(generateStarPositions(50));

  useEffect(() => {
    setStarPositions(generateStarPositions(50));
  }, []);

  return (
    <>
      {starPositions.map((pos, index) => (
        <S.Star key={index} style={{ top: pos.top, left: pos.left }} />
      ))}
    </>
  );
};

function ModifyDiary() {
  const location = useLocation();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [currentYear, setCurrentYear] = useState<number | null>(null);
  const [currentMonth, setCurrentMonth] = useState<number | null>(null);
  const [images, setImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
  const [maintainEmotion, setMaintainEmotion] = useState<boolean>(false);
  const [isSongModalOpen, setIsSongModalOpen] = useState(false);
  const [trackId, setTrackId] = useState<string | null>(null);
  const [likedSongs, setLikedSongs] = useState<string[]>([]);
  const [like, setLike] = useState<boolean>(false); // 좋아요 상태를 추가

  const socialId = localStorage.getItem("socialId") || "";

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const year = searchParams.get("year");
    const month = searchParams.get("month");
    const day = searchParams.get("day");

    if (year && month && day) {
      setCurrentYear(Number(year));
      setCurrentMonth(Number(month));
      setSelectedDate(Number(day));
      fetchDiary(Number(year), Number(month), Number(day));
    }
  }, [location.search]);

  useEffect(() => {
    const fetchLikedSongs = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/music/likes`);
        const likedTracks = Array.isArray(response.data)
          ? response.data.map((item: any) => item.spotify)
          : [];
        setLikedSongs(likedTracks);
        localStorage.setItem("likedSongs", JSON.stringify(likedTracks));
      } catch (error) {
        console.error("Error fetching liked songs:", error);
      }
    };

    const storedLikedSongs = localStorage.getItem("likedSongs");
    if (storedLikedSongs) {
      setLikedSongs(JSON.parse(storedLikedSongs));
    } else {
      fetchLikedSongs();
    }
  }, [socialId]);

  const fetchDiary = async (year: number, month: number, day: number) => {
    try {
      const response = await api.get("/diary/calendar/day", {
        params: { year, month, day },
      });
      const diary = response.data;
      setTitle(decodeText(diary.title));
      setContent(decodeText(diary.comment));
      setExistingImages(diary.imgUrl);
      setSelectedEmotion(diary.emotion);
      setTrackId(diary.spotify);
      setLike(diary.like); // diary 데이터에서 like 값 설정
    } catch (error) {
      console.error("Error fetching diary:", error);
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= 4000) {
      setContent(value);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      if (images.length + selectedFiles.length + existingImages.length > 9) {
        alert("이미지는 최대 9개까지 업로드할 수 있습니다.");
        return;
      }
      setImages((prevImages) => [...prevImages, ...selectedFiles]);
    }
  };

  const handleSave = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!currentYear || !currentMonth || selectedDate === null) {
      alert("날짜를 선택해주세요.");
      return;
    }

    if (!selectedEmotion) {
      setIsModalOpen(true); // 모달 열기
      return;
    }

    const formData = new FormData();
    formData.append("year", currentYear.toString());
    formData.append("month", currentMonth.toString());
    formData.append("day", selectedDate.toString());
    formData.append("title", title);

    const diaryData = JSON.stringify({
      title,
      comment: content,
      emotion: selectedEmotion,
      maintain: maintainEmotion.toString(),
    });
    formData.append(
      "diary",
      new Blob([diaryData], { type: "application/json" })
    );

    images.forEach((image) => formData.append("images", image));

    try {
      const response = await api.put(`/diary/calendar`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization-Access": `Bearer ${localStorage.getItem(
            "accessToken"
          )}`,
          "Authorization-Refresh": `Bearer ${localStorage.getItem(
            "refreshToken"
          )}`,
        },
      });

      setTrackId(response.data.spotify);
      setLike(response.data.like); // 응답에서 like 값 설정
      setIsSongModalOpen(true); // 노래 모달 열기
    } catch (error) {
      console.error("Error saving diary:", error);

      if (axios.isAxiosError(error)) {
        console.error("응답 데이터:", error.response?.data);
        console.error("응답 상태:", error.response?.status);
        console.error("응답 헤더:", error.response?.headers);
        if (error.response?.status === 401) {
          alert("인증 오류입니다. 다시 로그인해주세요.");
          navigate("/login");
        }
      } else {
        console.error("에러 메시지:");
      }
    }
  };

  const handleEmotionSelect = (emotion: string, maintain: boolean) => {
    setSelectedEmotion(emotion);
    setMaintainEmotion(maintain);
    setIsModalOpen(false);
    handleSave();
  };

  const toggleLike = (trackId: string) => {
    setLikedSongs((prevLikedSongs) => {
      const updatedLikedSongs = prevLikedSongs.includes(trackId)
        ? prevLikedSongs.filter((id) => id !== trackId)
        : [...prevLikedSongs, trackId];
      localStorage.setItem("likedSongs", JSON.stringify(updatedLikedSongs));
      return updatedLikedSongs;
    });
  };

  const handleDeleteImage = (url: string) => {
    setExistingImages((prevImages) =>
      prevImages.filter((image) => image !== url)
    );
  };

  const decodeText = (text: string) => {
    return decodeURIComponent(text).replace(/\+/g, " ");
  };

  return (
    <S.Background>
      <Stars />
      <S.Container>
        <S.Header>감성 일기 수정</S.Header>
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
            maxLength={1000} // This will also prevent typing beyond 1000 characters
          />
          <S.FileInput type="file" multiple onChange={handleFileChange} />
          <S.ImagePreviewContainer>
            {existingImages.map((url, index) => (
              <S.ImagePreview key={index}>
                <img src={url} alt={`Diary Image ${index + 1}`} />
                <S.DeleteButton onClick={() => handleDeleteImage(url)}>
                  삭제
                </S.DeleteButton>
              </S.ImagePreview>
            ))}
          </S.ImagePreviewContainer>
          <S.ButtonGroup>
            <S.Button type="submit">일기 수정</S.Button>
          </S.ButtonGroup>
        </S.Form>
        {isModalOpen && (
          <EmotionModal
            onClose={() => setIsModalOpen(false)}
            onSelect={handleEmotionSelect}
          />
        )}
        {isSongModalOpen && trackId && (
          <MusicModal
            trackId={trackId}
            socialId={socialId}
            onClose={() => setIsSongModalOpen(false)}
            like={like} // like 값을 전달
          />
        )}
      </S.Container>
    </S.Background>
  );
}

export default ModifyDiary;
