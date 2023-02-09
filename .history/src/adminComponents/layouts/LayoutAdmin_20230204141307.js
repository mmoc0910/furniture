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
      <div className="flex w-screen h-screen select-none gap-14 flex-nowrap">
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
          <ChatIcon />
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
  const [state, setState] = React.useState(false);
  return (
    <div className="relative">
      {state && <ChatBox />}
      <div
        className={`flex mb-10 items-center justify-center w-10 h-10 rounded-lg cursor-pointer transition-all duration-150 ${
          state ? "text-white bg-black" : "text-[#9494a8] bg-[#efefef]"
        }`}
        onClick={() => setState((state) => !state)}
      >
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M4.804 21.644A6.707 6.707 0 006 21.75a6.721 6.721 0 003.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 01-.814 1.686.75.75 0 00.44 1.223zM8.25 10.875a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zM10.875 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875-1.125a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </div>
    </div>
  );
};

const ChatBox = () => {
  return (
    <div className="rounded-lg shadow-chat w-[500px] h-[450px] bg-white absolute bottom-0 left-16 z-50 cursor-default grid grid-cols-5">
      <div className="col-span-2"></div>
      <div className="flex items-center w-full col-span-3 px-5 py-3 text-black">
        <p className="font-bold text-lg text-[#32776b]">mmoc09@</p>
        <span className="ml-auto mr-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="#32776b"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
          </svg>
        </span>
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="#32776b"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </span>
      </div>
    </div>
  );
};
export default layoutAdmin;
