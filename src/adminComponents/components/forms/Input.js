import React from "react";

const Input = ({ type = "text", placeholder = "", ...props }) => {
  return (
    <input
      autoComplete="off"
      type={type}
      className="w-full py-2 border rounded-lg px-5 border-[#e6e8ea] outline-none"
      placeholder={placeholder}
      {...props}
    ></input>
  );
};

export default Input;
