import * as S from "./Styles/SongList.style";

const songList = ["Song 1", "Song 2", "Song 3", "Song 4"];

function SongList() {
  return (
    <S.List>
      {songList.map((song, index) => (
        <S.Item key={index}>{song}</S.Item>
      ))}
    </S.List>
  );
}

export default SongList;
