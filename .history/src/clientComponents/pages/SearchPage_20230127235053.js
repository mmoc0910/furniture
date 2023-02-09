import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase/firebase-config";

const SearchPage = () => {
  const { slug } = useParams();
  const [products, setProducts] = React.useState([]);
  console.log(products);
  React.useEffect(() => {
    const colRef = collection(db, "products");
    const q = query(
      colRef,
      where("isDeleted", "==", false),
      where("visibility", "==", true),
      where("productName", ">=", slug)
      // limit(8)
    );
    onSnapshot(q, (snapshot) => {
      let data = [];
      snapshot.docs.forEach((doc, index) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      setProducts(data);
    });
  }, []);
  return (
    <div className="container pt-10 pb-20">
      <p className="font-semibold pb-8">
        Kết quả tìm kiếm của: <span className="font-bold text-lg">{slug}</span>
      </p>
      <div className="grid grid-cols-4 gap-10"></div>
    </div>
  );
};

export default SearchPage;
