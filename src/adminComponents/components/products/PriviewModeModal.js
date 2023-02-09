import React from "react";
import ShopDetail from "../../../clientComponents/pages/ShopDetail";

const PriviewModeModal = ({ onClick }) => {
  return (
    <div className="fixed inset-0 z-10 bg-[#16191b85] flex items-center justify-center p-10">
      <div
        className="fixed inset-0 z-20 bg-transparent cursor-not-allowed overlay"
        onClick={onClick}
      ></div>
      <div className="container z-30 w-full h-full mx-0 overflow-y-auto bg-white rounded-lg scroll-hidden">
        <ShopDetail priviewMode={true}></ShopDetail>
      </div>
    </div>
  );
};

export default PriviewModeModal;
