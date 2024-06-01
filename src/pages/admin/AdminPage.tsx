import axios from 'axios';
import React, { useState } from 'react';

const AdminPage: React.FC = () => {
    const [playlist, setPlaylist] = useState<string>('');

    const getToken = () => localStorage.getItem('token');  // 토큰을 로컬 스토리지에서 가져오는 함수

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPlaylist(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        try {
            const token = getToken();
            const response = await axios.post('http://localhost:8080/admin/music', {
                playlist: playlist
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.status === 204) {
                alert('Playlist가 성공적으로 업데이트 되었습니다.');
            }
        } catch (error) {
            console.error('Playlist update error: ', error);
            alert('Failed to update playlist.');
        }
    };

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
};

export default AdminPage;
