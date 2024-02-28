// Footer
// css: style-component

//s-dot naming 사용
import * as S from "../Styles/Footer.style";

function Footer() {
  return (
    <S.Layout>
      <S.Container_left>
        <S.Items_top>
          <S.Item />
          <S.Item />
          <S.Item />
          <S.Item />
        </S.Items_top>
        <S.Items_mid>
          <span style={{ width: "140px" }}>개인정보처리방침 |</span>
          <span style={{ width: "60px" }}>자료실 |</span>
          <span style={{ width: "80px" }}>이용약관</span>
        </S.Items_mid>
        <S.Items_bot_1>
          <span style={{ color: "gray" }}>
            대구광역시 경상북도 경산시 대학로 280
          </span>
          <span style={{ color: "gray" }}>
            Copyright ⓒ SPICUS All rights reserved.
          </span>
        </S.Items_bot_1>
        <S.Items_bot_2>
          <span style={{ color: "gray" }}>
             고객센터 1599-0 Fax  고객센터 1599-0 Fax 02)544-1 help@chatly.com
            02)544-2 help@chatly.com
          </span>
        </S.Items_bot_2>
      </S.Container_left>
      <S.Container_right>
        <h2 style={{ fontSize: "20px", color: "gray" }}>
          고객센터 ☎) 1599-111
        </h2>
      </S.Container_right>
    </S.Layout>
  );
}

export default Footer;
