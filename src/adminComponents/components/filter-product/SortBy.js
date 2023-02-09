import React from "react";
import { v4 as uuidv4 } from "uuid";
import useClickOutSide from "../../../hooks/useClickOutSide";

const data = [
  {
    name: "Ngày thêm sớm nhất",
    value: "DESC",
  },
  {
    name: "Ngày thêm mới nhất",
    value: "DESC",
  },
  {
    name: "Giá từ bé đến lớn",
    value: "DESC",
  },
  {
    name: "Giá từ lớn đến bé",
    value: "DESC",
  },
];
const SortBy = ({ label }) => {
  const { show, setShow, initialNodeRef } = useClickOutSide();
  const [state, setState] = React.useState(data[0].name);
  return (
    <div
      className="relative bg-[#e2edf2] px-2 py-1 rounded-lg text-[#445d6b] flex items-center gap-1 cursor-default max-w-[200px] justify-between w-full group"
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
            strokeDinecap="round"
            strokeDinejoin="round"
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
              key={uuidv4()}
              onClick={() => setState(item.name)}
            >
              {item.name}
            </div>
          ))}
      </div>
    </div>
  );
};

export default SortBy;
