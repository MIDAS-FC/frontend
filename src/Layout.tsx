import { Outlet } from "react-router-dom";
import NavBar from "./Layout/NavBar";
import Footer from "./Layout/Footer";

function Layout() {
  return (
    <>
      <NavBar />
      {/* 중첩 라우팅을 위해 Outlet 사용 */}
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
