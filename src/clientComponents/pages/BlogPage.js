import React from "react";
import BlogItem from "../components/blogs/BlogItem";
import BreadcrumbBlog from "../components/BreadcrumbBlog";

const BlogPage = () => {
  return (
    <>
      <BreadcrumbBlog>Our Blog</BreadcrumbBlog>
      <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-24 gap-x-[30px] gap-y-12">
        <BlogItem></BlogItem>
        <BlogItem></BlogItem>
        <BlogItem></BlogItem>
        <BlogItem></BlogItem>
        <BlogItem></BlogItem>
        <BlogItem></BlogItem>
        <BlogItem></BlogItem>
      </div>
    </>
  );
};

export default BlogPage;
