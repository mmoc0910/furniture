import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React from "react";
import { useDispatch } from "react-redux";
import { setProducts } from "../../../../adminComponents/sagas/products/productSlice";
import { db } from "../../../../firebase/firebase-config";
import FillterItem from "./FillterItem";

const fillterList = [
  { name: "Sản phẩm bán chạy" },
  { name: "Sản phẩm mới" },
  // { name: "Hot Sales" },
];
const FillterBar = () => {
  const [state, setState] = React.useState(0);
  const dispatch = useDispatch();
  React.useEffect(() => {
    handlegetProducts(state);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);
  const handlegetProducts = async (opt = 0) => {
    const colRef = collection(db, "products");
    let q;
    if (opt === 0) {
      q = query(
        colRef,
        orderBy("sellNumber", "desc"),
        where("sellNumber", ">", 0),
        where("isDeleted", "==", false),
        where("visibility", "==", true),
        limit(8)
      );
    } else if (opt === 1) {
      q = query(
        colRef,
        orderBy("createdAt", "desc"),
        where("isDeleted", "==", false),
        where("visibility", "==", true),
        limit(8)
      );
    }
    onSnapshot(q, (snapshot) => {
      let data = [];
      snapshot.docs.forEach((doc, index) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      dispatch(setProducts(data));
    });
  };

  return (
    <div className="flex flex-wrap items-center justify-center mb-12 gap-y-5 gap-x-20">
      {fillterList &&
        fillterList.map((item, index) => (
          <FillterItem
            key={item.name}
            className={index === state ? "text-black" : "text-[#b7b7b7]"}
            onClick={() => {
              setState(index);
            }}
          >
            {item.name}
          </FillterItem>
        ))}
    </div>
  );
};

export default FillterBar;
