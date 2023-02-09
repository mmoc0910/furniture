import React from "react";
import useClickOutSide from "../../../hooks/useClickOutSide";

const DropDown = ({ label, value, data, onClick, children, ...props }) => {
  const { show, setShow, initialNodeRef } = useClickOutSide();
  return (
    <>
      <label className="text-lg font-semibold">{label}</label>
      <div
        className="relative w-full px-3 py-2 border border-black rounded-lg cursor-pointer select-none"
        onClick={() => setShow(!show)}
        ref={initialNodeRef}
      >
        <div className="flex items-center justify-between">
          <p className="line-clamp-1">{value || label}</p>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </span>
        </div>
        {show && (
          <div className="absolute left-0 w-full mt-3 overflow-hidden border border-black rounded-lg cursor-pointer top-full before:absolute before:w-full before:h-3 before:bottom-full before:bg-transparent before:left-0 max-h-[130px] bg-white">
            {children}
          </div>
        )}
      </div>
    </>
  );
};

export default DropDown;
