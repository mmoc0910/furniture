import React from "react";
import { AiOutlineSearch } from "react-icons/ai";

const SerachIcon = ({ ...props }) => {
  return (
    <span>
      <AiOutlineSearch {...props}></AiOutlineSearch>
    </span>
  );
};

export default SerachIcon;
