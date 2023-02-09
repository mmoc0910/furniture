import React from "react";
import { uuidv4 } from "@firebase/util";
import { Link } from "react-router-dom";
import SelectColorItem from "../products/shop/SelectColorItem";
import { fomatNumberMoney, handleCheckout } from "../../../helpers/function";
import axios from "axios";
import { infoShip } from "../../../helpers/shipping";
import { orderStatus } from "../../../helpers/orderInfo";
import dayjs from "dayjs";
import { Button } from "../forms";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase-config";
import swal from "sweetalert";

const OrderItem = ({ order, status }) => {
  const [state, setState] = React.useState("");
  const [leadtime, setleadtime] = React.useState();
  React.useEffect(() => {
    const getOrderInfo = async () => {
      if (order.order_code) {
        const orderInfo = await axios({
          method: "post",
          url: "https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/detail",
          headers: {
            "Content-Type": "application/json",
            Token: infoShip.token,
          },
          data: { order_code: order.order_code },
        });
        // console.log(orderInfo.data.data.leadtime);
        setleadtime(orderInfo.data.data.leadtime);
        setState(orderInfo.data.data.status);
      }
    };
    getOrderInfo();
    if (
      order.status === 0 &&
      (order.cancellationReason.seller || order.cancellationReason.buyer)
    )
      setState("cancel");
    if (
      order.status === 0 &&
      !order.cancellationReason.seller &&
      !order.cancellationReason.buyer
    )
      setState("wait");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order.order_code]);
  if (status === state) {
    return <Order order={order} state={state} leadtime={leadtime} />;
  } else if (status === "all") {
    return <Order order={order} state={state} leadtime={leadtime} />;
  } else if (
    order.status === 1 &&
    status === "delivering" &&
    state !== "finish" &&
    state !== "cancel" &&
    state !== "wait"
  ) {
    return <Order order={order} state={state} leadtime={leadtime} />;
  } else if (order.status === 2 && status === "finish") {
    return <Order order={order} state={state} leadtime={leadtime} />;
  }
};

const Order = ({ order, state, leadtime }) => {
  const [show, setShow] = React.useState(false);
  return (
    <div className="flex flex-col gap-3 px-5 py-4 rounded-lg bg-[#efefef]">
      <div className="grid grid-cols-10 gap-5">
        <div className="flex flex-col col-span-6 gap-3">
          <div className="flex items-center justify-between">
            {order.status === 0 &&
              (order.cancellationReason.buyer ||
                order.cancellationReason.seller) && (
                <p className="text-lg font-semibold text-[#ed7976]">
                  {(order.cancellationReason.buyer &&
                    `Lý do hủy bên người mua: ${order.cancellationReason.buyer}`) ||
                    (order.cancellationReason.seller &&
                      `Lý do hủy bên người bán: ${order.cancellationReason.seller}`)}
                </p>
              )}
            {order.status === 1 &&
              !order.cancellationReason.buyer &&
              !order.cancellationReason.seller && (
                <>
                  <p className="text-lg font-semibold text-[#4d7a94]">
                    {orderStatus[state]}
                  </p>
                  <p className="font-semibold">
                    Dự kiến giao: {dayjs(leadtime).format("DD/MM/YYYY")}
                  </p>
                </>
              )}
            {state === "wait" && (
              <>
                <p className="text-lg font-semibold text-[#4d7a94]">
                  Người bán đang xác nhận đơn
                </p>
                <Button
                  className="font-semibold text-white capitalize bg-[#ed7976] rounded-lg px-2 py-1"
                  onClick={async () => {
                    try {
                      const cancellationReason = await swal("Lý do hủy đơn", {
                        content: "input",
                      });
                      console.log(cancellationReason);
                      const docRef = doc(db, "orders", order.id);
                      await updateDoc(docRef, {
                        "cancellationReason.buyer": cancellationReason,
                      });
                    } catch (err) {
                      console.log(err);
                    }
                  }}
                >
                  Hủy đơn
                </Button>
              </>
            )}
          </div>

          {order.products.map((product) => (
            <div className="flex gap-5" key={uuidv4()}>
              <img
                src={product.productInfo.images[0]}
                alt=""
                className="object-cover w-20 h-24 rounded-md shrink-0 grow-0"
              />
              <div className="flex flex-col justify-center gap-1">
                <Link to="" className="text-lg font-semibold line-clamp-1">
                  {product.productInfo.productName}
                </Link>

                {Object.keys(product.properties).length > 0 && (
                  <div className="flex items-center gap-2">
                    <p>Phân loại: </p>
                    {product.properties?.color && (
                      <>
                        <SelectColorItem
                          size="0.8rem"
                          color={product.properties?.color.colorValue}
                          colorName={product.properties?.color.colorName}
                        ></SelectColorItem>
                        <p>{product.properties?.color.colorName}</p>
                      </>
                    )}
                    {Object.keys(product.properties).map(
                      (property) =>
                        property !== "color" && (
                          <p
                            key={uuidv4()}
                            className="px-1 border border-black rounded-lg"
                          >
                            {product.properties[property]}
                          </p>
                        )
                    )}
                  </div>
                )}

                <div className="flex items-center">
                  <p>
                    {product.productInfo.discountPrice
                      ? fomatNumberMoney(product.productInfo.discountPrice)
                      : fomatNumberMoney(product.productInfo.price)}
                  </p>
                  <p> x </p> <p>{product.qty}</p> <p>=</p>{" "}
                  <p>
                    {product.productInfo.discountPrice
                      ? fomatNumberMoney(
                          product.productInfo.discountPrice * product.qty
                        )
                      : fomatNumberMoney(
                          product.productInfo.price * product.qty
                        )}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="col-span-4">
          <p className="mb-2 text-lg font-semibold">Địa chỉ nhận hàng</p>
          <div className="font-semibold">
            <div className="space-x-2">
              <p className="inline-block">Tên người nhận:</p>
              <p className="inline-block font-normal">
                {order.transportInfo.to_name}
              </p>
            </div>
            <div className="space-x-2">
              <p className="inline-block ">Số điện thoại:</p>
              <p className="inline-block font-normal">
                {order.transportInfo.to_phone}
              </p>
            </div>
            <div className="space-x-2 ">
              <p className="inline-block">Địa chỉ:</p>
              <p className="inline-block font-normal">
                {order.transportInfo.to_address},{" "}
                {order.transportInfo.province.to_province_name},{" "}
                {order.transportInfo.district.to_district_name},{" "}
                {order.transportInfo.ward.to_ward_name}.
              </p>
            </div>
          </div>
          <p className="my-2 text-lg font-semibold">Tổng phí</p>
          <div className="font-semibold">
            <div className="flex justify-between gap-2">
              Tổng tiền hàng:{" "}
              <p className="font-normal">
                {fomatNumberMoney(handleCheckout(order.products).totalPrice)}
              </p>
            </div>
            <div className="flex justify-between gap-2">
              Phí vận chuyển:
              <p className="font-normal">{fomatNumberMoney(order.fee)}</p>
            </div>
            <div className="border-t-2 border-black"></div>
            <div className="flex justify-between gap-2">
              Tổng tiền: <p className="font-normal">1.000</p>
            </div>
          </div>
        </div>
      </div>
      {state === "ready_to_pick" && order.status === 1 && (
        <Button
          className="px-2 py-1 rounded-lg bg-[#4d7a94] text-white max-w-max ml-auto mt-2"
          onClick={async () => {
            try {
              const docRef = doc(db, "orders", order.id);
              await updateDoc(docRef, {
                status: 2,
              });
            } catch (err) {
              console.log(err);
            }
          }}
        >
          Đã nhận được hàng
        </Button>
      )}
      {order.status === 2 && (
        <Button
          className="px-2 py-1 rounded-lg bg-[#4d7a94] text-white max-w-max ml-auto"
          onClick={() => setShow(true)}
        >
          Đánh giá sản phẩm
        </Button>
      )}
      {show && (
        <ModalReview products={order.products} onClick={() => setShow(false)} />
      )}
    </div>
  );
};
const ModalReview = ({ products, onClick }) => {
  return (
    <div className="fixed bg-[#16191b3f] inset-0 z-10 flex justify-center items-center">
      <div
        className="absolute inset-0 z-20 bg-transparent cursor-not-allowed"
        onClick={onClick}
      ></div>
      <div className="relative z-30 w-1/2 bg-white rounded-lg p-7 h-3/4">
        <h3 className="text-2xl font-semibold">Đánh giá sản phẩm</h3>
        <div className="h-[90%] py-2 overflow-scroll scroll-hidden divide-y-2 divide-dashed divide-black">
          {products.map((product) => (
            <ProductReview key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};
const arrStar = [1, 2, 3, 4, 5];
const ProductReview = ({ product }) => {
  console.log(product);
  const [state, setState] = React.useState(0);
  const [review, setReview] = React.useState("");
  return (
    <>
      <div className="py-5 space-y-2">
        <div className="flex gap-2">
          <img
            src={product.productInfo.images[0]}
            alt=""
            className="w-16 h-20 rounded-lg"
          />
          <div className="flex flex-col">
            <Link className="text-lg font-semibold line-clamp-2">
              {product.productInfo.productName}
            </Link>
            {Object.keys(product.properties).length > 0 && (
              <div className="flex items-center gap-2">
                <p>Phân loại: </p>
                {product.properties?.color && (
                  <>
                    <SelectColorItem
                      size="0.8rem"
                      color={product.properties?.color.colorValue}
                      colorName={product.properties?.color.colorName}
                    ></SelectColorItem>
                    <p>{product.properties?.color.colorName}</p>
                  </>
                )}
                {Object.keys(product.properties).map(
                  (property) =>
                    property !== "color" && (
                      <p
                        key={uuidv4()}
                        className="px-1 border border-black rounded-lg"
                      >
                        {product.properties[property]}
                      </p>
                    )
                )}
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center w-1/2 gap-1">
          {arrStar.map((item) =>
            item <= state ? (
              <StarFull key={item} onMouseEnter={() => setState(item)} />
            ) : (
              <Star key={item} onMouseEnter={() => setState(item)} />
            )
          )}
        </div>
        <textarea
          rows="3"
          className="w-full bg-transparent border border-[#797977] rounded-lg scroll-hidden outline-none focus:border-black py-2 px-3"
          value={review}
          onChange={(e) => setReview(e.target.value)}
        ></textarea>
      </div>
    </>
  );
};

const Star = ({ onMouseEnter }) => {
  return (
    <span onMouseEnter={onMouseEnter}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="#f3be00"
        className="w-6 h-6 cursor-pointer"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
        />
      </svg>
    </span>
  );
};
const StarFull = ({ onMouseEnter }) => {
  return (
    <span onMouseEnter={onMouseEnter}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="#f3be00"
        className="w-6 h-6 cursor-pointer"
      >
        <path
          fillRule="evenodd"
          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
          clipRule="evenodd"
        />
      </svg>
    </span>
  );
};

export default OrderItem;
