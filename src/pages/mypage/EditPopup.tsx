import React, { useState } from "react";
import * as S from "./Styles/EditPopup.style";
import axios from "axios";

// 프로필수정-프로필사진, 닉네임 변경 함께

function EditPopup({ onClose }: any) {
  const [showNicknameInput, setShowNicknameInput] = useState(false);
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState("");

  const handleNicknameChange = (event: any) => {
    setNickname(event.target.value);
  };

  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value);
  };

  const handleImageUpload = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const handlePasswordConfirm = async () => {
    try {
      const response = await axios.put("/auth/reset/password", {
        password: password,
      });
      console.log("Password updated:", response.data);
    } catch (error) {
      console.error("Error updating password:", error);
    }
  };

  return (
    <S.Overlay>
      <S.PopupContainer>
        <S.CloseButton onClick={onClose}>X</S.CloseButton>
        <S.ProfileContainer>
          <S.ProfileImageContainer>
            <S.ProfileImage src={profileImage} alt="Profile" />
            <S.GrayCircle>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: "none" }}
                id="image-upload"
              />
              <label htmlFor="image-upload">📷</label>
            </S.GrayCircle>
          </S.ProfileImageContainer>
          <S.UserInfo>
            <S.UserName>UserName</S.UserName>
            <S.NicknameButton
              onClick={() => setShowNicknameInput(!showNicknameInput)}
            >
              닉네임 변경
            </S.NicknameButton>
            {showNicknameInput && (
              <S.InputContainer>
                <S.Input
                  type="text"
                  value={nickname}
                  onChange={handleNicknameChange}
                  placeholder="새 닉네임"
                />
              </S.InputContainer>
            )}
            <S.ResetPasswordButton
              onClick={() => setShowPasswordInput(!showPasswordInput)}
            >
              비밀번호 초기화
            </S.ResetPasswordButton>
            {showPasswordInput && (
              <S.InputContainer>
                <S.Input
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="새 비밀번호"
                />
                <S.ConfirmButton onClick={handlePasswordConfirm}>
                  확인
                </S.ConfirmButton>
              </S.InputContainer>
            )}
          </S.UserInfo>
        </S.ProfileContainer>
      </S.PopupContainer>
    </S.Overlay>
  );
}

export default EditPopup;
