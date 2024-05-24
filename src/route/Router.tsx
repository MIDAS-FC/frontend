import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "../components/layouts/Layout";
import DiaryCalender from "../pages/diarycalender/DiaryCalender";
import Join from "../pages/Member/Join";
import Login from "../pages/Member/Login";
import LoginRedirectPage from "../pages/Member/LoginRedirectPage";
import WriteDiary from "../pages/diary/WriteDiary";
import Mypage from "../pages/mypage/Mypage";
import GuestMain from "../pages/mainpage/GuestMain";
import Main from "../pages/Main";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/guest" replace />} />
        <Route path="guest" element={<GuestMain />} /> {/* 비회원 메인페이지 */}
        <Route path="" element={<DiaryCalender />} /> {/* 회원 메인페이지 */}
        <Route path="mypage" element={<Mypage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Join" element={<Join />} />
        <Route path="/login-success" element={<LoginRedirectPage />} />
        <Route path="/WriteDiary" element={<WriteDiary />}></Route>
      </Route>
    </Routes>
  );
}

export default Router;
