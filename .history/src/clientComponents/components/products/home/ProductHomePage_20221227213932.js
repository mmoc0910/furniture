import React from "react";
import { useSelector } from "react-redux";
import ProductItem from "../ProductItem";
import FillterBar from "./FillterBar";
import { v4 as uuidv4 } from "uuid";

const ProductHomePage = () => {
  const { products } = useSelector((state) => state.product);
  return (
    <div className="container">
      <FillterBar></FillterBar>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-7 gap-y-10">
        {products &&
          products.length > 0 &&
          products.map((product) => (
            <ProductItem product={product} key={uuidv4()}></ProductItem>
          ))}
      </div>
    </div>
  );
};

export default ProductHomePage;
