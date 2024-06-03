import * as S from "../layouts/Styles/Footer.style";

function Footer() {
  return (
    <S.FooterContainer>
      <S.FooterContent>
        <S.FooterColumn>
          <S.FooterSection>
            <strong>Company Name:</strong> Soundofflower
          </S.FooterSection>
          <S.FooterSection>
            <strong>CEO:</strong> Soundofflower
          </S.FooterSection>
          <S.FooterSection>
            <strong>Business Address:</strong> 280, Daehak-ro, Gyeongsan-si,
            Gyeongsangbuk-do, Republic of Korea
          </S.FooterSection>
          <S.FooterSection>
            <strong>Phone:</strong> +1 (123) 456-7890
          </S.FooterSection>
          <S.FooterSection>
            <strong>Email:</strong> info@abccorp.com
          </S.FooterSection>
          <S.FooterSection>
            <strong>Business Registration Number:</strong> 123-45-67890
          </S.FooterSection>
        </S.FooterColumn>
        <S.FooterColumn>
          <S.FooterSection>
            <strong>Privacy Officer:</strong> Soundofflower
          </S.FooterSection>
          <S.FooterSection>
            <strong>Mail Order Business Registration Number:</strong>{" "}
            2021-City-12345
          </S.FooterSection>
          <S.FooterSection>
            <S.FooterLink href="/terms">Terms of Service</S.FooterLink> |{" "}
            <S.FooterLink href="/privacy">Privacy Policy</S.FooterLink>
          </S.FooterSection>
          <S.FooterSection>
            <S.FooterLink
              href="http://www.ftc.go.kr/info/bizinfo/communicationList.jsp"
              target="_blank"
            >
              Business Information Verification
            </S.FooterLink>
          </S.FooterSection>
          <S.FooterSection>
            <strong>Hosting Provider:</strong> SixShop Inc.
          </S.FooterSection>
          <S.FooterSection>
            <strong>Escrow Certification</strong>
          </S.FooterSection>
        </S.FooterColumn>
      </S.FooterContent>
    </S.FooterContainer>
  );
}

export default Footer;
