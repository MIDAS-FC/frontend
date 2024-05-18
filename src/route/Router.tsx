import { Routes, Route } from "react-router-dom";
import DiaryCalender from "../pages/diarycalender/DiaryCalender";
import WeeklyReport from "../pages/weeklyreport/WeeklyReport";
import Main from "../pages/Main";
import Layout from "../components/layouts/Layout";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Main />} />
        <Route path="/DiaryCalender" element={<DiaryCalender />} />
        <Route path="/WeeklyReport" element={<WeeklyReport />} />
      </Route>
    </Routes>
  );
}

export default Router;
