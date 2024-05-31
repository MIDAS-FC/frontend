import React, { useEffect, useState } from "react";
import * as S from "../Styles/EditProfile.style";
import { AnimatePresence, motion } from "framer-motion";
import EditPopup from "./EditPopup";
import axios from "axios";
import api from "../../../axiosInterceptor";

function EditProfile() {
  const [showPopup, setShowPopup] = useState(false);
  const [presentNickName, setPresentNickName] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState("");

  useEffect(() => {
    const storedNickname = localStorage.getItem("nickName");
    if (storedNickname) {
      setPresentNickName(storedNickname);
    }

    const fetchProfileImage = async () => {
      try {
        const response = await api.get("/profile");
        setProfileImageUrl(response.data.imageUrl);
      } catch (error) {
        console.error("Failed to fetch profile image:", error);
      }
    };

    fetchProfileImage();
  }, []);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleNicknameUpdate = (newNickname: string) => {
    setPresentNickName(newNickname);
  };

  return (
    <S.Container>
      <S.Title>프로필 수정</S.Title>
      <S.ProfileImageContainer>
        <S.ProfileImage src={profileImageUrl} alt="Profile" />
      </S.ProfileImageContainer>
      <S.UserInfo>
        <S.UserName>{decodeURIComponent(presentNickName)}</S.UserName>
        <S.EditSection>
          <S.EditText>프로필 수정을 원하시면</S.EditText>
          <S.EditButton onClick={() => setShowPopup(true)}>
            프로필 수정
          </S.EditButton>
        </S.EditSection>
      </S.UserInfo>
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
          >
            <EditPopup
              onClose={handleClosePopup}
              onNicknameUpdate={handleNicknameUpdate}
              profileImageUrl={profileImageUrl}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </S.Container>
  );
}

export default EditProfile;
