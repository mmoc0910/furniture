import React from "react";

const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#16191b80]">
      <div className="border-white rounded-full border-[3px] w-8 h-8 border-b-transparent animate-spin"></div>
    </div>
  );
};

export default Loading;
