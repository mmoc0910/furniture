import React from "react";
import { AiOutlineHeart } from "react-icons/ai";

const HeartIcon = ({ ...props }) => {
  return (
    <span>
      <AiOutlineHeart {...props}></AiOutlineHeart>
    </span>
  );
};

export default HeartIcon;
