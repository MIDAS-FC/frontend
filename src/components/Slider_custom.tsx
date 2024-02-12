import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { motion } from "framer-motion";
import { styled } from "styled-components";

// node_modules -> slick carousel -> slick.css수정한 것
const StyledSlider = styled.div`
  .slick-slider {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 800px;
    left: 420px;
  }

  .slick-prev,
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
  }
  .slick-prev:hover,
  .slick-prev:focus,
  .slick-next:hover,
  .slick-next:focus {
    color: transparent;
    border: none;
    outline: none;
    background: transparent;
  }
  .slick-prev:hover:before,
  .slick-prev:focus:before,
  .slick-next:hover:before,
  .slick-next:focus:before {
    opacity: 1;
  }
  .slick-prev.slick-disabled:before,
  .slick-next.slick-disabled:before {
    opacity: 0.25;
  }

  .slick-prev:before,
  .slick-next:before {
    font-family: "slick";
    font-size: 40px;
    line-height: 1;

    opacity: 0.75;
    color: white;
  }

  .slick-prev {
    left: 0px;
    z-index: 10;
  }
  .slick-next {
    right: 0px;
    z-index: 10;
  }
`;

const Banner_sub = styled(motion.div)`
  height: 400px;
  background-color: lightgray;
  border-radius: 20px;
`;

// 임의 배너
const offset = [0, 1, 2, 3, 4];

function Slider_custom() {
  const settings = {
    dots: true,
    dotsClass: "slick-dots",
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: true,
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

export default Slider_custom;
