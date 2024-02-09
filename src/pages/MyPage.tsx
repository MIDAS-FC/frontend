import styled from "styled-components";

const Container = styled.div`
  position: relative;
  height: 100vh;
  top: 120px;
`;

const Container_top = styled.div`
  position: absolute;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
`;

const Container_top_left = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const Container_top_right = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container_mid = styled.div`
  position: absolute;
  top: 300px;
  left: 360px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container_buttons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Container_name = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const Containter_Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const Image = styled.div`
  border-radius: 100px;
  background-color: pink;
`;

const Button = styled.button`
  width: 140px;
  border: none;
  border-radius: 20px;
`;

const Board = styled.div`
  width: 800px;
  height: 400px;
  border-radius: 20px;
  background-color: lightgray;
`;

function MyPage() {
  return (
    <Container>
      <Container_top>
        <Container_top_left>
          <Image style={{ width: "150px", height: "150px" }} />
          <Container_buttons>
            <Button>프로필 사진 수정</Button>
            <Button>닉네임 수정</Button>
            <Button>학습 언어 수정</Button>
          </Container_buttons>
        </Container_top_left>
        <Container_top_right>
          <Containter_Info>
            <Container_name>
              <h2>OOO 님</h2>
              <Image style={{ width: "40px", height: "40px" }} />
            </Container_name>
            <h2>팔로우 3명 팔로잉 10명</h2>
            <h2>학습 언어: 영어</h2>
            <h2>학습 레벨: LV.3</h2>
          </Containter_Info>
        </Container_top_right>
      </Container_top>
      <Container_mid>
        <Board />
        <Button>자기소개 수정</Button>
      </Container_mid>
    </Container>
  );
}

export default MyPage;
