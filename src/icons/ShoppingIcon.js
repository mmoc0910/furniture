import React from "react";
import { AiOutlineShopping } from "react-icons/ai";

const ShoppingIcon = ({ ...props }) => {
  return (
    <span>
      <AiOutlineShopping {...props}></AiOutlineShopping>
    </span>
  );
};

export default ShoppingIcon;
