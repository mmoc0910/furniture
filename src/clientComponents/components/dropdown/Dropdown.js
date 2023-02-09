import React from "react";
import { AiOutlineDown } from "react-icons/ai";
import { DropdownProvider } from "../../../contexts/dropdown-context";
import useClickOutSide from "../../../hooks/useClickOutSide";

const Dropdown = ({ placeHolder, children, ...props }) => {
  const { show, setShow, initialNodeRef } = useClickOutSide();
  return (
    <DropdownProvider {...props} setShow={setShow}>
      <div className="relative cursor-pointer select-none" ref={initialNodeRef}>
        <div
          className="flex items-center gap-2 font-bold"
          onClick={() => setShow(() => !show)}
        >
          <p>{placeHolder}</p>
          <span
            className={`${
              show ? "rotate-180" : ""
            } transition-all duration-150`}
          >
            <AiOutlineDown></AiOutlineDown>
          </span>
        </div>
        {show && children}
      </div>
    </DropdownProvider>
  );
};

export default Dropdown;
