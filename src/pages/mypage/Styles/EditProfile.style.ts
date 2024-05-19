import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ProfileImageContainer = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  margin-right: 20px;
`;

export const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 20px;
  border: 1px solid #ccc;
`;

export const ChangePhotoButton = styled.button`
  position: absolute;
  bottom: 10px;
  left: 10px;
  width: 30px;
  height: 30px;
  background-color: #ccc;
  border: none;
  border-radius: 50%;
  cursor: pointer;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const UserName = styled.h2`
  font-size: 20px;
  margin: 0;
  margin-bottom: 10px;
`;

export const Buttons = styled.div`
  display: flex;
  gap: 10px;
`;

export const NicknameButton = styled.button`
  background: none;
  border: none;
  color: #888;
  cursor: pointer;
  font-size: 14px;
`;

export const ResetPasswordButton = styled.button`
  background: none;
  border: none;
  color: #888;
  cursor: pointer;
  font-size: 14px;
`;
