import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import SideBar from "./SideBar";
import Footer from "./Footer";
import * as S from "./Styles/Layout.style";

function Layout() {
  return (
    <>
      <Header />
      <S.MainContent>
        <SideBar />
        <S.Content>
          <Outlet />
        </S.Content>
      </S.MainContent>
      <Footer />
    </>
  );
}

export default Layout;
