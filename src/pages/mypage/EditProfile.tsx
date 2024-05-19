import React from "react";
import * as S from "./Styles/EditProfile.style";

function EditProfile() {
  return (
    <S.Container>
      <S.ProfileImageContainer>
        <S.ProfileImage src="path/to/profile-image.jpg" alt="Profile" />
        <S.ChangePhotoButton>📷</S.ChangePhotoButton>
      </S.ProfileImageContainer>
      <S.UserInfo>
        <S.UserName>UserName</S.UserName>
        <S.Buttons>
          <S.NicknameButton>닉네임 변경</S.NicknameButton>
          <S.ResetPasswordButton>비밀번호 초기화</S.ResetPasswordButton>
        </S.Buttons>
      </S.UserInfo>
    </S.Container>
  );
}

export default EditProfile;
