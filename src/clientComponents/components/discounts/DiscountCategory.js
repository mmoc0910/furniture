import React from "react";
import DiscountCategoryItem from "./DiscountCategoryItem";

const discountCategory = [
  {
    name: "Clothings Hot Clothings Hot Clothings Hot",
  },
  {
    name: "Shoe Collection",
  },
  {
    name: "Accessories",
  },
];
const DiscountCategory = () => {
  const [state, setState] = React.useState(0);
  return (
    <div className="relative z-20 max-w-full lg:max-w-[25%] w-full after:absolute after:w-[700px] after:h-[400px] after:bg-[#ffffff] after:top-0 after:-translate-y-1/4 after:right-[85%] lg:after:right-[60%] after:-z-10">
      <div className="relative flex flex-col items-start justify-center gap-y-6 text-[34px] text-[#b7b7b7] leading-normal">
        {discountCategory &&
          discountCategory.map((item, index) => (
            <DiscountCategoryItem
              key={index}
              style={{
                animationDelay: `${index * 0.2}s`,
              }}
              className={`${index === state ? "text-black" : ""} `}
              onClick={() => setState(index)}
            >
              {item.name}
            </DiscountCategoryItem>
          ))}
      </div>
    </div>
  );
};

export default DiscountCategory;
