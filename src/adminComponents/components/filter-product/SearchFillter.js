import { debounce } from "lodash";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../../sagas/products/productSlice";

const SearchFillter = () => {
  const dispatch = useDispatch();
  const { search } = useSelector((state) => state.product.filter);
  const handleChange = debounce((e) => {
    console.log(e.target.value);
    dispatch(setFilter({ name: "search", value: e.target.value }));
  }, 300);
  return (
    <div className="max-w-[200px] w-full relative">
      <input
        type="text"
        className="outline-none bg-[#e2edf2] px-2 py-1 rounded-lg w-full pr-10 caret-[#4d7a94] text-[#4d7a94]"
        placeholder="Tim kiem"
        defaultValue={search}
        onChange={(e) => handleChange(e)}
      />
      <span className="absolute -translate-y-1/2 top-1/2 right-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="#445d6b"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </span>
    </div>
  );
};

export default SearchFillter;
