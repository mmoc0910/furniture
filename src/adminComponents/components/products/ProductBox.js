import React from "react";
import Categories from "./Categories";
import EditorProduct from "./EditorProduct";
import GenerationInfoProduct from "./GenerationInfoProduct";
import PriviewMode from "./PriviewMode";
import PropertyProduct from "./PropertyProduct";
import TagName from "./TagName";
import TransportInfoProduct from "./TransportInfoProduct";
import UploadImg from "./UploadImg";
import VisibilityProduct from "./VisibilityProduct";

const ProductBox = () => {
  return (
    <div className="grid grid-cols-12 gap-7">
      <div className="w-full h-full col-span-6 max-h-[430px]">
        <UploadImg></UploadImg>
      </div>
      <div className="col-span-3">
        <GenerationInfoProduct></GenerationInfoProduct>
      </div>
      <div className="grid grid-cols-1 col-span-3 grid-rows-2 gap-7">
        <VisibilityProduct></VisibilityProduct>
        <PriviewMode></PriviewMode>
      </div>
      <div className="grid grid-cols-2 col-span-6 gap-7">
        <div className="col-span-1">
          <Categories></Categories>
        </div>
        <div className="col-span-1">
          <TagName></TagName>
        </div>
        <div className="col-span-2">
          <PropertyProduct></PropertyProduct>
        </div>
        <div className="col-span-2">
          <TransportInfoProduct></TransportInfoProduct>
        </div>
      </div>
      <div className="col-span-6">
        <EditorProduct></EditorProduct>
      </div>
    </div>
  );
};

export default ProductBox;
