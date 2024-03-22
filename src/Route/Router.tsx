// browserRouter 사용

import { Route, Routes } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import Layout from "./Layout";
import AiSpeaking from "../pages/AiSpeaking";
import Mypage from "../pages/Mypage";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<LandingPage />} />
        <Route path="/mypage" element={<Mypage />}>
          {/*마이페이지-프로필 수정 페이지*/}
          <Route path="/mypage/editprofile" element={<Mypage />} />
        </Route>
        {/* Ai 프리토킹 페이지 */}
        <Route path="/aispeaking" element={<AiSpeaking />}>
          {/* 채팅방 입장 */}
          <Route path="/aispeaking/room" element={<AiSpeaking />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default Router;
