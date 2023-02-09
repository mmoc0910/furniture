import { uuidv4 } from "@firebase/util";
import axios from "axios";
import {
  collection,
  doc,
  getCountFromServer,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAfter,
  updateDoc,
} from "firebase/firestore";
import React from "react";
import Button from "../../clientComponents/components/forms/Button";
import SelectColorItem from "../../clientComponents/components/products/shop/SelectColorItem";
import { db } from "../../firebase/firebase-config";
import {
  dateFormat,
  fomatNumberMoney,
  handleCheckout,
} from "../../helpers/function";
import { infoShip } from "../../helpers/shipping";
import Box from "../components/Box";
import Heading from "../components/Heading";
import swal from "sweetalert";
import dayjs from "dayjs";
import { orderStatus } from "../../helpers/orderInfo";

const OrdersPage = () => {
  const [orders, setOrders] = React.useState([]);
  const [totalOrders, setTotalOrders] = React.useState(0);
  const [order, setOrder] = React.useState();
  const [lastDoc, setLastDoc] = React.useState();
  const [isEmpty, setIsEmpty] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [orderInfo, setOrderInfo] = React.useState([]);
  const [tokenPrintOrder, setTokenPrintOrder] = React.useState("");
  React.useEffect(() => {
    const getTotalProducst = async () => {
      const coll = collection(db, "orders");
      const query_ = query(coll);
      const snapshot = await getCountFromServer(query_);
      setTotalOrders(snapshot.data().count);
    };
    getTotalProducst();
  });
  React.useEffect(() => {
    const colRef = collection(db, "orders");
    const q = query(colRef, orderBy("createdAt", "desc"), limit(6));
    onSnapshot(q, (snapshot) => {
      updateState(snapshot);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const updateState = (snapshot) => {
    if (snapshot.size > 0) {
      setLastDoc(snapshot.docs[snapshot.size - 1]);
      let data = [];
      snapshot.docs.forEach((doc, index) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      setOrders((orders) => [...orders, ...data]);
      setLoading(false);
    } else {
      setIsEmpty(true);
    }
  };
  const fetchMore = () => {
    setLoading(true);
    const colRef = collection(db, "orders");
    const q = query(
      colRef,
      orderBy("createdAt", "desc"),
      startAfter(lastDoc),
      limit(6)
    );
    onSnapshot(q, (snapshot) => {
      updateState(snapshot);
    });
  };
  React.useEffect(() => {
    if (!order) {
      setOrder(orders[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orders]);
  React.useEffect(() => {
    if (order?.order_code) {
      const getOrderInfo = async () => {
        const orderInfo = await axios({
          method: "post",
          url: "https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/detail",
          headers: {
            "Content-Type": "application/json",
            Token: infoShip.token,
          },
          data: { order_code: order.order_code },
        });
        // console.log(orderInfo.data.data);
        setOrderInfo(orderInfo.data.data);
      };
      getOrderInfo();
    } else {
      setOrderInfo({});
    }
  }, [order]);
  return (
    <>
      <div>
        <Heading heading={"Danh sách Đơn hàng"}></Heading>
        <div className="h-[75vh]">
          <div className="grid w-full h-full grid-cols-10 gap-7">
            <Box
              className={
                "col-span-5 h-full overflow-y-scroll overflow-x-hidden scroll-hidden"
              }
            >
              <div className="mb-5">
                <p className="pl-2 font-semibold">
                  Hiện thị {orders.length}/{totalOrders} đơn hàng
                </p>
              </div>
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="px-2 pb-3 text-left">Khách hàng</th>
                    <th className="px-2 pb-3">Sl</th>
                    <th className="px-2 pb-3">Giá trị</th>
                    <th className="px-2 pb-3">Đặt lúc</th>
                    <th className="px-2 pb-3">Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((orderItem) => (
                    <tr
                      key={uuidv4()}
                      onClick={() => setOrder(orderItem)}
                      className="cursor-pointer group"
                    >
                      <td
                        className={`px-2 py-2 text-center align-middle rounded-tl-lg rounded-bl-lg group-hover:bg-[#e2edf2] transition-all duration-150 ${
                          orderItem.id === order?.id && "bg-[#e2edf2]"
                        }`}
                      >
                        <div className="flex items-center gap-5">
                          <img
                            src={orderItem.products[0].productInfo.images[0]}
                            alt=""
                            className="inline-block w-12 h-12 rounded-lg shrink-0 grow-0"
                          />
                          <p className="">{orderItem.transportInfo.to_name}</p>
                        </div>
                      </td>
                      <td
                        className={`px-2 py-2 text-center align-middle group-hover:bg-[#e2edf2] transition-all duration-150 ${
                          orderItem.id === order?.id && "bg-[#e2edf2]"
                        }`}
                      >
                        {handleCheckout(orderItem.products).totalproduct}
                      </td>
                      <td
                        className={`px-2 py-2 text-center align-middle group-hover:bg-[#e2edf2] transition-all duration-150 ${
                          orderItem.id === order?.id && "bg-[#e2edf2]"
                        }`}
                      >
                        {fomatNumberMoney(
                          handleCheckout(orderItem.products).totalPrice
                        )}
                      </td>
                      <td
                        className={`px-2 py-2 text-center align-middle group-hover:bg-[#e2edf2] transition-all duration-150} ${
                          orderItem.id === order?.id && "bg-[#e2edf2]"
                        }`}
                      >
                        {dateFormat(orderItem.createdAt)}
                      </td>
                      <td
                        className={`px-2 py-2 text-center align-middle group-hover:bg-[#e2edf2] rounded-tr-lg rounded-br-lg transition-all duration-150} ${
                          orderItem.id === order?.id && "bg-[#e2edf2]"
                        }`}
                      >
                        {orderItem.status === 0 &&
                        !orderItem.cancellationReason.buyer &&
                        !orderItem.cancellationReason.seller ? (
                          <p className="text-[#75b8ed] font-semibold">
                            Xác nhận
                          </p>
                        ) : orderItem.status === 0 &&
                          (orderItem.cancellationReason.buyer ||
                            orderItem.cancellationReason.seller) ? (
                          <p className="text-[#ed7976] font-semibold">
                            Đơn hủy
                          </p>
                        ) : orderItem.status === 1 ? (
                          <p className="text-[#75b8ed] font-semibold">
                            Đang giao
                          </p>
                        ) : (
                          <p className="text-[#75b8ed] font-semibold">
                            Thành công
                          </p>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-center py-5">
                {loading && !isEmpty && (
                  <div className="border-2 border-black rounded-full border-r-transparent w-7 h-7 animate-spin"></div>
                )}
                {!isEmpty && !loading && (
                  <p
                    className="px-3 py-1 bg-[#4c7993] font-semibold text-white rounded-lg cursor-pointer select-none"
                    onClick={() => fetchMore()}
                  >
                    Xem thêm
                  </p>
                )}
                {isEmpty && (
                  <p className="font-semibold">
                    Không còn đơn hàng nào khác...
                  </p>
                )}
              </div>
            </Box>
            <Box className="h-full col-span-5 overflow-x-hidden overflow-y-scroll space-y-7 scroll-hidden">
              <div className="">
                {order?.status === 0 &&
                  (order?.cancellationReason?.buyer ||
                    order?.cancellationReason?.seller) && (
                    <p className="text-lg font-semibold text-[#ed7976] mb-3">
                      {(order?.cancellationReason?.buyer &&
                        `Lý do hủy bên người mua: ${order?.cancellationReason?.buyer}`) ||
                        (order?.cancellationReason?.seller &&
                          `Lý do hủy bên người bán: ${order?.cancellationReason?.seller}`)}
                    </p>
                  )}
                {!order?.cancellationReason?.seller &&
                  !order?.cancellationReason?.buyer &&
                  order?.status === 1 && (
                    <div className="mb-5 text-lg font-semibold text-[#4d7a94]">
                      {orderStatus[orderInfo?.status]}
                    </div>
                  )}
                {!order?.cancellationReason?.seller &&
                  !order?.cancellationReason?.buyer &&
                  order?.status === 1 &&
                  orderInfo?.status !== "cancel" && (
                    <div className="mb-5 font-semibold">
                      Thời gian giao hàng dự kiến vào:{" "}
                      {dayjs(order?.expected_delivery_time).format(
                        "DD/MM/YYYY"
                      )}
                    </div>
                  )}
                {order?.status === 2 && (
                  <div className="mb-5 text-lg font-semibold text-[#4d7a94]">
                    Giao hàng thành ccông...
                  </div>
                )}
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-lg font-bold">Sản phẩm</h3>
                  {order?.status === 0 &&
                    !order?.cancellationReason?.seller &&
                    !order.cancellationReason?.buyer && (
                      <div className="flex items-center gap-5">
                        <Button
                          className="rounded-lg px-3 py-1 bg-[#4d7a94] text-white"
                          onClick={async () => {
                            let items = [];
                            order.products.map((item) =>
                              items.push({
                                name: item.productInfo.productName,
                                quantity: item.qty,
                                price: Number(
                                  item.productInfo.discountPrice
                                    ? item.productInfo.discountPrice
                                    : item.productInfo.price
                                ),
                                weight: Number(
                                  item.productInfo.transpostInfo.weight
                                ),
                              })
                            );
                            try {
                              const createOrder = await axios({
                                method: "post",
                                url: "https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/create",
                                headers: {
                                  "Content-Type": "application/json",
                                  ShopId: infoShip.shop_id,
                                  Token: infoShip.token,
                                },
                                data: {
                                  payment_type_id: 2,
                                  required_note: "CHOXEMHANGKHONGTHU",
                                  service_type_id: 2,
                                  service_id: 0,
                                  to_name: order.transportInfo.to_name,
                                  to_phone: order.transportInfo.to_phone,
                                  to_address: order.transportInfo.to_address,
                                  to_ward_name:
                                    order.transportInfo.ward.to_ward_name,
                                  to_district_name:
                                    order.transportInfo.district
                                      .to_district_name,
                                  to_province_name:
                                    order.transportInfo.province
                                      .to_province_name,
                                  cod_amount: Number(
                                    handleCheckout(order.products).totalPrice
                                  ),
                                  weight: Number(
                                    handleCheckout(order.products).totalWeight
                                  ),
                                  length: Number(
                                    handleCheckout(order.products).totalLong
                                  ),
                                  width: Number(
                                    handleCheckout(order.products).totalWidth
                                  ),
                                  height: Number(
                                    handleCheckout(order.products).totalHeight
                                  ),
                                  items,
                                },
                              });
                              const docRef = doc(db, "orders", order.id);
                              await updateDoc(docRef, {
                                status: 1,
                                order_code: createOrder.data.data.order_code,
                              });
                              setOrder((prev) => ({
                                ...prev,
                                status: 1,
                                order_code: createOrder.data.data.order_code,
                              }));
                            } catch (err) {
                              swal(
                                "Lỗi vận chuyển",
                                `${err.response.data.code_message_value}`
                              );
                            }
                          }}
                        >
                          Xác nhân đơn
                        </Button>
                        <Button
                          className="rounded-lg px-3 py-1 bg-[#ed7976] text-white"
                          onClick={async () => {
                            try {
                              const cancellationReason = await swal(
                                "Lý do không nhận đơn",
                                {
                                  content: "input",
                                }
                              );
                              const docRef = doc(db, "orders", order.id);
                              await updateDoc(docRef, {
                                "cancellationReason.seller": cancellationReason,
                              });
                              setOrder((prev) => ({
                                ...prev,
                                cancellationReason: {
                                  ...prev.cancellationReason,
                                  seller: cancellationReason,
                                },
                              }));
                            } catch (err) {
                              console.log(err);
                            }
                          }}
                        >
                          Không nhận đơn
                        </Button>
                      </div>
                    )}
                  {order?.status === 1 && (
                    <div className="flex items-center gap-3">
                      <Button
                        className="rounded-lg px-3 py-1 bg-[#ed7976] text-white"
                        onClick={async () => {
                          try {
                            const printOrder = await axios({
                              method: "post",
                              url: "https://dev-online-gateway.ghn.vn/shiip/public-api/v2/a5/gen-token",
                              headers: {
                                "Content-Type": " application/json",
                                Token: infoShip.token,
                              },
                              data: {
                                order_codes: [order.order_code],
                              },
                            });
                            setTokenPrintOrder(printOrder.data.data.token);
                            const docRef = doc(db, "orders", order.id);
                            await updateDoc(docRef, {
                              is_print_bill: true,
                            });
                          } catch (err) {
                            console.log(err);
                          }
                        }}
                      >
                        In vận đơn
                      </Button>
                    </div>
                  )}
                </div>
                <div className="space-y-3">
                  {order?.products.map((product) => (
                    <div className="flex items-center gap-5" key={uuidv4()}>
                      <img
                        src={product.productInfo.images[0]}
                        alt={product.productInfo.productName}
                        className="w-20 h-24 rounded-lg shrink-0 grow-0"
                      />

                      <div className="flex flex-col items-start justify-center text-[#777675]">
                        <p
                          className="font-bold text-black line-clamp-1"
                          title={product.productInfo.productName}
                        >
                          {product.productInfo.productName}
                        </p>
                        <div className="flex items-center gap ">
                          <p>Phân loại hàng:</p>
                          <div className="flex items-center gap-2 ml-2">
                            {product.properties.color && (
                              <SelectColorItem
                                disabled={true}
                                size="0.75rem"
                                colorName={product.properties.color?.colorName}
                                color={product.properties.color?.colorValue}
                              ></SelectColorItem>
                            )}

                            <p>{product.properties.color?.colorName}</p>
                          </div>
                          {Object.keys(product.properties).map(
                            (prop) =>
                              prop !== "color" && <p key={uuidv4()}>, {prop}</p>
                          )}
                        </div>
                        <p>
                          {product.productInfo.discountPrice
                            ? fomatNumberMoney(
                                product.productInfo.discountPrice
                              )
                            : fomatNumberMoney(product.productInfo.price)}{" "}
                          x {product.qty} ={" "}
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
                  ))}
                </div>
              </div>
              <div className="">
                <h3 className="mb-5 text-lg font-bold">Tổng thanh toán</h3>
                <div className="w-[40%] space-y-3">
                  <div className="flex items-center justify-between font-semibold">
                    <p className="">Tổng sp:</p>
                    <p>
                      {fomatNumberMoney(
                        handleCheckout(order?.products)?.totalPrice
                      )}
                    </p>
                  </div>
                  <div className="flex items-center justify-between font-semibold">
                    <p className="">Phí vận chuyển:</p>
                    <p>{order?.fee && fomatNumberMoney(order.fee)}</p>
                  </div>
                  <div className="border-b-2 border-black border-dashed"></div>
                  <div className="flex items-center justify-between font-semibold">
                    <p className="">Tổng:</p>
                    <p>
                      {fomatNumberMoney(
                        handleCheckout(order?.products)?.totalPrice + order?.fee
                      )}
                    </p>
                  </div>
                </div>
              </div>
              <div className="">
                <h3 className="mb-5 text-lg font-bold">Thông tin khách hàng</h3>
                <div className="space-y-3 font-semibold">
                  <div className="flex items-center gap-3">
                    <p>Tên khách hàng:</p>
                    <p>{order?.transportInfo.to_name}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <p>Số điện thoại:</p>
                    <p>{order?.transportInfo.to_phone}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <p>Địa chỉ:</p>
                    <p>
                      {order?.transportInfo.to_address},{" "}
                      {order?.transportInfo.ward.to_ward_name},{" "}
                      {order?.transportInfo.district.to_district_name},{" "}
                      {order?.transportInfo.province.to_province_name}
                    </p>
                  </div>
                </div>
              </div>
              {order?.transportInfo.note_for_shop && (
                <div className="">
                  <h3 className="mb-5 text-lg font-bold">
                    {order?.transportInfo.note_for_shop}
                  </h3>
                </div>
              )}
              {/* {!order?.cancellationReason?.seller && (
                <div className="">
                  <h3 className="mb-5 text-lg font-bold">
                    Thông tin vận chuyển
                  </h3>
                </div>
              )} */}
            </Box>
          </div>
        </div>
      </div>

      {tokenPrintOrder !== "" && (
        <iframe
          src={`https://dev-online-gateway.ghn.vn/a5/public-api/printA5?token=${tokenPrintOrder}`}
          title="print order"
          className="hidden"
        ></iframe>
      )}
    </>
  );
};

export default OrdersPage;
