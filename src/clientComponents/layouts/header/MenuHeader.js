import React from "react";
import MenuItemHeader from "./MenuItemHeader";

const menuLinks = [
  {
    url: "/",
    name: "Trang chủ",
  },
  {
    url: "/shop",
    name: "Cửa hàng",
  },
  {
    url: "/blog",
    name: "Tin tức",
  },
  // {
  //   url: "/pages",
  //   name: "Pages",
  //   listMenuChild: [
  //     {
  //       url: "/ff",
  //       name: "Blog Detail",
  //     },
  //     {
  //       url: "/gg",
  //       name: "About Us",
  //     },
  //     {
  //       url: "/ss",
  //       name: "Shop detail",
  //     },
  //   ],
  // },
  {
    url: "/contact",
    name: "Liên hệ",
  },
];
const MenuHeader = ({ ...props }) => {
  return (
    <div {...props}>
      <ul className="items-center space-y-4 md:space-y-0 md:flex md:space-x-7 xl:space-x-12">
        {menuLinks &&
          menuLinks.map((item) => (
            <MenuItemHeader
              key={item.name}
              url={item.url}
              name={item.name}
              listMenuChild={item.listMenuChild}
            ></MenuItemHeader>
          ))}
      </ul>
    </div>
  );
};

export default MenuHeader;
