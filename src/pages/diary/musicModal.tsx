import axios from "axios";
import { AnimatePresence } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./Styles/WriteDiary.style";

interface MusicModalProps {
  trackId: string;
  socialId: string;
  onClose: () => void;
  like: boolean;
}

export interface Artist {
  name: string;
}

export interface Album {
  name: string;
  images: { url: string }[];
  release_date: string;
}

export interface TrackInfo {
  id: string;
  name: string;
  artists: Artist[];
  album: Album;
  preview_url: string | null;
  duration_ms: number;
  isLiked: boolean;
  haveSeen: boolean;
}

const MusicModal: React.FC<MusicModalProps> = ({ trackId, socialId, onClose, like }) => {
  const [trackInfo, setTrackInfo] = useState<TrackInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showNotification, setShowNotification] = useState<string | null>(null);
  const [isLiked, setIsLiked] = useState<boolean>(like);
  const audioRef = useRef<HTMLAudioElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrackInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/spotify/track/${trackId}`, {
          params: { socialId }
        });
        if (response.data.status_code === 200) {
          const trackData = response.data.response;
          setTrackInfo(trackData);
          setError(null);
        } else {
          handleErrorResponse(response.data.status_code);
        }
      } catch (error) {
        console.error("트랙 정보를 가져오는 중 오류 발생:", error);
        setError("트랙 정보를 가져오지 못했습니다. 나중에 다시 시도하십시오.");
      }
    };

    if (trackId) {
      fetchTrackInfo();
    }
  }, [trackId, socialId]);

  const handleErrorResponse = (statusCode: number) => {
    switch (statusCode) {
      case 204:
        setError("스포티파이 토큰을 검색할 수 없습니다.");
        break;
      case 404:
        setError("트랙 내용을 찾을 수 없습니다. 다른 트랙을 시도하십시오.");
        break;
      case 503:
        setError("스포티파이 코드가 200이 아닙니다.");
        break;
      default:
        setError("Unknown error occurred.");
    }
  };

  const handleClose = () => {
    onClose();
    navigate("/");
  };

  const handleLikeToggle = async () => {
    if (!trackInfo) return;

    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (!accessToken || !refreshToken) {
      console.error("Missing tokens, redirecting to login.");
      return;
    }

    const config = {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Authorization-Refresh': `Bearer ${refreshToken}`,
        'Content-Type': 'application/json'
      }
    };

    const data = {
      socialId: socialId,
      spotify: trackId,
      like: !isLiked
    };

    try {
      const url = "http://localhost:8080/music/likes";
      const method = trackInfo.haveSeen ? 'PUT' : 'POST';

      const response = await axios({
        method: method,
        url: url,
        headers: config.headers,
        data: data
      });

      if (response.status === 204 || response.status === 200) {
        setIsLiked(!isLiked);
        setShowNotification(isLiked ? "좋아요를 취소했습니다." : "좋아요를 누르셨습니다.");
        setTimeout(() => setShowNotification(null), 2000);
      } else {
        console.error("Unexpected response status:", response.status);
      }
    } catch (error) {
      console.error("Error updating like status:", error);
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 401) {
          console.error("Unauthorized, please login again.");
        }
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }
  };

  return (
    <S.ModalOverlay>
      <S.ModalContainer onClick={(e) => e.stopPropagation()}>
        <S.ModalContent>
          <h3>추천 노래</h3>
          {error ? (
            <p>{error}</p>
          ) : trackInfo ? (
            <>
              <div>
                {trackInfo.name} -{" "}
                {trackInfo.artists.map((artist) => artist.name).join(", ")}
              </div>
              <div>Album: {trackInfo.album.name}</div>
              <S.AlbumCover
                src={trackInfo.album.images[0].url}
                alt="Album Cover"
              />
              {trackInfo.preview_url ? (
                <audio ref={audioRef} autoPlay>
                  <source src={trackInfo.preview_url ?? undefined} type="audio/mpeg" />
                </audio>
              ) : (
                <p>이 곡은 재생할 수 없습니다.</p>
              )}
              <S.LikeButton onClick={handleLikeToggle}>
                {isLiked ? "❤️" : "🤍"}
              </S.LikeButton>
              <AnimatePresence>
                {showNotification && (
                  <S.Notification
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {showNotification}
                  </S.Notification>
                )}
              </AnimatePresence>
            </>
          ) : (
            <p>노래를 추천중입니다...</p>
          )}
          <S.ModalButton onClick={handleClose}>×</S.ModalButton>
        </S.ModalContent>
      </S.ModalContainer>
    </S.ModalOverlay>
  );
};

export default MusicModal;