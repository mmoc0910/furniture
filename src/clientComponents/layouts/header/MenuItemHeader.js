import React from "react";
import { AiFillCaretRight } from "react-icons/ai";
import { NavLink } from "react-router-dom";

const MenuItemHeader = ({ url, name, listMenuChild }) => {
  const [show, setShow] = React.useState(false);
  return (
    <>
      <li
        className="relative group"
        onClick={(e) => {
          setShow(!show);
        }}
        onBlur={() => setShow(false)}
      >
        <NavLink
          onClick={(e) => {
            if (listMenuChild && listMenuChild.length > 0) e.preventDefault();
          }}
          to={url}
          className={({ isActive }) =>
            `md:text-lg font-semibold relative md:after:absolute after:hidden md:after:block after:h-[3px] after:bg-[#e53637] after:top-full hover:after:w-full hover:after:left-0 after:transition-all after:duration-500  ${
              isActive
                ? "after:w-full after:left-0"
                : "after:w-0 after:left-1/2"
            } ${
              listMenuChild && listMenuChild.length > 0 && "flex items-center"
            }
            ${show && "after:w-full after:left-0"}
            `
          }
        >
          {name}
          {listMenuChild && listMenuChild.length > 0 && (
            <span
              className={`md:hidden ${
                show && "rotate-90"
              } transition-all duration-300`}
            >
              <AiFillCaretRight></AiFillCaretRight>
            </span>
          )}
        </NavLink>
        {listMenuChild && listMenuChild.length > 0 && (
          <ul
            className={`space-y-4 md:space-y-0 px-4 md:px-0 font-semibold md:bg-black md:min-w-[150px] md:py-3 md:font-normal md:text-white capitalize md:text-sm md:absolute md:z-40 md:top-[200%] md:left-0 md:opacity-0 md:invisible md:group-hover:opacity-100 group-hover:visible md:group-hover:top-[calc(100%+3px)] transition-all duration-300 md:rounded-sm
          md:max-h-96 ${show ? "max-h-40" : "max-h-0 overflow-hidden"}
          `}
          >
            {listMenuChild.map((item, index) => (
              <li
                className={`md:px-5 md:py-2 ${index === 0 && "mt-4 md:mt-0"}`}
                key={item.name}
              >
                <NavLink to={item.url}>{item.name}</NavLink>
              </li>
            ))}
          </ul>
        )}
      </li>
    </>
  );
};

export default MenuItemHeader;
