// slider css

import { motion } from "framer-motion";
import styled from "styled-components";

// node_modules -> slick carousel -> slick.css수정한 것
export const StyledSlider = styled.div`
  .slick-slider {
    width: 800px;
    left: 400px;
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

export const Banner_sub = styled(motion.div)`
  height: 400px;
  background-color: ${(props) => props.theme.subColor};
  border-radius: 20px;
`;
