import { Routes, Route } from "react-router-dom";
import DiaryCalender from "../pages/diarycalender/DiaryCalender";
import Layout from "../components/layouts/Layout";
import Mypage from "../pages/mypage/Mypage";
import GuestMain from "../pages/mainpage/GuestMain";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<DiaryCalender />} /> {/* 회원 메인페이지 */}
        <Route path="guest" element={<GuestMain />} /> {/* 비회원 메인페이지 */}
        <Route path="mypage" element={<Mypage />} />
      </Route>
    </Routes>
  );
}

export default Router;
