import React, { useEffect, useState } from "react";
import * as S from "../Styles/EditPopup.style";
import axios from "axios";
import { motion } from "framer-motion";
import api from "../../../axiosInterceptor";

function EditPopup({ onClose }: any) {
  const [showNicknameInput, setShowNicknameInput] = useState(false);
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [Chanegednickname, setChangedNickname] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState<string | ArrayBuffer | null>(
    null
  );
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const presentNickName = "Username";

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      api.defaults.headers.common["Authorization-Access"] = `Bearer ${token}`;
    } else {
      console.log("token error");
    }
  }, []);

  const handleNicknameChange = (event: any) => {
    setChangedNickname(event.target.value);
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

  // 프로필 사진 수정
  const handleProfileImageUpdate = async () => {
    if (!selectedImage) {
      alert("프로필 사진을 변경해야 합니다.");
      return;
    }
    const formData = new FormData();
    formData.append(
      "nickName",
      new Blob([JSON.stringify({ nickName: presentNickName })], {
        type: "application/json",
      })
    );
    formData.append("images", selectedImage);
    // if (selectedImage) {
    //   formData.append("images", selectedImage);
    //   console.log("Added image to formData: ", selectedImage);
    // }
    // if (presentNickName) {
    //   const nickNameRequest = JSON.stringify({ nickName: presentNickName });
    //   const blob = new Blob([nickNameRequest], { type: "application/json" });
    //   formData.append("nickName", blob);
    //   console.log("Added nickname to formData: ", presentNickName);
    // }

    try {
      formData.forEach((value, key) => {
        console.log(
          "[form data key: ",
          key,
          "]",
          "[form data value: ",
          value,
          "]"
        );
      });
      const response = await axios.put("/reset/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // const response = await api.put("/reset/profile", formData);
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

  // 닉네임 수정
  const handleNicknameUpdate = async () => {
    if (!Chanegednickname) {
      alert("닉네임을 입력해야 합니다.");
      return;
    }

    const nickNameRequest = JSON.stringify({
      presentNickName: presentNickName,
      changeNickName: Chanegednickname,
    });

    // const nickNameRequest = {
    //   presentNickName: presentNickName,
    //   changeNickName: Chanegednickname,
    // };

    try {
      const response = await api.put("/reset/nickname", nickNameRequest, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Nickname updated:", response);
      if (response.status === 204) {
        alert("닉네임이 성공적으로 업데이트되었습니다.");
      } else {
        throw new Error("Failed to update nickname");
      }
      alert("닉네임이 성공적으로 업데이트되었습니다.");
    } catch (error) {
      console.error("Error updating nickname:", error);
      alert("닉네임 업데이트 중 오류가 발생했습니다.");
    }
  };

  // 비밀번호 초기화
  const handlePasswordReset = async () => {
    try {
      const response = await api.post("/auth/register", {
        password: password,
      });
      if (response && response.status === 204) {
        alert("비밀번호가 초기화되었습니다.");
        setShowPasswordInput(false);
      } else {
        throw new Error("Failed to reset password");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      alert("비밀번호 초기화 중 오류가 발생했습니다.");
    }
  };

  // 비밀번호 변경
  const handlePasswordConfirm = async () => {
    try {
      const response = await api.put("/auth/reset/password", {
        password: password,
      });
      if (response && response.status === 204) {
        alert("비밀번호가 변경되었습니다.");
        setShowPasswordInput(false);
      } else {
        throw new Error("Failed to change password");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      alert("비밀번호 변경 중 오류가 발생했습니다.");
    }
  };
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
            <S.ProfileUpdateButton onClick={handleProfileImageUpdate}>
              프로필 사진 변경
            </S.ProfileUpdateButton>
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
                    value={Chanegednickname}
                    onChange={handleNicknameChange}
                    placeholder="새 닉네임"
                  />
                  <S.ProfileUpdateButton onClick={handleNicknameUpdate}>
                    닉네임 변경
                  </S.ProfileUpdateButton>
                </S.InputContainer>
              )}
              <S.ResetPasswordButton
                onClick={() => {
                  handlePasswordReset();
                  setShowPasswordInput(!showPasswordInput);
                }}
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
                    비밀번호 변경
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
