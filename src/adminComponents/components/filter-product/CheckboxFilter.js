import React from "react";
import { useDispatch } from "react-redux";
import useClickOutSide from "../../../hooks/useClickOutSide";
import { setFilter } from "../../sagas/products/productSlice";

const CheckboxFilter = ({ data, label }) => {
  const { show, setShow, initialNodeRef } = useClickOutSide();
  const [state, setState] = React.useState("");
  const dispatch = useDispatch();
  return (
    <div
      className="relative bg-[#e2edf2] px-2 py-1 rounded-lg text-[#445d6b] flex items-center gap-1 cursor-default max-w-[150px] justify-between w-full group"
      onClick={() => setShow(!show)}
      ref={initialNodeRef}
    >
      <div className="font-bold line-clamp-1">{state || label}</div>
      <span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2.5"
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      </span>
      <div
        className={`absolute cursor-pointer bg-[#e2edf2] rounded-lg top-full right-0 mt-2 before:absolute before:bg-transparent before:h-2 before:w-full before:bottom-full transition-all duration-200 ${
          show ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {data &&
          data.length > 0 &&
          data.map((item) => (
            <div
              className="py-2 pl-5 font-semibold pr-7 whitespace-nowrap"
              key={item.id}
              onClick={() => {
                setState(item.categoryName);
                dispatch(setFilter({ name: "categoryId", value: item.id }));
              }}
            >
              {item.categoryName}
            </div>
          ))}
      </div>
    </div>
  );
};

export default CheckboxFilter;
