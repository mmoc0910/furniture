import React from "react";
import { useAccordion } from "./accordion-context";

const AccordionOption = ({ children, ...props }) => {
  const { fillter, onClick } = useAccordion();
  return (
    <div
      className={`${fillter === children ? "text-black" : ""}`}
      {...props}
      onClick={() => onClick(children)}
    >
      {children}
    </div>
  );
};

export default AccordionOption;
