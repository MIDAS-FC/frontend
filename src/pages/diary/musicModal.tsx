<<<<<<< HEAD
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
=======
import axios from 'axios';
import { AnimatePresence } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
>>>>>>> 8897f4c95182d2647bad5fb9757446bb81064816
import * as S from "./Styles/WriteDiary.style";

interface MusicModalProps {
  trackId: string;
  likedSongs: string[];
  toggleLike: (trackId: string) => void;
  onClose: () => void;
}

interface Artist {
  name: string;
}

interface Album {
  name: string;
  images: { url: string }[];
}

interface TrackInfo {
  name: string;
  artists: Artist[];
  album: Album;
  preview_url: string | null;
}

const MusicModal: React.FC<MusicModalProps> = ({
  trackId,
  likedSongs,
  toggleLike,
  onClose,
}) => {
  const [trackInfo, setTrackInfo] = useState<TrackInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showNotification, setShowNotification] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrackInfo = async () => {
      try {
<<<<<<< HEAD
        const response = await axios.get(
          `http://localhost:8000/spotify/track/${trackId}`
        );
        setTrackInfo(response.data);
      } catch (error) {
        console.error("Error fetching track info:", error);
=======
        const response = await axios.get(`http://localhost:8000/spotify/track/${trackId}`);
        
        switch (response.data.status_code) {
          case 200:
            setTrackInfo(response.data.response);
            setError(null);
            break;
          case 204:
            setError('스포티파이 토큰을 검색할 수 없습니다.');
            break;
          case 404:
            setError('트랙 내용을 찾을 수 없습니다. 다른 트랙을 시도하십시오.');
            break;
          case 503:
            setError('스포티파이 코드가 200이 아닙니다.');
            break;
          default:
            setError('Unknown error occurred.');
        }
      } catch (error) {
        console.error('트랙 정보를 가져오는 중 오류 발생:', error);
        setError('트랙 정보를 가져오지 못했습니다. 나중에 다시 시도하십시오.');
>>>>>>> 8897f4c95182d2647bad5fb9757446bb81064816
      }
    };

    if (trackId) {
      fetchTrackInfo();
    }
  }, [trackId]);

  const handleClose = () => {
    onClose();
    navigate("/");
  };

  const handleLikeToggle = async () => {
    try {
      await axios.post("http://localhost:8080/music/likes", {
        spotify: trackId,
        like: !likedSongs.includes(trackId),
      });
      toggleLike(trackId);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 2000); // 2초 후에 알림창 사라짐
    } catch (error) {
      console.error("Error updating like status:", error);
    }
  };

  const isLiked = likedSongs.includes(trackId);

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
<<<<<<< HEAD
              <img
                src={trackInfo.album.images[0].url}
                alt="Album Cover"
                style={{ width: "100%", maxWidth: "300px", margin: "10px 0" }}
              />
              <audio ref={audioRef} controls autoPlay>
                <source src={trackInfo.preview_url} type="audio/mpeg" />
              </audio>
              <S.LikeButton
                onClick={handleLikeToggle}
                style={{ fontSize: "2rem" }}
              >
                {isLiked ? "❤️" : "🤍"}
=======
              <S.AlbumCover src={trackInfo.album.images[0].url} alt="Album Cover" />
              {trackInfo.preview_url ? (
                <audio ref={audioRef} controls autoPlay>
                  <source src={trackInfo.preview_url ?? undefined} type="audio/mpeg" />
                </audio>
              ) : (
                <p>이 곡은 재생할 수 없습니다.</p>
              )}
              <S.LikeButton onClick={handleLikeToggle}>
                {isLiked ? '❤️' : '🤍'}
>>>>>>> 8897f4c95182d2647bad5fb9757446bb81064816
              </S.LikeButton>
              <AnimatePresence>
                {showNotification && (
                  <S.Notification
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
<<<<<<< HEAD
                    style={{
                      position: "fixed",
                      bottom: "20px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      background: "rgba(0, 0, 0, 0.7)",
                      color: "white",
                      padding: "10px 20px",
                      borderRadius: "5px",
                      zIndex: 1000,
                    }}
=======
>>>>>>> 8897f4c95182d2647bad5fb9757446bb81064816
                  >
                    좋아요를 누르셨습니다.
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