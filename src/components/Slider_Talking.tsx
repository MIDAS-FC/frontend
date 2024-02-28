// 슬라이드 배너 react-slick 사용
// css: style-component

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Modal_Talking from "./Modal_Talking";

// node_modules -> slick carousel -> slick.css수정한 것
const StyledSlider = styled.div`
  .slick-slider {
    width: 1200px;
    left: 30px;
    margin-top: 200px;
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

const Box = styled(motion.div)`
  height: 350px;
  background-color: lightgray;
  border-radius: 20px;
`;

// 임의 배너
const offset = [
  "카페에서 주문",
  "식당에서 주문",
  "새 친구 만들기",
  "파티에서",
  "자유 토픽 플레이",
];

function Slider_Talking() {
  const navigate = useNavigate();

  // Modal 관련 함수
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const toggleModal = () => {
    navigate("/aifreetalking/speaking");
    setModalIsOpen((prev) => !prev);
  };

  const settings = {
    slide: "div",
    dots: true,
    dotsClass: "slick-dots",
    arrows: true,
    infinite: true,
    speed: 500,
    // prevArrow: <Left />,
    // nextArrow: <Right />,
    slidesToShow: 3,
    slidesToScroll: 3,
    draggable: true,
  };
  return (
    <>
      <StyledSlider>
        <Slider {...settings}>
          {offset.map((i) => (
            <Box key={i} onClick={toggleModal}>
              {i}
            </Box>
          ))}
        </Slider>
      </StyledSlider>
      <Modal_Talking modalIsOpen={modalIsOpen} toggleModal={toggleModal} />
    </>
  );
}

export default Slider_Talking;
