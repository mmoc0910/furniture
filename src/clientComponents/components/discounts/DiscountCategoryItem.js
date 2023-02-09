import React from "react";

const DiscountCategoryItem = ({ children, className, ...props }) => {
  return (
    <p
      {...props}
      className={`transition-all duration-200 cursor-pointer discount-category wow animate__animated animate__fadeInLeft ${className} line-clamp-1`}
    >
      {children}
    </p>
  );
};

export default DiscountCategoryItem;
