import React, { useState, useEffect } from "react";
import logo from "../../assets/icons/logo.webp";
import * as S from "../layouts/Styles/Header.style";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  const handleLogoClick = () => {
    navigate("/");
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <S.HeaderContainer isScrolled={isScrolled}>
      <S.Logo src={logo} alt="Logo" onClick={handleLogoClick} />
    </S.HeaderContainer>
  );
}

export default Header;
