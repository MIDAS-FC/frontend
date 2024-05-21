import React, { useState } from "react";
import * as S from "../Styles/EditPopup.style";
import axios from "axios";

function EditPopup({ onClose }: any) {
  const [showNicknameInput, setShowNicknameInput] = useState(false);
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState("");

  const handleNicknameChange = (event: any) => {
    setNickname(event.target.value);
  };

  const handleProfileImageChange = (event: any) => {
    setProfileImage(event.target.files[0]);
  };

  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value);
  };

  // 프로필 수정
  const handleProfileUpdate = async () => {
    // if (!profileImage && !nickname) {
    //   alert("프로필 사진 또는 닉네임을 변경해야 합니다.");
    //   return;
    // }

    const formData = new FormData();
    if (profileImage) {
      formData.append("images", profileImage);
    }
    if (nickname) {
      formData.append(
        "nickName",
        new Blob([JSON.stringify({ nickName: nickname })], {
          type: "application/json",
        })
      );
    }

    try {
      const response = await axios.put("/reset/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Profile updated:", response.data);
      if (response.data.url) {
        setProfileImage(response.data.url);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  // 비밀번호 초기화
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
                onChange={handleProfileImageChange}
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
            <button onClick={handleProfileUpdate}>
              프로필 변경(사진,닉네임)
            </button>
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
