import React from "react";
import Box from "../Box";
import { CheckBoxCustom } from "../forms";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setProduct } from "../../sagas/products/productSlice";

const VisibilityProduct = () => {
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.product);
  return (
    <Box>
      <div className="flex flex-col gap-5">
        <h3 className="text-2xl font-bold">Hiển thị sản phẩm</h3>
        <p className="text-[#8e8d8c]">
          Sản phẩm sẽ bị ẩn khỏi khách hàng nếu bạn tắt chế độ này
        </p>
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-4">
            {product.visibility ? (
              <>
                <FaEye color="#3c897b" size={"1.5rem"}></FaEye>
                <p className="font-bold line-clamp-1">Sản phẩm hiện thị</p>
              </>
            ) : (
              <>
                <FaEyeSlash color="#d7d7d6" size={"1.5rem"}></FaEyeSlash>
                <p className="font-bold line-clamp-1">sản phẩm bị ẩn</p>
              </>
            )}
          </div>
          <CheckBoxCustom
            id="VisibilityProduct"
            name="visibility"
            checked={product.visibility}
            onChange={(e) =>
              dispatch(
                setProduct({ name: e.target.name, value: e.target.checked })
              )
            }
          ></CheckBoxCustom>
        </div>
      </div>
    </Box>
  );
};

export default VisibilityProduct;
