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
    status === "delivering" &&
    state !== "finish" &&
    state !== "cancel" &&
    state !== "wait"
  ) {
    return <Order order={order} state={state} leadtime={leadtime} />;
  }
};

const Order = ({ order, state, leadtime }) => {
  //   console.log(order);
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
                    `L?? do h???y b??n ng?????i mua: ${order.cancellationReason.buyer}`) ||
                    (order.cancellationReason.seller &&
                      `L?? do h???y b??n ng?????i b??n: ${order.cancellationReason.seller}`)}
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
                    D??? ki???n giao: {dayjs(leadtime).format("DD/MM/YYYY")}
                  </p>
                </>
              )}
            {state === "wait" && (
              <>
                {" "}
                <p className="text-lg font-semibold text-[#4d7a94]">
                  Ng?????i b??n ??ang x??c nh???n ????n
                </p>
                <Button
                  className="font-semibold text-white capitalize bg-[#ed7976] rounded-lg px-2 py-1"
                  onClick={async () => {
                    try {
                      const cancellationReason = await swal("L?? do h???y ????n", {
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
                  H???y ????n
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
              <div className="flex flex-col justify-around">
                <Link to="" className="text-lg font-semibold line-clamp-1">
                  {product.productInfo.productName}
                </Link>
                <div className="flex items-center gap-2">
                  <p>Ph??n lo???i: </p>
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
          <p className="mb-2 text-lg font-semibold">?????a ch??? nh???n h??ng</p>
          <div className="font-semibold">
            <div className="space-x-2">
              <p className="inline-block">T??n ng?????i nh???n:</p>
              <p className="inline-block font-normal">
                {order.transportInfo.to_name}
              </p>
            </div>
            <div className="space-x-2">
              <p className="inline-block ">S??? ??i???n tho???i:</p>
              <p className="inline-block font-normal">
                {order.transportInfo.to_phone}
              </p>
            </div>
            <div className="space-x-2 ">
              <p className="inline-block">?????a ch???:</p>
              <p className="inline-block font-normal">
                {order.transportInfo.to_address},{" "}
                {order.transportInfo.province.to_province_name},{" "}
                {order.transportInfo.district.to_district_name},{" "}
                {order.transportInfo.ward.to_ward_name}.
              </p>
            </div>
          </div>
          <p className="my-2 text-lg font-semibold">T???ng ph??</p>
          <div className="font-semibold">
            <div className="flex justify-between gap-2">
              T???ng ti???n h??ng:{" "}
              <p className="font-normal">
                {fomatNumberMoney(handleCheckout(order.products).totalPrice)}
              </p>
            </div>
            <div className="flex justify-between gap-2">
              Ph?? v???n chuy???n:
              <p className="font-normal">{fomatNumberMoney(order.fee)}</p>
            </div>
            <div className="border-t-2 border-black"></div>
            <div className="flex justify-between gap-2">
              T???ng ti???n: <p className="font-normal">1.000</p>
            </div>
          </div>
        </div>
      </div>
      <Button className="px-2 py-1 rounded-lg bg-[#4d7a94] text-white max-w-max">
        ???? nh???n ???????c h??ng
      </Button>
    </div>
  );
};

export default OrderItem;
