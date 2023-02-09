import React from "react";
import QuillEditor from "../editor/QuillEditor";
import { useDispatch, useSelector } from "react-redux";
import { setProduct } from "../../sagas/products/productSlice";
import Box from "../Box";
const EditorProduct = () => {
  const dispatch = useDispatch();
  const { detailedOverview } = useSelector((state) => state.product.product);
  return (
    <Box>
      <div className="flex flex-col h-full gap-5">
        <h3 className="text-2xl font-bold">Mô tả chi tiết sản phẩm</h3>
        <QuillEditor
          onChange={(value) =>
            dispatch(setProduct({ name: "detailedOverview", value: value }))
          }
          defaultValue={detailedOverview}
        ></QuillEditor>
      </div>
    </Box>
  );
};

export default EditorProduct;
