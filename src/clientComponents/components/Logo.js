import React from "react";
import { Link } from "react-router-dom";

const Logo = ({ color = "#e53637", className, ...props }) => {
  return (
    <Link
      className={`flex items-end text-4xl font-extrabold xl:text-5xl ${className}`}
      to={"/"}
      {...props}
    >
      <p className="">
        <span style={{ color: color }}>F</span>urniture
      </p>
    </Link>
  );
};

export default Logo;
