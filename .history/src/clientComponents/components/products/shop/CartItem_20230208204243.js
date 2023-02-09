import React from "react";
import { BsTrash } from "react-icons/bs";
import { Link } from "react-router-dom";
import { fomatNumberMoney } from "../../../../helpers/function";
import InputNumber from "./InputNumber";
import SelectColorItem from "./SelectColorItem";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { setCheckOutCart } from "../../../../adminComponents/sagas/checkout/checkOutSLice";

const CartItem = ({ cart, handleReduced, handleIncrease, handleDelete }) => {
  const dispatch = useDispatch();
  const { checkoutCarts } = useSelector((state) => state.checkout);
  return (
    <>
      <tr className="border-b border-[#efefef] border-solid">
        <td className="px-3">
          <input
            type="checkbox"
            name="check"
            value={cart.productId}
            id={cart.productId}
            defaultChecked={[...checkoutCarts].some(
              (item) => item.productId === cart.productId
            )}
            className="accent-[#e53637] peer"
            onChange={(e) => {
              if (e.target.checked) {
                dispatch(setCheckOutCart(checkoutCarts.concat(cart)));
              } else {
                dispatch(
                  setCheckOutCart(
                    [...checkoutCarts].filter(
                      (item) => item.productId !== cart.productId
                    )
                  )
                );
              }
            }}
          />
        </td>
        <td className=" md:w-[350px] lg:w-[400px]">
          <div className="flex flex-col gap-3 md:flex-row">
            <Link className="w-20 h-16 md:w-24 md:h-24 shrink-0 grow-0">
              <img
                src={cart.productInfo.images[0]}
                alt={cart.productInfo.productName}
                className="w-full h-full rounded-md"
              />
            </Link>
            <div className="shrink-0 grow-0 md:w-[calc(100%-6rem-0.75rem)]">
              <Link
                className="font-semibold text-left line-clamp-2"
                to={`../shop/${cart.productInfo.slug}`}
              >
                {cart.productInfo.productName}
              </Link>
              {Object.keys(cart.properties).length > 0 && (
                <div className="items-start">
                  <p className="text-left text-[#b7b7b7] mb-1">
                    Phân loại hàng:
                  </p>
                  <div className="flex items-center space-x-3">
                    {cart.properties?.color && (
                      <SelectColorItem
                        disabled={true}
                        size="1rem"
                        colorName={cart.properties?.color?.colorName}
                        color={cart.properties?.color?.colorValue}
                      ></SelectColorItem>
                    )}
                    {Object.keys(cart.properties).map(
                      (prop) =>
                        prop !== "color" && (
                          <p
                            className="px-1 text-sm border border-black rounded-md"
                            key={uuidv4()}
                          >
                            {cart.properties[prop]}
                          </p>
                        )
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </td>
        <td className="hidden md:table-cell">
          <div className="flex flex-col items-center justify-center md:gap-1 lg:gap-3 lg:flex-row">
            <p className="text-lg ">
              {cart.productInfo.discountPrice
                ? fomatNumberMoney(cart.productInfo.discountPrice)
                : fomatNumberMoney(cart.productInfo.price)}
            </p>
            {cart.productInfo.discountPrice && (
              <p className="line-through decoration decoration-black">
                {fomatNumberMoney(cart.productInfo.price)}
              </p>
            )}
          </div>
        </td>
        <td>
          <div className="flex w-20 mx-auto">
            <InputNumber
              handleReduced={handleReduced}
              handleIncrease={handleIncrease}
              qty={cart.qty}
            ></InputNumber>
          </div>
        </td>
        <td>
          {cart.productInfo.discountPrice
            ? fomatNumberMoney(cart.productInfo.discountPrice * cart.qty)
            : fomatNumberMoney(cart.productInfo.price * cart.qty)}
        </td>
        <td className="px-2 cursor-pointer">
          <span onClick={handleDelete}>
            <BsTrash></BsTrash>
          </span>
        </td>
      </tr>
    </>
  );
};

export default CartItem;
