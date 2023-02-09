import React from "react";
import { useSelector } from "react-redux";
import { useAccordion } from "./accordion-context";

const AccordionOption = ({ children, categoryId, ...props }) => {
  const { filter } = useSelector((state) => state.product);
  const { onClick } = useAccordion();
  return (
    <div
      className={`${filter.categoryId === categoryId ? "text-black" : ""}`}
      {...props}
      onClick={() => onClick(categoryId)}
    >
      {children}
    </div>
  );
};

export default AccordionOption;
