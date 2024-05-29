import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import SideBar from "./SideBar";
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
