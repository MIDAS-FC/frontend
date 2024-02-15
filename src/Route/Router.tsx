// browserRouter 사용

import { Route, Routes } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import MyPage from "../pages/MyPages/MyPage";
import Layout from "./Layout";
import React from "react";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<LandingPage />} />
        <Route path="/mypage" element={<MyPage />}>
          {/* // 임시 주소*/}
          <Route path="/mypage/(userId)/editprofile" element={<MyPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default Router;
