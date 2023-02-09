import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { SerachIcon } from "../../../icons";

const SearchBarHeader = () => {
  const [openInputSearch, setOpenInputSearch] = React.useState(false);
  return (
    <div>
      <SerachIcon
        size="1.5rem"
        className="cursor-pointer"
        onClick={() => setOpenInputSearch(true)}
      ></SerachIcon>
      <div
        className={`transition-all duration-700 fixed top-0 bottom-0 left-0 right-0 z-50 bg-[#000] ${
          openInputSearch ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="relative flex items-center justify-center w-full h-full">
          <form autoComplete="off">
            <input
              type="text"
              name="search"
              placeholder="Search here......"
              className="w-[300px] text-2xl md:w-[500px] bg-transparent outline-none md:text-[40px] leading-normal text-[#999] placeholder:text-[#999] border-b-2 border-[#333]"
            />
          </form>
          <span
            className="cursor-pointer w-16 h-16 rounded-full bg-[#333] flex justify-center items-center absolute top-10 right-1/2 translate-x-1/2"
            onClick={() => setOpenInputSearch(false)}
          >
            <AiOutlineClose size={"2rem"} color="white"></AiOutlineClose>
          </span>
        </div>
      </div>
      {/* )} */}
    </div>
  );
};

export default SearchBarHeader;
