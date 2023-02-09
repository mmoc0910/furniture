import React from "react";
import { Accordion } from "../../accordions";
import { FiChevronDown } from "react-icons/fi";

const FillterItem = ({ accrordionHeading, children }) => {
  const [show, setShow] = React.useState(false);
  const [fillter, setFillter] = React.useState("");
  const handleOnClick = (newFillter) => {
    setFillter(newFillter);
  };
  return (
    <Accordion
      className="relative w-full mb-6 cursor-pointer"
      onClick={handleOnClick}
      fillter={fillter}
    >
      <div
        className="flex items-center justify-between w-full font-bold"
        onClick={() => setShow(() => !show)}
      >
        <p className="capitalize">{accrordionHeading}</p>
        <span>
          <FiChevronDown size={"1.5rem"}></FiChevronDown>
        </span>
      </div>
      <div
        className={`${
          show ? "max-h-[200px] visible" : "max-h-[0px] invisible"
        } transition-all duration-150 overflow-hidden`}
      >
        {children}
      </div>
    </Accordion>
  );
};

export default FillterItem;
