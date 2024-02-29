// browserRouter

import { Route, Routes } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import Join from "../pages/Member/Join";
import Login from "../pages/Member/Login";
import MyPage from "../pages/MyPages/MyPage";
import Layout from "./Layout";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<LandingPage />} />
        <Route path="pages/Member/Login" element={<Login />} />
        <Route path="pages/Member/Join" element={<Join />} />
        <Route path="/mypage" element={<MyPage />}>
          <Route path="/mypage/(userId)/editprofile" element={<MyPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default Router;
