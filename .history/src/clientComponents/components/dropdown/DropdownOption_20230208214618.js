import React from "react";
import { useDropdown } from "../../../contexts/dropdown-context";

const DropdownOption = ({ children, value, ...props }) => {
  const { onClick, setShow } = useDropdown();
  return (
    <div
      {...props}
      onClick={() => {
        onClick(value);
        setShow(false);
      }}
    >
      {children}
    </div>
  );
};

export default DropdownOption;
