import React from "react";
import Box from "../Box";
import { Input, Textarea } from "../forms";
import { useDispatch, useSelector } from "react-redux";
import { setProduct } from "../../sagas/products/productSlice";
import { debounce } from "lodash";

const GenerationInfoProduct = () => {
  const { productName, discountPrice, price, productDesc, amount } =
    useSelector((state) => state.product.product);
  const dispatch = useDispatch();

  const handleUpdateProduct = debounce((e) => {
    dispatch(setProduct({ name: e.target.name, value: e.target.value }));
  }, 300);
  return (
    <Box>
      <div className="flex flex-col h-full gap-5">
        <h3 className="text-2xl font-bold">Thông tin chung</h3>
        <Input
          autoComplete="off"
          placeholder="Tên sản phẩm"
          name="productName"
          defaultValue={productName}
          onChange={(e) => handleUpdateProduct(e)}
        ></Input>
        <Input
          autoComplete="off"
          type="number"
          placeholder="Số lượng"
          name="amount"
          defaultValue={amount}
          onChange={(e) => handleUpdateProduct(e)}
        ></Input>
        <Input
          type="number"
          placeholder="Giá sản phẩm"
          min={1}
          name="price"
          defaultValue={price}
          onChange={(e) => handleUpdateProduct(e)}
        ></Input>
        <Input
          type="number"
          placeholder="Giá khuyến mại"
          min={1}
          name="discountPrice"
          defaultValue={discountPrice}
          onChange={(e) => handleUpdateProduct(e)}
        ></Input>
        <Textarea
          name="productDesc"
          placeholder="Mô tả chung sản phẩm"
          className="h-full resize-none"
          defaultValue={productDesc}
          onChange={(e) => handleUpdateProduct(e)}
        ></Textarea>
      </div>
    </Box>
  );
};

export default GenerationInfoProduct;
