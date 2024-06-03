import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from "./Styles/WriteDiary.style";

interface MusicModalProps {
  trackId: string;
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

const MusicModal: React.FC<MusicModalProps> = ({ trackId, onClose }) => {
  const [trackInfo, setTrackInfo] = useState<TrackInfo | null>(null);
  const [liked, setLiked] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrackInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/spotify/track/7wAkQFShJ27V8362MqevQr`);
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
    navigate("/");
  };

  return (
    <S.ModalOverlay onClick={handleClose}>
      <S.ModalContainer onClick={(e) => e.stopPropagation()}>
        <S.ModalContent>
          <h3>추천 노래</h3>
          {trackInfo ? (
            <>
              <div>{trackInfo.name} - {trackInfo.artists.map(artist => artist.name).join(', ')}</div>
              <div>Album: {trackInfo.album.name}</div>
              <img src={trackInfo.album.images[0].url} alt="Album Cover" style={{ width: '100%', maxWidth: '300px', margin: '10px 0' }} />
              <audio ref={audioRef} controls autoPlay>
                <source src={trackInfo.preview_url} type="audio/mpeg" />
              </audio>
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
