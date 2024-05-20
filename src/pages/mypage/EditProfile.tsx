import React, { useState } from "react";
import * as S from "./Styles/EditProfile.style";
import { AnimatePresence, motion } from "framer-motion";
import EditPopup from "./EditPopup";

function EditProfile() {
  const [showPopup, setShowPopup] = useState(false);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <S.Container>
      <S.ProfileImageContainer>
        <S.ProfileImage src="path/to/profile-image.jpg" alt="Profile" />
      </S.ProfileImageContainer>
      <S.UserInfo>
        <S.UserName>UserName</S.UserName>

        <button onClick={() => setShowPopup(true)}>프로필 수정</button>
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
