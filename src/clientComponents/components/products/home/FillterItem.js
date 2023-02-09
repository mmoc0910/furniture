import React from "react";

const FillterItem = ({ children, className, ...props }) => {
  return (
    <div
      {...props}
      className={`fillter-item text-2xl font-bold cursor-pointer select-none ${className}`}
    >
      {children}
    </div>
  );
};

export default FillterItem;
