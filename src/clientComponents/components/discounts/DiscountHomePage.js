import React from "react";
import DiscountCategory from "./DiscountCategory";
import DiscountItem from "./DiscountItem";
const DiscountHomePage = () => {
  return (
    <div className="py-36 bg-[#f3f2ee] overflow-hidden">
      <div className="container flex flex-col items-center lg:flex-row">
        <DiscountCategory></DiscountCategory>
        <DiscountItem></DiscountItem>
      </div>
    </div>
  );
};

export default DiscountHomePage;
