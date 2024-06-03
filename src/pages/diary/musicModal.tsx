import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  preview_url: string;
}

const MusicModal: React.FC<MusicModalProps> = ({
  trackId,
  likedSongs,
  toggleLike,
  onClose,
}) => {
  const [trackInfo, setTrackInfo] = useState<TrackInfo | null>(null);
  const [showNotification, setShowNotification] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrackInfo = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/spotify/track/${trackId}`
        );
        setTrackInfo(response.data);
      } catch (error) {
        console.error("Error fetching track info:", error);
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
      setTimeout(() => setShowNotification(false), 5000); // 5초 후에 알림창 사라짐
    } catch (error) {
      console.error("Error updating like status:", error);
    }
  };

  const isLiked = likedSongs.includes(trackId);

  return (
    <S.ModalOverlay onClick={handleClose}>
      <S.ModalContainer onClick={(e) => e.stopPropagation()}>
        <S.ModalContent>
          <h3>추천 노래</h3>
          {trackInfo ? (
            <>
              <div>
                {trackInfo.name} -{" "}
                {trackInfo.artists.map((artist) => artist.name).join(", ")}
              </div>
              <div>Album: {trackInfo.album.name}</div>
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
              </S.LikeButton>
              <AnimatePresence>
                {showNotification && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
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
                  >
                    좋아요를 누르셨습니다.
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          ) : (
            <p>노래를 추천중입니다...</p>
          )}
          <S.ModalButton onClick={handleClose}>닫기</S.ModalButton>
        </S.ModalContent>
      </S.ModalContainer>
    </S.ModalOverlay>
  );
};

export default MusicModal;
