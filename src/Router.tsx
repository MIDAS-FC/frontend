import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import MyPage from "./pages/MyPage";
import Layout from "./Layout";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<LandingPage />} />
        <Route path="/mypage" element={<MyPage />} />
      </Route>
    </Routes>
  );
}

export default Router;
