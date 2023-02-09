import React from "react";
import SelectColorItem from "./SelectColorItem";
import { v4 as uuidv4 } from "uuid";
const SelectColor = ({ data, ...props }) => {
  return (
    <div className="flex items-center gap-4">
      {data &&
        data.length > 0 &&
        data.map((item) => (
          <SelectColorItem
            size="1.5rem"
            key={uuidv4()}
            color={item.colorValue}
            colorName={item.colorName}
            id={item.id}
            {...props}
          ></SelectColorItem>
        ))}
    </div>
  );
};

export default SelectColor;
