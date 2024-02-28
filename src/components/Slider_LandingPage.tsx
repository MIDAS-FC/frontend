// 슬라이드 배너 react-slick 사용
// css: style-component

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import { ReactComponent as Left } from "../Design/icons/Left.svg";
import { ReactComponent as Right } from "../Design/icons/Right.svg";
import { Banner_sub, StyledSlider } from "../Styles/Slider_LandingPage.style";

// 임의 배너
const offset = [0, 1, 2, 3, 4];

function Slider_LandingPage() {
  const settings = {
    slide: "div",
    dots: true,
    dotsClass: "slick-dots",
    arrows: true,
    infinite: true,
    speed: 500,
    // prevArrow: <Left />,
    // nextArrow: <Right />,
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: true,
    autoplay: true,
    autoplaySpeed: 5000,
  };
  return (
    <StyledSlider>
      <Slider {...settings}>
        {offset.map((i) => (
          <Banner_sub key={i}>{i}</Banner_sub>
        ))}
      </Slider>
    </StyledSlider>
  );
}

export default Slider_LandingPage;
