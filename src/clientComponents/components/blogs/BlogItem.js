import React from "react";
import { BsCalendar4Week } from "react-icons/bs";
import { Link } from "react-router-dom";

const BlogItem = ({ style }) => {
  const [show, setShow] = React.useState(false);
  return (
    <div
      className="w-full"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <div className="relative w-full h-0 pb-[85%] rounded-sm overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1565507853405-7660f26ffc9f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80"
          alt=""
          className="absolute inset-0 w-full h-full"
        />
      </div>
      <div
        style={{ animationDuration: "1.5s", ...style }}
        className={`relative z-10 -mt-10 w-[80%] bg-white mx-auto p-6 wow animate__animated animate__fadeInDown transition-all duration-300 ease-linear ${
          show ? "shadow-md" : "shadow-none"
        }`}
      >
        <div className="flex items-end mb-3 gap-x-3">
          <span>
            <BsCalendar4Week size={"1.25rem"}></BsCalendar4Week>
          </span>
          <span className="text-sm leading-none line-clamp-1">
            16 February 2020
          </span>
        </div>
        <p className="mb-3 text-lg font-bold line-clamp-2">
          What Curling Irons Are The Best Ones
        </p>
        <Link
          className={`relative py-1 uppercase text-[13px] tracking-[4px] font-bold after:absolute after:h-[2px] after:bottom-0 after:left-0 after:transition-all after:duration-300 after:ease-linear ${
            show
              ? "after:w-1/2 after:bg-[#e53637]"
              : "after:w-full after:bg-black"
          }`}
        >
          read more
        </Link>
      </div>
    </div>
  );
};

export default BlogItem;
