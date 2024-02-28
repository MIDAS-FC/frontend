// browserRouter 사용

import { Route, Routes } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import MyPage from "../pages/MyPage";
import Layout from "./Layout";
import TalkingPage from "../pages/TalkingPage";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<LandingPage />} />
        <Route path="/mypage" element={<MyPage />}>
          {/*마이페이지-프로필 수정 페이지*/}
          <Route path="/mypage/(userId)/editprofile" element={<MyPage />} />
        </Route>
        {/* Ai 프리토킹 페이지 */}
        <Route path="/aifreetalking" element={<TalkingPage />}>
          <Route path="/aifreetalking/speaking" element={<TalkingPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default Router;
