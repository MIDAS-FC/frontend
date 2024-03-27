// Footer

import { motion } from "framer-motion";
import styled from "styled-components";

const Layout = styled(motion.div)`
  position: relative;
  width: 100%;
  min-width: 1280px;
  // 항상 화면 밑에 고정
  height: auto;
  min-height: 100%;
  padding-bottom: 200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: whitesmoke;
`;

const Container_left = styled.div`
  position: relative;
  height: auto;
`;

const Container_right = styled.div`
  position: absolute;
  top: 80px;
  right: 100px;
  height: auto;
`;

const Items_top = styled.div`
  position: absolute;
  top: 20px;
  left: 140px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
`;

const Items_mid = styled.div`
  position: absolute;
  top: 100px;
  left: 140px;
  display: flex;
`;

const Items_bot_1 = styled.div`
  position: absolute;
  top: 140px;
  left: 140px;
  width: 600px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Items_bot_2 = styled.div`
  position: absolute;
  top: 120px;
  left: 470px;
  width: 300px;
`;

const Item = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 100px;
  background-color: ivory;
`;

function Footer() {
  return (
    <Layout>
      <Container_left>
        <Items_top>
          <Item />
          <Item />
          <Item />
          <Item />
        </Items_top>
        <Items_mid>
          <span style={{ width: "140px" }}>개인정보처리방침 |</span>
          <span style={{ width: "60px" }}>자료실 |</span>
          <span style={{ width: "80px" }}>이용약관</span>
        </Items_mid>
        <Items_bot_1>
          <span style={{ color: "gray" }}>
            대구광역시 경상북도 경산시 대학로 280
          </span>
          <span style={{ color: "gray" }}>
            Copyright ⓒ SPICUS All rights reserved.
          </span>
        </Items_bot_1>
        <Items_bot_2>
          <span style={{ color: "gray" }}>
             고객센터 1599-0 Fax  고객센터 1599-0 Fax 02)544-1 help@chatly.com
            02)544-2 help@chatly.com
          </span>
        </Items_bot_2>
      </Container_left>
      <Container_right>
        <h2 style={{ fontSize: "20px", color: "gray" }}>
          고객센터 ☎) 1599-111
        </h2>
      </Container_right>
    </Layout>
  );
}

export default Footer;
