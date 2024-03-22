// 占쎌읈筌ｋ똻�읅占쎌뵥 占쎌쟿占쎌뵠占쎈툡占쎌뜍

import { Outlet } from "react-router-dom";
import { AuthProvider } from "../AuthProvider";
import Footer from "../Layout/Footer";
import NavBar from "../Layout/NavBar";


function Layout() {
  return (
    <>
      <AuthProvider>
        <NavBar />
        <Outlet />
        <Footer />
      </AuthProvider>
    </>
  );
}

export default Layout;
