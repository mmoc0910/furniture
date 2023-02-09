import dayjs from "dayjs";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React from "react";
import { db } from "../../../firebase/firebase-config";
import { fomatNumberMoney } from "../../../helpers/function";

const Discounts = () => {
  const [discounts, setDiscounts] = React.useState([]);
  const [listDiscounts, setListDiscounts] = React.useState([]);
  React.useEffect(() => {
    const colRef = collection(db, "discounts");
    const q = query(
      colRef,
      //   where("timeEnd", "<", dayjs().unix()),
      //   orderBy("timeEnd"),
      orderBy("createdAt", "desc"),
      where("status", "==", 1)
    );
    onSnapshot(q, (snapshot) => {
      let data = [];
      snapshot.docs.forEach((doc, index) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      setDiscounts(data);
    });
  }, []);
  React.useEffect(() => {
    if (discounts.length > 0) {
      const discountscp = [];
      [...discounts].forEach(async (discount) => {
        const docRef = doc(db, "products", discount.productId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          discountscp.push({ ...discount, product: docSnap.data() });
          console.log(discountscp);
          setListDiscounts(discountscp);
        }
      });
    }
  }, [discounts]);
  return (
    <>
      <h3 className="text-xl font-bold mb-7">
        Danh sách Chương trình giảm giá
      </h3>
      <div className="flex flex-col gap-3 text-lg font-medium">
        {listDiscounts &&
          listDiscounts.length > 0 &&
          listDiscounts.map((discount) => (
            <div
              className="grid grid-cols-10 gap-5 bg-[#e2edf2] px-3 py-3 rounded-lg"
              key={discount.id}
            >
              <div className="flex flex-col col-span-4 gap-3">
                <div className="flex flex-col gap-1">
                  <p className="font-semibold">Tên chương trình: </p>
                  <p>{discount.discountName}</p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-semibold">Thời gian: </p>
                  <p>
                    Bắt đầu:
                    {dayjs(discount.timeStart * 1000).format(
                      "hh:mm DD-MM-YYYY"
                    )}
                  </p>
                  <p>
                    Kết thúc:
                    {dayjs(discount.timeEnd * 1000).format("hh:mm DD-MM-YYYY")}
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-semibold">Trạng thái: </p>
                  {dayjs().unix() < discount.timeStart
                    ? "Chưa bắt đầu"
                    : dayjs().unix() > discount.timeStart &&
                      dayjs().unix() < discount.timeEnd
                    ? "Đang diễn ra"
                    : "Đã kết thúc"}
                </div>
              </div>
              <div className="col-span-6">
                <p className="mb-5 font-semibold">Sản phẩm áp dụng:</p>
                <div className="flex gap-5">
                  <img
                    src={discount.product.images[0]}
                    alt={discount.product.productName}
                    className="w-24 rounded-lg h-28 grow-0 shrink-0"
                  />
                  <div className="flex flex-col justify-center gap-2">
                    <p className="line-clamp-2">
                      {discount.product.productName}
                    </p>
                    <div className="flex items-end gap-2">
                      <p className="text-base line-through decoration-black">
                        {fomatNumberMoney(discount.product.price)}
                      </p>
                      <p> {fomatNumberMoney(discount.discountPrice)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Discounts;
