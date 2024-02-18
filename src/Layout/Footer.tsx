// Footer

import {
  Container_left,
  Container_right,
  Item,
  Items_bot_1,
  Items_bot_2,
  Items_mid,
  Items_top,
  Layout,
} from "../Styles/Footer.style";

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
        <h2 style={{ fontSize: "30px", color: "gray" }}>
          고객센터 ☎) 1599-111
        </h2>
      </Container_right>
    </Layout>
  );
}

export default Footer;
