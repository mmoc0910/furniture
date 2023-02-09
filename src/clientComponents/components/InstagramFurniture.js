import React from "react";

const listImgInsta = [
  {
    id: 1,
    urlImg:
      "https://images.unsplash.com/photo-1543352631-6b884eafab2f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
  },
  {
    id: 2,
    urlImg:
      "https://images.unsplash.com/photo-1565507853405-7660f26ffc9f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80",
  },
  {
    id: 3,
    urlImg:
      "https://images.unsplash.com/photo-1489743342057-3448cc7c3bb9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1912&q=80",
  },
  {
    id: 4,
    urlImg:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1916&q=80",
  },
  {
    id: 5,
    urlImg:
      "https://images.unsplash.com/photo-1581773340029-480b61d5795a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80",
  },
  {
    id: 6,
    urlImg:
      "https://images.unsplash.com/photo-1560185008-b033106af5c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
  },
];
const InstagramFurniture = () => {
  return (
    <div className="container grid grid-cols-1 lg:grid-cols-3 gap-[30px]">
      <div className="grid grid-cols-3 lg:col-span-2 lg:grid-rows-2">
        {listImgInsta &&
          listImgInsta.map((item) => (
            <div className="relative w-full h-0 pb-[100%]" key={item.id}>
              <img
                src={item.urlImg}
                className="absolute inset-0 w-full h-full"
                alt=""
              />
            </div>
          ))}
      </div>
      <div className="flex flex-col items-start justify-center lg:col-span-1">
        <h2 className="mb-8 text-4xl font-bold">Instagram</h2>
        <p className="mb-16">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <p className="text-[#e53637] font-bold text-3xl">#Furniture_Store</p>
      </div>
    </div>
  );
};

export default InstagramFurniture;
