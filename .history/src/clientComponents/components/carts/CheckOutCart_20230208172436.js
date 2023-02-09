import { debounce } from "lodash";
import React from "react";
import { BsTrash } from "react-icons/bs";
import { useSelector } from "react-redux";
import { fomatNumberMoney } from "../../../helpers/function";
import { Link } from "react-router-dom";

const CheckOutCart = () => {
  const { checkoutCarts } = useSelector((state) => state.checkout);
  const ref = React.useRef();
  React.useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector(".footer");
      if (window.pageYOffset + window.innerHeight >= footer.offsetTop) {
        ref?.current?.classList.remove("fixed");
        ref?.current?.classList.remove("shadow-cart");
      } else {
        ref?.current?.classList.add("fixed");
        ref?.current?.classList.add("shadow-cart");
      }
    };
    window.addEventListener("scroll", debounce(handleScroll, 150));
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const handleCheckout = (carts) => {
    let totalproduct = 0;
    let totalPrice = 0;
    let totalDiscount = 0;
    carts.forEach((item) => {
      totalproduct += item.qty;
      item.productInfo.discountPrice
        ? (totalPrice += item.productInfo.discountPrice * item.qty)
        : (totalPrice += item.productInfo.price * item.qty);
      item.productInfo.discountPrice
        ? (totalDiscount +=
            (item.productInfo.price - item.productInfo.discountPrice) *
            item.qty)
        : (totalDiscount += 0);
    });
    return { totalproduct, totalPrice, totalDiscount };
  };
  return (
    <div
      className="fixed bottom-0 left-0 w-full mt-5 bg-white shadow-cart"
      ref={ref}
    >
      <div className="container w-full">
        <div className="w-full h-full flex border-[3px] border-[#e4e4e4] border-dashed rounded-xl my-5">
          <div className="w-full max-w-[40%] flex md:flex-row flex-col items-start gap-5 md:gap-8 px-5 py-5 md:px-10 md:py-5 border-r-[3px] border-[#e4e4e4] border-dashed">
            <div className="flex flex-row items-center gap-2">
              <input
                type="checkbox"
                name=""
                id="selectAll"
                className="accent-[#e53637]"
              />
              <label htmlFor="selectAll">Chọn tất cả</label>
            </div>
            <div className="flex items-center gap-3 cursor-pointer">
              <BsTrash></BsTrash> Xóa
            </div>
          </div>
          <div className="w-full max-w-[60%] p-5 md:px-10 md:py-5">
            <div className="flex flex-col md:gap-5 md:flex-row md:justify-between">
              <p className="pt-1 font-bold">
                Tổng thanh toán ( {handleCheckout(checkoutCarts).totalproduct}{" "}
                sản phẩm ):
              </p>
              <div>
                <p className="text-2xl text-[#e53637] font-bold">
                  {fomatNumberMoney(handleCheckout(checkoutCarts).totalPrice)}
                </p>
                <p>
                  Tiết kiệm:{" "}
                  <span className="text-[#e53637]">
                    {fomatNumberMoney(
                      handleCheckout(checkoutCarts).totalDiscount
                    )}
                  </span>
                </p>
                <Link
                  to="/checkout"
                  className={`mt-2 block font-bold tracking-[2px] uppercase text-white bg-[#e53637] px-4 py-2 rounded-md ${
                    checkoutCarts.length > 0
                      ? "opacity-100"
                      : "opacity-50 cursor-not-allowed"
                  }`}
                >
                  Mua hàng
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOutCart;
