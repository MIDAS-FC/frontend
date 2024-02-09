import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import LandingPage from "./pages/LandingPage";
import MyPage from "./pages/MyPage";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "", element: <LandingPage /> },
      { path: "mypage", element: <MyPage /> },
    ],
  },
]);

export default Router;
