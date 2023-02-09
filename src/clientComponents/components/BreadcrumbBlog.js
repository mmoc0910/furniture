import React from "react";

const BreadcrumbBlog = ({ children }) => {
  return (
    <div
      className="relative flex items-center justify-center bg-center bg-cover h-80"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1623114112815-74a4b9fe505d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80')",
      }}
    >
      <div className="absolute inset-0 z-[5] bg-black opacity-25"></div>
      <div className="container relative z-10 flex items-center justify-center">
        <h2 className="text-6xl font-bold text-white">{children}</h2>
      </div>
    </div>
  );
};

export default BreadcrumbBlog;
