<<<<<<< HEAD
import React, { useState } from "react";
import api from "../../axiosInterceptor";
=======
import React, { useEffect, useState } from 'react';
import api from '../../axiosInterceptor';
import * as S from './Styles/Admin.style';


const generateStarPositions = (numStars: number) => {
    return Array.from({ length: numStars }).map(() => ({
      top: Math.random() * 100 + '%',
      left: Math.random() * 100 + '%'
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
>>>>>>> 8897f4c95182d2647bad5fb9757446bb81064816

const AdminPage: React.FC = () => {
  const [playlist, setPlaylist] = useState<string>("");

  const getToken = () => localStorage.getItem("token"); // 토큰을 로컬 스토리지에서 가져오는 함수

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlaylist(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const token = getToken();
      const response = await api.post(
        "/admin/music",
        {
          playlist: playlist,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 204) {
        alert("Playlist가 성공적으로 업데이트 되었습니다.");
      }
    } catch (error) {
      console.error("Playlist update error: ", error);
      alert("Failed to update playlist.");
    }
  };

<<<<<<< HEAD
  return (
    <div>
      <h1>Admin Page</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Playlist:
          <input type="text" value={playlist} onChange={handleChange} />
        </label>
        <button type="submit">Update Playlist</button>
      </form>
    </div>
  );
=======
    return (
        <S.Container>
            <Stars/>
            <S.Form onSubmit={handleSubmit}>
                <S.Label>
                    <S.Input type="text" value={playlist} onChange={handleChange} placeholder="Enter playlist URL" />
                </S.Label>
                <S.Button type="submit">Update Playlist</S.Button>
            </S.Form>
        </S.Container>
    );
>>>>>>> 8897f4c95182d2647bad5fb9757446bb81064816
};

export default AdminPage;
