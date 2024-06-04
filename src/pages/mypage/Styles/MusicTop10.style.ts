import styled from "styled-components";

export const Container = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 0 auto;
`;

export const TrackList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const TrackItem = styled.div`
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 8px;
  padding: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const AlbumCover = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 4px;
  margin-right: 16px;
`;

export const TrackName = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: bold;
`;

export const ArtistName = styled.p`
  margin: 4px 0 0 0;
  font-size: 14px;
  color: #666;
`;

export const LikeCount = styled.p`
  margin: 4px 0 0 0;
  font-size: 14px;
  color: #333;
`;
