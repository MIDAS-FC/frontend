import { Routes, Route } from "react-router-dom";
import DiaryCalender from "../pages/diarycalender/DiaryCalender";
import Layout from "../components/layouts/Layout";
import Mypage from "../pages/mypage/Mypage";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<DiaryCalender />} />
        <Route path="/mypage" element={<Mypage />} />
      </Route>
    </Routes>
  );
}

export default Router;
