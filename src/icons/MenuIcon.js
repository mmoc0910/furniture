import React from "react";
import { AiOutlineMenu } from "react-icons/ai";

const MenuIcon = ({ className, onClick, size, color, ...props }) => {
  return (
    <span className={className} onClick={onClick} {...props}>
      <AiOutlineMenu size={size} color={color}></AiOutlineMenu>
    </span>
  );
};

export default MenuIcon;
