import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
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

  useEffect(() => {
    const fetchTrackInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/spotify/track/${trackId}`);
        setTrackInfo(response.data);
      } catch (error) {
        console.error('Error fetching track info:', error);
      }
    };

    if (trackId) {
      fetchTrackInfo();
    }
  }, [trackId]);

  useEffect(() => {
    const audioElement = audioRef.current;

    if (audioElement && trackInfo) {
      const playAudio = () => {
        audioElement.currentTime = 0;
        audioElement.play().catch(error => {
          console.error('Error attempting to play audio:', error);
        });
      };

      // Set the audio to start playing from the beginning
      playAudio();

      // Stop playback after 30 seconds
      const stopPlayback = () => {
        setTimeout(() => {
          audioElement.pause();
        }, 30000);
      };

      // Ensure playback stops after 30 seconds
      stopPlayback();

      // Cleanup function to remove event listeners
      return () => {
        audioElement.removeEventListener('play', playAudio);
      };
    }
  }, [trackInfo]);

  const handleLike = async () => {
    setLiked(!liked);

    try {
      await axios.post('http://localhost:8000/music/likes', {
        spotify: trackId,
        like: !liked,
      });
    } catch (error) {
      console.error('Error updating like status:', error);
    }
  };

  const handleClose = () => {
    onClose();
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
