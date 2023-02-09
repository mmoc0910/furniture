import React from "react";
import { useDropdown } from "../../../contexts/dropdown-context";

const DropdownOption = ({ children, ...props }) => {
  const { onClick, setShow } = useDropdown();
  return (
    <div
      {...props}
      onClick={() => {
        onClick(children);
        setShow(false);
      }}
    >
      {children}
    </div>
  );
};

export default DropdownOption;
