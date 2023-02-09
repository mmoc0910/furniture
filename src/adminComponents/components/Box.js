import React from "react";

const Box = ({ children, className }) => {
  return (
    <div className={`w-full h-full p-4 rounded-lg bg-[#f7f7f9] ${className}`}>
      {children}
    </div>
  );
};

export default Box;
