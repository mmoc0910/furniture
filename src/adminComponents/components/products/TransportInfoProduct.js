import React from "react";
import Box from "../Box";
import { useSelector, useDispatch } from "react-redux";
import { setProduct } from "../../sagas/products/productSlice";
import { debounce } from "lodash";

const TransportInfoProduct = () => {
  const dispatch = useDispatch();
  const { transpostInfo } = useSelector((state) => state.product.product);
  const handleUpdateProduct = debounce((e, infoName) => {
    dispatch(
      setProduct({
        name: "transpostInfo",
        value: { ...transpostInfo, [infoName]: e.target.value },
      })
    );
  }, 300);
  return (
    <Box>
      <div className="flex flex-col gap-5">
        <h3 className="flex items-center justify-between text-2xl font-bold ">
          Vận chuyển
        </h3>
        <div className="flex items-center gap-7">
          <label form="abc" className="font-semibold whitespace-nowrap">
            Cân nặng (Sau khi đóng gói):
          </label>
          <input
            type="number"
            id="abc"
            placeholder="gr"
            min={1}
            defaultValue={transpostInfo.weight}
            className="w-full mx-auto px-5 border border-[#e6e8ea] py-2 bg-white rounded-lg outline-none"
            onChange={(e) => handleUpdateProduct(e, "weight")}
          />
        </div>
        <div className="space-y-2">
          <label
            form="abc"
            className="font-semibold whitespace-nowrap line-clamp-1"
          >
            Kích thước đóng gói (Phí vận chuyển thực tế sẽ thay đổi nếu bạn nhập
            sai kích thước):
          </label>
          <div className="grid grid-cols-3 gap-5">
            <input
              type="number"
              placeholder="Chiều rộng(cm)"
              min={1}
              className="w-full px-5 border border-[#e6e8ea] py-2 bg-white rounded-lg outline-none"
              onChange={(e) => handleUpdateProduct(e, "width")}
              defaultValue={transpostInfo.width}
            />
            <input
              type="number"
              placeholder="Chiều dài(cm)"
              min={1}
              className="w-full px-5 border border-[#e6e8ea] py-2 bg-white rounded-lg outline-none"
              onChange={(e) => handleUpdateProduct(e, "longs")}
              defaultValue={transpostInfo.longs}
            />
            <input
              type="number"
              placeholder="Chiều cao(cm)"
              min={1}
              className="w-full px-5 border border-[#e6e8ea] py-2 bg-white rounded-lg outline-none"
              onChange={(e) => handleUpdateProduct(e, "height")}
              defaultValue={transpostInfo.height}
            />
          </div>
        </div>
      </div>
    </Box>
  );
};

export default TransportInfoProduct;
