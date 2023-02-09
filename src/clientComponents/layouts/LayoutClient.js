import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./footer/Footer";
import { HeaderClient } from "./header";

const LayoutClient = () => {
  return (
    <>
      <HeaderClient></HeaderClient>
      <Outlet></Outlet>
      <Footer>footer</Footer>
    </>
  );
};

export default LayoutClient;
