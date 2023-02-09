import { uuidv4 } from "@firebase/util";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import React from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase/firebase-config";
import ProductItem from "../components/products/ProductItem";

const SearchPage = () => {
  const { slug } = useParams();
  const [products, setProducts] = React.useState([]);
  React.useEffect(() => {
    const colRef = collection(db, "products");
    const q = query(
      colRef,
      where("isDeleted", "==", false),
      where("visibility", "==", true),
      where("productName", ">=", slug)
    );
    onSnapshot(q, (snapshot) => {
      let data = [];
      snapshot.docs.forEach((doc, index) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      setProducts(data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);
  return (
    <div className="container pt-10 pb-20">
      <p className="font-semibold pb-8">
        Kết quả tìm kiếm của: <span className="font-bold text-lg">{slug}</span>
      </p>
      {products.length === 0 && (
        <p>Không kết quả nào trùng khớp với tìm kiếm</p>
      )}
      <p></p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-7 gap-y-10">
        {products.length > 0 &&
          products.map((product) => (
            <ProductItem
              product={product}
              key={uuidv4()}
              baseURL={"../"}
            ></ProductItem>
          ))}
      </div>
    </div>
  );
};

export default SearchPage;
