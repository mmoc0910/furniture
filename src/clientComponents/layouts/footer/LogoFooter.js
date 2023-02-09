import React from "react";
import { Link } from "react-router-dom";

const LogoFooter = ({ ...props }) => {
  return (
    <Link className="flex items-end" to={"/"} {...props}>
      <p className="text-4xl font-extrabold text-white xl:text-5xl">
        <span className="text-[#e53637]">F</span>urniture
      </p>
    </Link>
  );
};

export default LogoFooter;
