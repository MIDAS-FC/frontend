import React, { useEffect, useState } from "react";
import * as S from "../Styles/EditProfile.style";
import { AnimatePresence, motion } from "framer-motion";
import EditPopup from "./EditPopup";

function EditProfile() {
  const [showPopup, setShowPopup] = useState(false);
  const [presentNickName, setPresentNickName] = useState("");

  useEffect(() => {
    const storedNickname = localStorage.getItem("nickName");
    if (storedNickname) {
      setPresentNickName(storedNickname);
    }
  }, []);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <S.Container>
      <S.Title>프로필 수정</S.Title>
      <S.ProfileImageContainer>
        <S.ProfileImage src="path/to/profile-image.jpg" alt="Profile" />
      </S.ProfileImageContainer>
      <S.UserInfo>
        <S.UserName>{presentNickName}</S.UserName>
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
            <EditPopup onClose={handleClosePopup} />
          </motion.div>
        )}
      </AnimatePresence>
    </S.Container>
  );
}

export default EditProfile;
