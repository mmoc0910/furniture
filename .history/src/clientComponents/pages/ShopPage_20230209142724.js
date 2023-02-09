import React from "react";
import Breadcrumb from "../components/Breadcrumb";
import { DropdownOption } from "../components/dropdown";
import Dropdown from "../components/dropdown/Dropdown";
import ProductItem from "../components/products/ProductItem";
import { CiSearch } from "react-icons/ci";
import FillerBar from "../components/products/shop/FillerBar";
import {
  collection,
  getCountFromServer,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { setFilter } from "../../adminComponents/sagas/products/productSlice";
import { db } from "../../firebase/firebase-config";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

const filletPrice = [
  { title: "Từ bé đến lớn", value: "desc" },
  { title: "Từ lớn đến bé", value: "asc" },
];

const ShopPage = () => {
  const dispatch = useDispatch();
  const { filter } = useSelector((state) => state.product);
  const [totalProducts, setTotalProducts] = React.useState(0);
  const [listProducts, setListProducts] = React.useState([]);
  const [lastDoc, setLastDoc] = React.useState();
  const [isEmpty, setIsEmpty] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const handleSetSortBy = (newValue) => {
    dispatch(setFilter({ name: "sortBy", value: newValue }));
  };
  React.useEffect(() => {
    const getTotalProducst = async () => {
      const coll = collection(db, "products");
      const query_ = query(
        coll,
        where("isDeleted", "==", false),
        where("visibility", "==", true)
      );
      const snapshot = await getCountFromServer(query_);
      setTotalProducts(snapshot.data().count);
    };
    getTotalProducst();
  }, []);
  React.useEffect(() => {
    const colRef = collection(db, "products");
    const q = query(
      colRef,
      orderBy("createdAt", "desc"),
      where("isDeleted", "==", false),
      where("visibility", "==", true),
      limit(5)
    );
    onSnapshot(q, (snapshot) => {
      if (snapshot.size > 0) {
        setLastDoc(snapshot.docs[snapshot.size - 1]);
        let data = [];
        snapshot.docs.forEach((doc, index) => {
          data.push({ id: doc.id, ...doc.data() });
        });
        setListProducts(data);
        setLoading(false);
      } else {
        setIsEmpty(true);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  React.useEffect(() => {
    const colRef = collection(db, "products");
    const q = query(
      colRef,
      orderBy("createdAt", "desc"),
      where("isDeleted", "==", false),
      where("visibility", "==", true),
      limit(5)
    );
    onSnapshot(q, (snapshot) => {
      if (snapshot.size > 0) {
        setLastDoc(snapshot.docs[snapshot.size - 1]);
        let data = [];
        snapshot.docs.forEach((doc, index) => {
          data.push({ id: doc.id, ...doc.data() });
        });
        setListProducts(data);
        setLoading(false);
      } else {
        setIsEmpty(true);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const updateState = (snapshot) => {
    if (snapshot.size > 0) {
      setLastDoc(snapshot.docs[snapshot.size - 1]);
      let data = [];
      snapshot.docs.forEach((doc, index) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      setListProducts((products) => [...products, ...data]);
      setLoading(false);
    } else {
      setIsEmpty(true);
    }
  };

  const fetchMore = () => {
    setLoading(true);
    const colRef = collection(db, "products");
    const q = query(
      colRef,
      orderBy("createdAt", "desc"),
      where("isDeleted", "==", false),
      where("visibility", "==", true),
      limit(5),
      startAfter(lastDoc)
    );
    onSnapshot(q, (snapshot) => {
      updateState(snapshot);
    });
  };
  return (
    <>
      <Breadcrumb>
        <p className="text-[#b7b7b7]">Shop</p>
      </Breadcrumb>
      <div className="container grid gap-10 py-24 sm:grid-cols-1 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <form className="relative w-full">
            <input
              placeholder="Tìm kiếm..."
              className="w-full px-5 py-2 pr-10 border border-black border-solid rounded-md outline-none"
              onChange={(e) => {
                dispatch(setFilter({ name: "search", value: e.target.value }));
              }}
            ></input>
            <span className="absolute -translate-y-1/2 cursor-pointer top-1/2 right-3">
              <CiSearch size={"1.5rem"}></CiSearch>
            </span>
          </form>
          <FillerBar></FillerBar>
        </div>
        <div className="lg:col-span-3">
          <div className="flex flex-col items-start mb-12 gap-y-5 md:items-center md:justify-between md:flex-row">
            <p>
              Hiển thị {listProducts.length}/{totalProducts} sản phẩm
            </p>
            <div className="flex items-center gap-2">
              <p>Sắp xếp theo giá: </p>
              <Dropdown
                placeHolder={
                  filter.sortBy === "desc"
                    ? "Từ bé đến lớn"
                    : filter.sortBy === "asc"
                    ? "Từ lớn đến bé"
                    : "Sắp xếp từ"
                }
                onClick={handleSetSortBy}
              >
                <div className="absolute left-0 z-10 mt-1 bg-[#efefef] bottom-0-0 rounded-md min-w-[150px] w-full px-4 py-3 space-y-3">
                  {filletPrice &&
                    filletPrice.map((item) => (
                      <DropdownOption
                        value={item.value}
                        key={item.title}
                        className={`${
                          filter.sortBy === item.value ? "font-bold" : ""
                        }`}
                      >
                        {item.title}
                      </DropdownOption>
                    ))}
                </div>
              </Dropdown>
            </div>
          </div>
          <div className="grid-cols-1 grid md:grid-cols-3 gap-[30px]">
            {listProducts.length > 0 &&
              listProducts.map((product) => (
                <ProductItem
                  product={product}
                  key={uuidv4()}
                  baseURL={"../"}
                ></ProductItem>
              ))}
          </div>
          <div className="flex justify-center col-start-1 col-end-1 pt-14">
            {loading && !isEmpty && (
              <div className="border-2 border-black rounded-full border-r-transparent w-7 h-7 animate-spin"></div>
            )}
            {!isEmpty && !loading && (
              <p
                className="px-3 py-1 border border-black rounded-lg cursor-pointer select-none"
                onClick={() => fetchMore()}
              >
                Xem thêm
              </p>
            )}
            {isEmpty && (
              <p className="font-semibold">Không còn sản phẩm nào khác...</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopPage;
