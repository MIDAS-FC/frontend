import EditProfile from "./editpage/EditProfile";
import SongList from "./songlist/SongList";
import WeeklyReport from "./WeeklyReport";

function Mypage() {
  return (
    <>
      <EditProfile />
      <WeeklyReport />
      <SongList />
    </>
  );
}

export default Mypage;
