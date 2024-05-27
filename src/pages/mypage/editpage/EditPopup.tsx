import React, { useEffect, useState } from "react";
import * as S from "../Styles/EditPopup.style";
import axios from "axios";
import { motion } from "framer-motion";
import api from "../../../axiosInterceptor";

function EditPopup({ onClose }: any) {
  const [showNicknameInput, setShowNicknameInput] = useState(false);
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState<string | ArrayBuffer | null>(
    null
  );
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      api.defaults.headers.common["Authorization-Access"] = `Bearer ${token}`;
    } else {
      console.log("token error");
    }
  }, []);

  const handleNicknameChange = (event: any) => {
    setNickname(event.target.value);
  };

  const handleProfileImageChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
      setSelectedImage(file);
    }
  };

  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value);
  };

  // 프로필 수정
  const handleProfileUpdate = async () => {
    if (!selectedImage && !nickname) {
      alert("프로필 사진 또는 닉네임을 변경해야 합니다.");
      return;
    }
    const formData = new FormData();
    if (selectedImage) {
      formData.append("images", selectedImage);
      console.log("Added image to formData: ", selectedImage);
    }
    if (nickname) {
      const nickNameRequest = JSON.stringify({ nickName: nickname });
      const blob = new Blob([nickNameRequest], { type: "application/json" });
      formData.append("nickName", blob);
      console.log("Added nickname to formData: ", nickname);
    }

    try {
      formData.forEach((value, key) => {
        console.log("form data key:", key, "form data value:", value);
      });
      const response = await api.put("/reset/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Profile updated:", response.data);
      if (response.data.url) {
        setProfileImage(response.data.url);
        console.log("new profileImage updated");
      }
      alert("프로필이 성공적으로 업데이트되었습니다.");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("프로필 업데이트 중 오류가 발생했습니다.");
    }
  };

  // 비밀번호 초기화
  const handlePasswordConfirm = async () => {};

  return (
    <S.Overlay>
      <motion.div
        variants={PopVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.5 }}
      >
        <S.PopupContainer>
          <S.CloseButton onClick={onClose}>X</S.CloseButton>
          <S.ProfileContainer>
            <S.ProfileImageContainer>
              <S.ProfileImage src={profileImage as string} alt="Profile" />
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
      </motion.div>
    </S.Overlay>
  );
}

export default EditPopup;

const PopVariants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 },
};
