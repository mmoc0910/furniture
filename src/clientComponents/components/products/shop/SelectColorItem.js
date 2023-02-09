import React from "react";
import ReactTooltip from "react-tooltip";

const SelectColorItem = ({
  type = "radio",
  size = "6rem",
  name = "color",
  colorName = "",
  id,
  color,
  ...props
}) => {
  return (
    <>
      <div style={{ width: size, height: size, flexShrink: 0, flexGrow: 0 }}>
        <input
          type={type}
          value={color}
          name={name}
          data-color={colorName}
          id={id || color}
          className="hidden peer"
          {...props}
          // onClick={() => console.log(color)}
        />
        <label
          data-tip={colorName}
          htmlFor={id || color}
          style={{ backgroundColor: color }}
          className="block w-full h-full rounded-full cursor-pointer peer-checked:ring-black ring-[#e4e4e4] ring-1 ring-offset-2 transition-all duration-200"
        ></label>
      </div>
      <ReactTooltip padding="7px 15px" delayShow={100} effect="solid" />
    </>
  );
};

export default SelectColorItem;
