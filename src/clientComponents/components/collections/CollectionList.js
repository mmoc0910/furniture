import React from "react";
import CollectionItem from "./CollectionItem";

const CollectionList = () => {
  return (
    <div className="container">
      <div className="flex flex-wrap mx-[-15px] gap-y-10 md:gap-y-0">
        <CollectionItem
          location="first"
          urlImg="https://images.unsplash.com/photo-1623114112815-74a4b9fe505d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80"
        ></CollectionItem>
        <CollectionItem
          location="left"
          urlImg="https://images.unsplash.com/photo-1582840803949-474387fd70a3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1780&q=80"
        ></CollectionItem>
        <CollectionItem
          location="right"
          urlImg="https://images.unsplash.com/photo-1612293905838-667dea27cc79?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80"
        ></CollectionItem>
      </div>
    </div>
  );
};

export default CollectionList;
