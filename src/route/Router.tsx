import { Route, Routes } from "react-router-dom";
import Layout from "../components/layouts/Layout";
import Main from "../pages/Main";
import Join from "../pages/Member/Join";
import Login from "../pages/Member/Login";
import LoginRedirectPage from "../pages/Member/LoginRedirectPage";
import WriteDiary from "../pages/diary/diary";
import DiaryCalender from "../pages/diarycalender/DiaryCalender";
import WeeklyReport from "../pages/weeklyreport/WeeklyReport";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Main />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Join" element={<Join />} />
        <Route path="/login-success" element={<LoginRedirectPage />} />
        <Route path="/DiaryCalender" element={<DiaryCalender />} />
        <Route path="/WeeklyReport" element={<WeeklyReport />} />
        <Route path="/WriteDiary" element={<WriteDiary/>}></Route>
      </Route>
    </Routes>
  );
}

export default Router;
