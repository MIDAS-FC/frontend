import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: auto;
`;

export const Title = styled.h2`
  font-size: 28px;
  color: #333;
  margin-bottom: 20px;
`;

export const ProfileImageContainer = styled.div`
  position: relative;
  width: 170px;
  height: 170px;
  margin-bottom: 20px;
  border-radius: 20%;
  overflow: hidden;
  background-color: #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

export const UserName = styled.h3`
  font-size: 24px;
  margin: 0;
  margin-bottom: 10px;
  color: #333;
`;

export const EditSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
`;

export const EditButton = styled.button`
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  background-color: #87ceeb;
  color: white;
  transition: background-color 0.3s;
  &:hover {
    background-color: #5dade2;
  }
`;

export const EditText = styled.p`
  font-size: 14px;
  color: #666;
`;
