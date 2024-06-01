import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import api from "../../../axiosInterceptor";
import * as S from "../Styles/EditProfile.style";
import EditPopup from "./EditPopup";

function EditProfile() {
  const [showPopup, setShowPopup] = useState(false);
  const [presentNickName, setPresentNickName] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState("");

  useEffect(() => {
    // const token = localStorage.getItem("accessToken");
    // if (token) {
    //   api.defaults.headers.common["Authorization-Access"] = `Bearer ${token}`;
    // } else {
    //   console.log("token error");
    // }
    const storedNickname = localStorage.getItem("nickName");
    if (storedNickname) {
      setPresentNickName(storedNickname);
    }

    fetchProfileImage();
  }, []);

  const fetchProfileImage = async () => {
    try {
      const response = await api.get("/profile");
      setProfileImageUrl(response.data.imageUrl);
    } catch (error) {
      console.error("Failed to fetch profile image:", error);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleNicknameUpdate = (newNickname: string) => {
    setPresentNickName(newNickname);
  };

  // 프로필 사진 상태 리프레시
  const handleProfileImageUpdate = () => {
    fetchProfileImage();
  };

  return (
    <S.Container>
      <S.Title>프로필 수정</S.Title>
      <S.ProfileImageContainer>
        {profileImageUrl ? (
          <S.ProfileImage src={profileImageUrl} alt="Profile" />
        ) : (
          <span>loading</span>
        )}
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
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <EditPopup
              onClose={handleClosePopup}
              onNicknameUpdate={handleNicknameUpdate}
              profileImageUrl={profileImageUrl}
              onProfileImageUpdate={handleProfileImageUpdate}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </S.Container>
  );
}

export default EditProfile;
