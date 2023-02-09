import React from "react";
import { useAccordion } from "./accordion-context";

const AccordionOption = ({ children, categoryId, ...props }) => {
  const { fillter, onClick } = useAccordion();
  return (
    <div
      className={`${fillter === categoryId ? "text-black" : ""}`}
      {...props}
      onClick={() => onClick(categoryId)}
    >
      {children}
    </div>
  );
};

export default AccordionOption;
