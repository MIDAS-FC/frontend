// 슬라이드 배너 react-slick 사용

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import { ReactComponent as LeftIcon } from "../Design/icons/left.svg";
import { ReactComponent as RightIcon } from "../Design/icons/right.svg";
import styled from "styled-components";
import { motion } from "framer-motion";

// node_modules -> slick carousel -> slick.css수정한 것
const StyledSlider = styled.div`
  .slick-slider {
    width: 800px;
  }

  /* .slick-prev,
  .slick-next {
    font-size: 0;
    line-height: 0;

    position: absolute;
    top: 50%;

    display: block;

    width: 40px;
    height: 40px;

    cursor: pointer;

    color: transparent;
    border: none;
    outline: none;
    background: transparent;
  } */

  .slick-prev {
    width: 60px;
    height: 60px;
    color: transparent;
    border: none;
    outline: none;
    background: transparent;
    left: 0px;
    z-index: 10;
    opacity: 0;
  }
  .slick-next {
    width: 60px;
    height: 60px;
    color: transparent;
    border: none;
    outline: none;
    background: transparent;
    right: 0px;
    z-index: 10;
    opacity: 0;
  }

  .slick-prev:hover,
  .slick-prev:focus,
  .slick-next:hover,
  .slick-next:focus {
    color: transparent;
    border: none;
    outline: none;
    background: transparent;
    opacity: 0.75;
  }
  /* .slick-prev:hover:before,
  .slick-prev:focus:before,
  .slick-next:hover:before,
  .slick-next:focus:before {
    opacity: 1;
  } */
  /* .slick-prev.slick-disabled:before,
  .slick-next.slick-disabled:before {
    opacity: 0.25;
  } */

  .slick-prev:before,
  .slick-next:before {
    font-family: "slick";
    font-size: 40px;
    line-height: 1;
    opacity: 0.75;
    color: white;
  }

  .slick-prev:focus:active,
  .slick-next:focus:active {
    opacity: 0;
  }

  /* .slick-slide div {
    background-color: lightgray;
  } */

  // slider 겉테두리
  .slick-track {
    background-color: white;
  }
`;

const Banner_sub = styled(motion.div)`
  height: 400px;
  background-color: ${(props) => props.theme.subColor};
  border-radius: 20px;
`;

// 임의 배너
const offset = [0, 1, 2, 3, 4];

function Slider_custom() {
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

export default Slider_custom;
