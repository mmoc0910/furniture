import React from "react";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

const BlogDetail = () => {
  return (
    <>
      <div className="pt-16 pb-24 lg:pt-32 lg:pb-64 bg-[#f3f2ee]">
        <div className="container">
          <h2 className="text-2xl font-bold lg:text-[42px] mb-5 leading-normal text-center max-w-[720px] mx-auto">
            Are you one of the thousands of Iphone owners who has no idea
          </h2>
          <div className="flex items-stretch justify-center gap-5 mb-5 leading-none">
            <p>By Deercreative</p>
            <div className="border-l-2 border-black border-solid"></div>
            <p>February 21, 2019</p>
          </div>
          <div className="flex items-center justify-center gap-1 font-bold">
            <span>#Fashion</span>
            <span>#Trending</span>
            <span>#2020</span>
          </div>
        </div>
      </div>
      <div className="container mb-10 lg:mb-20 -mt-14 lg:-mt-40">
        <img
          src="https://images.unsplash.com/photo-1514411959691-a8f39b0ac8b8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1880&q=80"
          alt=""
          className="object-center w-full h-auto rounded-lg"
        />
      </div>
      <div className="lg:max-w-[60%] container mx-auto relative">
        <div className="relative flex flex-col items-center gap-6 mb-7 lg:absolute lg:top-0 lg:-left-24">
          <span className="text-xl font-bold uppercase ">Share</span>
          <div className="flex gap-3 text-white lg:flex-col">
            <div className="cursor-pointer bg-[#4267b2] w-10 h-10 rounded-full flex items-center justify-center">
              <FaFacebookF></FaFacebookF>
            </div>
            <div className="cursor-pointer bg-[#1da1f2]  w-10 h-10 rounded-full flex items-center justify-center">
              <FaTwitter></FaTwitter>
            </div>
            <div className="cursor-pointer bg-[#fe0003]  w-10 h-10 rounded-full flex items-center justify-center">
              <FaYoutube></FaYoutube>
            </div>
            <div className="cursor-pointer bg-[#0173b2]  w-10 h-10 rounded-full flex items-center justify-center">
              <FaLinkedinIn></FaLinkedinIn>
            </div>
          </div>
        </div>
        <div className="h-[600px] pb-10">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ea possimus
          recusandae quas, alias nisi vitae? Nesciunt, dolores fuga. Et quis
          earum aliquam quas atque eos quisquam similique repellendus quaerat
          minus. Ut, velit. Quam obcaecati voluptate, itaque nemo eligendi eaque
          vel sunt totam delectus aut expedita accusantium fugit asperiores
          dolor! Voluptate fugiat neque id aliquid voluptatibus repellendus
          recusandae voluptas, deleniti ut provident delectus blanditiis eos
          veniam nobis laudantium corrupti ex sunt reprehenderit, incidunt,
          velit illo. Nisi illo minus magni asperiores ipsum autem aperiam
          cumque, dolor facere dicta deserunt cupiditate inventore vel? Quidem
          voluptate repellat magni sunt et cupiditate reiciendis, pariatur
          eligendi.
        </div>
        <div className="flex items-center justify-between mb-32">
          <div className="flex items-center gap-2 cursor-pointer">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                />
              </svg>
            </span>
            <span className="font-bold uppercase lg:tracking-[4px]">
              Previous Pod
            </span>
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <span className="font-bold uppercase lg:tracking-[4px]">
              Next Pod
            </span>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogDetail;
