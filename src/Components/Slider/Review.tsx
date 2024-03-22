// 슬라이드 배너 react-slick 사용
// css: style-component

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import { ReactComponent as LeftIcon } from "../../Design/icons/Left.svg";
import { ReactComponent as RightIcon } from "../../Design/icons/Right.svg";
import { Banner_sub, StyledSlider } from "../../Styles/Review.style";

// 임의 배너
const offset = [0, 1, 2, 3, 4];

function Review() {
  const settings = {
    slide: "div",
    dots: true,
    dotsClass: "slick-dots",
    arrows: true,
    infinite: true,
    speed: 500,
    prevArrow: <LeftIcon />,
    nextArrow: <RightIcon />,
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
          <Banner_sub key={i}>{i}서브배너-수강후기</Banner_sub>
        ))}
      </Slider>
    </StyledSlider>
  );
}

export default Review;
