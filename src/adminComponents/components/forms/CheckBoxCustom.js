import React from "react";

const CheckBoxCustom = ({ id = "radiCustom", onClick, ...props }) => {
  return (
    <div>
      <input type="checkbox" id={id} className="hidden peer" {...props} />
      <label
        htmlFor={id}
        className="w-[54px] h-[30px] cursor-pointer bg-[#d7d7d6] rounded-full block relative p-[3px] after:absolute after:bg-white after:w-[24px] after:h-[24px] after:rounded-full after:transition-all after:duration-200 peer-checked:bg-[#3c897b] peer-checked:after:translate-x-[calc(100%)]"
      ></label>
    </div>
  );
};

export default CheckBoxCustom;
