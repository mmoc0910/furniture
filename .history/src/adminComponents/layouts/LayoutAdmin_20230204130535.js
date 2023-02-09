import React from "react";
import { AiFillCaretDown } from "react-icons/ai";
import {
  BsFillFileTextFill,
  BsFillGridFill,
  BsHandbagFill,
  BsPeopleFill,
} from "react-icons/bs";
import { NavLink, Outlet } from "react-router-dom";
import Logo from "../../clientComponents/components/Logo";
import ReactTooltip from "react-tooltip";
import { FaPager } from "react-icons/fa";

const menus = [
  {
    id: 1,
    url: "/admin/dashboard",
    title: "Dashboard",
    icon: <BsFillGridFill size={"1.5rem"} color="inherit"></BsFillGridFill>,
  },
  {
    id: 2,
    url: "/admin/orders",
    title: "Dơn hàng",
    icon: (
      <BsFillFileTextFill size={"1.5rem"} color="inherit"></BsFillFileTextFill>
    ),
  },
  {
    id: 3,
    url: "/admin/products",
    title: "Sản phẩm",
    icon: <BsHandbagFill size={"1.5rem"} color="inherit"></BsHandbagFill>,
  },
  {
    id: 4,
    url: "/admin/users",
    title: "Người dùng",
    icon: <BsPeopleFill size={"1.5rem"} color="inher"></BsPeopleFill>,
  },
  {
    id: 5,
    url: "/admin/banners",
    title: "Banners",
    icon: <FaPager size={"1.5rem"} color="inher"></FaPager>,
  },
  // {
  //   id: 6,
  //   url: "/admin/discounts",
  //   title: "Giảm giá",
  //   icon: (
  //     <AiOutlinePercentage size={"1.5rem"} color="inher"></AiOutlinePercentage>
  //   ),
  // },
];
const layoutAdmin = () => {
  return (
    <>
      <div className="flex w-screen h-screen gap-14 flex-nowrap">
        <div className="flex flex-col items-center justify-between px-5 py-10">
          <div className="flex flex-col items-center gap-5">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#32776b] text-white font-extrabold text-3xl">
              F
            </div>
            {menus &&
              menus.map((item) => (
                <MenuItem
                  key={item.id}
                  url={item.url}
                  title={item.title}
                  children={item.icon}
                ></MenuItem>
              ))}
          </div>
        </div>
        <div className="w-full max-w-full pt-10 pb-20 overflow-y-auto pr-14 scroll-smooth">
          <div className="flex items-center justify-between pb-8">
            <Logo color="#32776b" className="text-5xl font-extrabold"></Logo>
            <div className="flex items-center gap-2">
              <img
                src="https://images.unsplash.com/photo-1669546629787-64b58583a5f2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1896&q=80"
                className="object-cover rounded-lg w-11 h-11"
                alt=""
              />
              <div className="">
                <p className="flex items-center gap-1 font-bold">
                  Mr.DianaVinhPham
                  <span>
                    <AiFillCaretDown color="#8e8d8c"></AiFillCaretDown>
                  </span>
                </p>
                <p className="text-[#8e8d8c]">Owner</p>
              </div>
            </div>
          </div>
          {<Outlet></Outlet>}
        </div>
      </div>
    </>
  );
};

const MenuItem = ({ url, title, children }) => {
  return (
    <>
      <NavLink
        to={url}
        className={({ isActive }) =>
          `w-10 h-10 rounded-lg flex items-center justify-center ${
            isActive ? "text-white bg-black" : "text-[#9494a8] bg-[#efefef]"
          }`
        }
        data-tip={title}
      >
        {children}
      </NavLink>
      <ReactTooltip
        padding="7px 15px"
        delayShow={100}
        effect="solid"
        place="right"
      />
    </>
  );
};

const ChatIcon = () => {
  return (
    <div className="">
      <span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
          />
        </svg>
      </span>
    </div>
  );
};
export default layoutAdmin;
