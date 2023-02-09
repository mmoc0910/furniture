import React from "react";
import { AccordionProvider } from "./accordion-context";

const Accordion = ({ children, className, ...props }) => {
  return (
    <AccordionProvider {...props}>
      <div className={className}>{children}</div>
    </AccordionProvider>
  );
};

export default Accordion;
