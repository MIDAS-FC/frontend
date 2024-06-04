import React, { useEffect, useState } from "react";
import * as S from "../Styles/EditPopup.style";
import api from "../../../axiosInterceptor";
import { PresenceContext, motion } from "framer-motion";

function EditPopup({
  onClose,
  onNicknameUpdate,
  profileImageUrl,
  onProfileImageUpdate,
}: any) {
  const [showNicknameInput, setShowNicknameInput] = useState(false);
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [email, setEmail] = useState("");
  const [socialType, setSocialType] = useState("SoundOfFlower");
  const [presentNickName, setPresentNickName] = useState("");
  const [Chanegednickname, setChangedNickname] = useState("");
  const [changedPassword, setChangedPassword] = useState("");
  const [reChangedPassword, setReChangedPassword] = useState("");
  const [profileImage, setProfileImage] = useState<string | ArrayBuffer | null>(
    profileImageUrl
  );
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  useEffect(() => {
    const storedNickname = localStorage.getItem("nickName");
    const storedEmail = localStorage.getItem("email");

    if (storedNickname) {
      setPresentNickName(decodeURIComponent(storedNickname));
    }
    if (storedEmail) {
      setEmail(storedEmail);
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

  const handleChangedPassword = (event: any) => {
    setChangedPassword(event.target.value);
  };

  const handleReChangedPassword = (event: any) => {
    setReChangedPassword(event.target.value);
  };

  // 프로필 사진 수정
  const handleProfileImageUpdate = async () => {
    if (!selectedImage) {
      alert("프로필 사진을 변경해야 합니다.");
      return;
    }

    const formData = new FormData();
    const nickNameBlob = new Blob(
      [JSON.stringify({ nickName: presentNickName })],
      {
        type: "application/json",
      }
    );
    formData.append("nickName", nickNameBlob);
    formData.append("images", selectedImage);

    try {
      const response = await api.put("/reset/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.url) {
        setProfileImage(response.data.url);
        onProfileImageUpdate();
        alert("프로필이 성공적으로 업데이트되었습니다.");
      }
    } catch (error: any) {
      if (error.response && error.response.data) {
        if (error.response?.data?.code === "SAG1") {
          console.log("외부 api와 통신이 불가능합니다.");
        } else {
          console.log("프로필 업데이트 중 오류가 발생했습니다.");
        }
      } else {
        console.log("알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  // 닉네임 수정
  const handleNicknameUpdate = async () => {
    if (!Chanegednickname) {
      alert("닉네임을 입력해야 합니다.");
      return;
    }

    const nickNameRequest = {
      presentNickName: presentNickName,
      changeNickName: Chanegednickname,
    };

    try {
      const response = await api.put("/reset/nickname", nickNameRequest, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 204) {
        alert("닉네임이 성공적으로 업데이트되었습니다.");
        localStorage.setItem("nickName", encodeURIComponent(Chanegednickname));
        setPresentNickName(Chanegednickname);
        onNicknameUpdate(Chanegednickname);
      } else {
        throw new Error("Error: Not 204");
      }
      alert("닉네임이 성공적으로 업데이트되었습니다.");
    } catch (error: any) {
      if (error.response && error.response.data) {
        if (error.response.data.code === "SAU2") {
          alert("해당 닉네임이 이미 존재합니다.");
        } else if (error.response.data.code === "SAG1") {
          console.log("외부 api와 통신이 불가능합니다.");
        } else {
          console.log("닉네임 업데이트 중 오류가 발생했습니다.");
        }
      } else {
        console.log("알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  // 비밀번호 변경
  const handlePasswordConfirm = async () => {
    if (changedPassword !== reChangedPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    const resetPasswordRequest = {
      email: email,
      socialType: socialType,
      password: changedPassword,
      rePassword: reChangedPassword,
    };

    try {
      const response = await api.put(
        "/auth/reset/password",
        resetPasswordRequest,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response && response.status === 204) {
        alert("비밀번호가 변경되었습니다.");
        setShowPasswordInput(false);
      } else {
        throw new Error("Error: Not 204");
      }
    } catch (error: any) {
      if (error.response && error.response.data) {
        if (error.response.data.code === "SAG1") {
          console.log("외부 api와 통신이 불가능합니다.");
        } else {
          console.error("비밀번호 변경 중 오류가 발생했습니다.", error);
        }
      }
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
            <S.UserInfo>
              <S.ProfileUpdateButton onClick={handleProfileImageUpdate}>
                프로필 사진 변경
              </S.ProfileUpdateButton>
              <S.UserName>{presentNickName}</S.UserName>
              {!showNicknameInput && (
                <S.NicknameButton
                  onClick={() => {
                    setShowNicknameInput(true);
                  }}
                >
                  닉네임 변경
                </S.NicknameButton>
              )}
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
              {!showPasswordInput && (
                <S.ResetPasswordButton
                  onClick={() => {
                    setShowPasswordInput(true);
                  }}
                >
                  비밀번호 변경
                </S.ResetPasswordButton>
              )}
              {showPasswordInput && (
                <S.InputContainer>
                  <S.Input
                    type="password"
                    value={changedPassword}
                    onChange={handleChangedPassword}
                    placeholder="새 비밀번호"
                  />
                  <S.Input
                    type="password"
                    value={reChangedPassword}
                    onChange={handleReChangedPassword}
                    placeholder="비밀번호 확인"
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
