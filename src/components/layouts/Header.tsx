import React from "react";
import logo from "../../assets/icons/logo.jpg";
import * as S from "../layouts/Styles/Header.style";

function Header() {
  return (
    <S.HeaderContainer>
      <S.Logo src={logo} alt="Logo" />
    </S.HeaderContainer>
  );
}

export default Header;
