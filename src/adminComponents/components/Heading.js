import React from "react";

const Heading = ({ children, heading, desc }) => {
  return (
    <div className="flex items-start justify-between mb-11">
      <div className="">
        <h2 className="mb-3 text-3xl font-bold capitalize">{heading}</h2>
        {desc && <p className="font-semibold text-[#797977]">{desc}</p>}
      </div>
      {children}
    </div>
  );
};

export default Heading;
