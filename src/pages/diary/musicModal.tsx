import axios from 'axios';
import { AnimatePresence } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

const MusicModal: React.FC<MusicModalProps> = ({ trackId, likedSongs, toggleLike, onClose }) => {
  const [trackInfo, setTrackInfo] = useState<TrackInfo | null>(null);
  const [showNotification, setShowNotification] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrackInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/spotify/track/${trackId}`);
        console.log("Track info:", response.data);  // 로그 추가
        setTrackInfo(response.data);
      } catch (error) {
        console.error('Error fetching track info:', error);
      }
    };

    if (trackId) {
      fetchTrackInfo();
    }
  }, [trackId]);

  const handleClose = () => {
    onClose();
    navigate('/');
  };

  const handleLikeToggle = async () => {
    try {
      await axios.post('http://localhost:8080/music/likes', {
        spotify: trackId,
        like: !likedSongs.includes(trackId),
      });
      toggleLike(trackId);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 2000); // 2초 후에 알림창 사라짐
    } catch (error) {
      console.error('Error updating like status:', error);
    }
  };

  const isLiked = likedSongs.includes(trackId);

  return (
    <S.ModalOverlay>
      <S.ModalContainer onClick={(e) => e.stopPropagation()}>
        <S.ModalContent>
          <h3>추천 노래</h3>
          {trackInfo ? (
            <>
              <div>{trackInfo.name} - {trackInfo.artists.map(artist => artist.name).join(', ')}</div>
              <div>Album: {trackInfo.album.name}</div>
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
              </S.LikeButton>
              <AnimatePresence>
                {showNotification && (
                  <S.Notification
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
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