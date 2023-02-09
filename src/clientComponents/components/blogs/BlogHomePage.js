import React from "react";
import BlogItem from "./BlogItem";

const BlogHomePage = () => {
  return (
    <div className="container mb-24">
      <p className="pb-4 uppercase text-[#e53637] text-sm font-bold tracking-[2px] text-center">
        LATEST NEWS
      </p>
      <h2 className="mb-20 text-4xl font-bold text-center capitalize">
        Fashion New Trends
      </h2>
      <div className="grid grid-cols-1 gap-y-7 md:grid-cols-2 lg:grid-cols-3 gap-x-[30px]">
        <BlogItem
          style={{
            animationDelay: "0s",
          }}
        ></BlogItem>
        <BlogItem
          style={{
            animationDelay: "0.2s",
          }}
        ></BlogItem>
        <BlogItem
          style={{
            animationDelay: "0.4s",
          }}
        ></BlogItem>
      </div>
    </div>
  );
};

export default BlogHomePage;
