import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Bottom from "./components/Bottom";

function Root() {
  return (
    <>
      <Header />
      {/* 중첩 라우팅을 위해 Outlet 사용 */}
      <Outlet />
      <Bottom />
    </>
  );
}

export default Root;
