import React from "react";
import { Link } from "react-router-dom";
import RateStar from "../RateStar";
import { fomatNumberMoney } from "../../../helpers/function";

const ProductItem = ({ product, baseURL = "" }) => {
  const [show, setShow] = React.useState(false);
  const [state, setState] = React.useState(0);
  React.useEffect(() => {
    if (product?.rates.length > 0) {
      let num = 0;
      product.rates.forEach((item) => (num += item.star));
      num = num / product.rates.length;
      setState(num);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div
      className="w-full"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <div className="relative overflow-hidden rounded-sm">
        <img
          src={product.images[0]}
          alt=""
          className="w-full h-[400px] md:h-[300px]"
        />
        {product.discountPrice && (
          <div
            className={`absolute top-5 left-0 font-bold text-[12px] tracking-[2px] uppercase leading-none px-3 py-2 inline-block text-black bg-white`}
          >
            sale
          </div>
        )}
        {/* <div
          className={`absolute z-10 flex flex-col gap-y-5 transition-all duration-500 delay-75 ${
            show
              ? "visible opacity-100 top-5 right-5"
              : "invisible opacity-0 top-5 -right-8"
          }`}
        >
          <span className="flex items-center justify-center w-8 h-8 bg-white rounded-sm cursor-pointer">
            <HeartIcon size="1.5rem"></HeartIcon>
          </span>
          <Link
            className="flex items-center justify-center w-8 h-8 bg-white rounded-sm"
            to={`./shop/${product.slug}`}
          >
            <HiOutlineSearch size="1.5rem"></HiOutlineSearch>
          </Link>
        </div> */}
      </div>
      <div className="mt-5">
        <div className="relative mb-1">
          <h6
            className={`text-[17px] font-semibold line-clamp-1 transition-all duration-200 ${
              show ? "opacity-0 invisible" : "opacity-100 visible"
            }`}
          >
            {product.productName}
          </h6>
          <Link
            to={`${baseURL}./shop/${product.slug}`}
            className={`capitalize cursor-pointer text-[#e53637] text-[17px] font-bold absolute transition-all duration-200 left-0 ${
              show
                ? "top-0 visible opacity-100"
                : "-top-full opacity-0 invisible"
            } `}
          >
            + Chi tiết sản phẩm
          </Link>
        </div>
        <div className="flex items-center gap-1">
          <RateStar rateStar={state}></RateStar>
          <p className="text-sm leading-none">(Đã bán {product.sellNumber})</p>
        </div>

        <div className="flex items-end mt-5 space-x-1 text-xl font-bold">
          <p className="leading-none first-letter:text-sm">
            {product.discountPrice
              ? fomatNumberMoney(product.discountPrice)
              : fomatNumberMoney(product.price)}
          </p>
          {product.discountPrice && (
            <p className="text-sm font-medium line-through first-letter:text-xs decoration-black">
              {fomatNumberMoney(product.price)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
