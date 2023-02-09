import dayjs from "dayjs";
import React from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { dateFormat, fomatNumberMoney } from "../../../helpers/function";
import {
  getProduct,
  setFocusItem,
  setModalEdit,
} from "../../sagas/products/productSlice";

const ProductItem = ({ data }) => {
  const { products } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  return (
    <>
      <div className="py-[7px] border-b">
        <div
          className={`grid grid-cols-12 text-[#4d7a94] font-medium hover:bg-[#e2edf2] rounded-xl transition-all duration-100`}
          onClick={() => {
            dispatch(setFocusItem(data.id));
            products.forEach((item) => {
              item.id === data.id && dispatch(getProduct(item));
            });
            dispatch(setModalEdit(true));
          }}
        >
          <div className="col-span-2 align-middle">
            <div className="flex items-center gap-2 px-2 py-2">
              {/* <CheckBox id={data.id}></CheckBox> */}
              <img
                src={data.images[0]}
                alt=""
                className="object-cover w-16 h-16 ml-8 rounded-lg"
              />
            </div>
          </div>
          <div className="flex items-center col-span-3 px-2 py-2">
            <p className="line-clamp-1">{data.productName}</p>
          </div>
          <div className="flex items-center col-span-2 px-2 py-2 align-middle">
            <p>{data.price && fomatNumberMoney(data.price)}</p>
          </div>
          <div className="flex items-center col-span-2 px-2 py-2 align-middle">
            <p className="line-clamp-1">{data.categoryName}</p>
          </div>
          <div className="flex items-center col-span-1 px-2 py-2 align-middle">
            <p className="line-clamp-1">{data.amount}</p>
          </div>
          <div className="flex items-center col-span-1 px-2 py-2 align-middle">
            <p className="line-clamp-1">{dateFormat(data.createdAt)}</p>
          </div>
          <div className="flex items-center justify-center col-span-1 px-2 py-2 align-middle">
            {data.visibility ? (
              <FaEye color="#3c897b" size={"1.2rem"}></FaEye>
            ) : (
              <FaEyeSlash color="#d7d7d6" size={"1.2rem"}></FaEyeSlash>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const CheckBox = ({ id }) => {
  return (
    <div className="shrink-0">
      <input type="checkbox" className="hidden peer" id="checkbox1" />
      <label
        htmlFor="checkbox1"
        className="relative block w-5 h-5 border-2 border-[#4d7a94] rounded-md peer-checked:bg-[#4d7a94] peer-checked:text-white text-transparent"
      >
        <span className="absolute z-10 -translate-x-1/2 -translate-y-1/2 top-1/2 bg-blacktop-1/2 left-1/2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2.5"
            stroke="currentColor"
            className="w-[15px] h-[15px]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </span>
      </label>
    </div>
  );
};

export default ProductItem;
