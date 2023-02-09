import React from "react";

const Textarea = ({ placeholder, className, ...props }) => {
  return (
    <textarea
      className={`w-full py-2 border rounded-lg px-5 border-[#e6e8ea] outline-none h-full resize-none ${className}`}
      placeholder={placeholder}
      {...props}
    ></textarea>
  );
};

export default Textarea;
