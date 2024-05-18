import { useNavigate } from "react-router-dom";

function Main() {
  const navigate = useNavigate();

  const onClick1 = () => {
    navigate("/DiaryCalender");
  };
  const onClick2 = () => {
    navigate("/WeeklyReport");
  };
  return (
    <div>
      <button onClick={onClick1}>마이페이지</button>
      <button onClick={onClick2}>주간감정레포트</button>
    </div>
  );
}

export default Main;
