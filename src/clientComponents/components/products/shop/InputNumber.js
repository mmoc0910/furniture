import React from "react";

const InputNumber = ({ handleReduced, handleIncrease, qty }) => {
  return (
    <div className="relative flex items-center max-w-[60px] md:max-w-[100px] rounded-md font-bold py-1 w-full justify-center select-none">
      <span
        className="absolute left-0 -translate-y-1/2 cursor-pointer top-1/2"
        onClick={handleReduced}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 17.25L12 21m0 0l-3.75-3.75M12 21V3"
          />
        </svg>
      </span>
      <span>{qty}</span>
      <span
        className="absolute right-0 -translate-y-1/2 cursor-pointer top-1/2"
        onClick={handleIncrease}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 6.75L12 3m0 0l3.75 3.75M12 3v18"
          />
        </svg>
      </span>
    </div>
  );
};

export default InputNumber;
