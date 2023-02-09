import React from "react";
import { AiOutlineRight } from "react-icons/ai";
import { Link } from "react-router-dom";

const Breadcrumb = ({
  children,
  color = "white",
  pageName = "Home",
  bgColor = "#f3f2ee",
  bgImg = true,
}) => {
  return (
    <div
      className={`py-10 breadcrumb relative bg-[${bgColor}]`}
      style={{
        backgroundImage:
          bgImg &&
          "url(https://images.unsplash.com/photo-1615874959474-d609969a20ed?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1780&q=80)",
        backgroundSize: "100% auto",
        backgroundPosition: "0 65%",
      }}
    >
      <div
        className="container relative z-[5] font-bold"
        style={{ color: color }}
      >
        <h2 className="mb-2 text-2xl font-bold">{pageName}</h2>
        <div className="flex items-center gap-2">
          <Link to="/">Trang chủ</Link>
          <span>
            <AiOutlineRight size={"0.75rem"}></AiOutlineRight>
          </span>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
