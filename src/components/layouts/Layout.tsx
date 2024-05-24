import { Outlet } from "react-router-dom";
import { AuthProvider } from "../../AuthProvider";
import Footer from "./Footer";
import Header from "./Header";
import SideBar from "./SideBar";


function Layout() {
  return (
    <>
      <AuthProvider>
        <Header />
        <SideBar />
        <Outlet />
        <Footer />
      </AuthProvider>
    </>
  );
}

export default Layout;
