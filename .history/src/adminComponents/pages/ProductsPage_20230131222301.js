import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Filter from "../components/filter-product/Filter";
import { Button } from "../components/forms";
import ProductItem from "../components/list-products/ProductItem";
import {
  getProducts,
  resetProduct,
  setModalEdit,
  setProducts,
  updateProduct,
} from "../sagas/products/productSlice";
import { v4 as uuidv4 } from "uuid";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductBox from "../components/products/ProductBox";
import Heading from "../components/Heading";
import { setPriviewImages } from "../sagas/priviewImages/priviewImagesSlice";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { dateFormat } from "../../helpers/function";
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
import { db } from "../../firebase/firebase-config";

const url = "https://api.cloudinary.com/v1_1/ds32vmzcc/image/upload";
const yupObject = yup
  .object({
    productName: yup
      .string()
      .min(10, "Tên sản phẩm tối thiểu 10 kỹ tự")
      .required("Tên sản phẩm không được để trống"),
    price: yup.number().required("Giá sản phẩm không được để trống"),
    productDesc: yup
      .string()
      .min(20, "Mô tả sản phẩm tối thiểu 20 ký tự")
      .required("Mô tả sản phẩm không được để trống"),
    categoryName: yup.string().required("Bạn chưa chọn danh mục sản phẩm"),
    detailedOverview: yup
      .string()
      .required("Mô tả chi tiết của sản phẩm không được để trống"),
    transpostInfo: yup.object({
      weight: yup
        .string()
        .required("Chiều rộng sản phẩm sau đóng gói không được để trống"),
      height: yup
        .string()
        .required("Chiều dài sản phẩm sau đóng gói không được để trống"),
      longs: yup
        .string()
        .required("Chiều cao sản phẩm sau đóng gói không được để trống"),
    }),
    amount: yup.number().required("Số lượng không được để trống"),
  })
  .required();
const ProductsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products, product, modalEdit, filter } = useSelector(
    (state) => state.product
  );
  const [totalProducts, setTotalProducts] = React.useState(0);
  const [lastDoc, setLastDoc] = React.useState();
  const [isEmpty, setIsEmpty] = React.useState(false);
  const [loadingMore, setLoadingMore] = React.useState(false);
  React.useEffect(() => {
    const getTotalProducst = async () => {
      const coll = collection(db, "products");
      const query_ = query(coll);
      const snapshot = await getCountFromServer(query_);
      setTotalProducts(snapshot.data().count);
    };
    getTotalProducst();
  }, []);
  React.useEffect(() => {
    const colRef = collection(db, "products");
    const q = query(
      colRef,
      orderBy("createdAt", "asc"),
      where("isDeleted", "==", false),
      limit(5)
    );
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
      dispatch(setProducts([...products, ...data]));
      setLoadingMore(false);
    } else {
      setIsEmpty(true);
    }
  };
  const fetchMore = () => {
    setLoadingMore(true);
    const colRef = collection(db, "products");
    const q = query(
      colRef,
      orderBy("createdAt", "asc"),
      where("isDeleted", "==", false),
      startAfter(lastDoc),
      limit(5)
    );
    onSnapshot(q, (snapshot) => {
      updateState(snapshot);
    });
  };
  const { priviewImages } = useSelector((state) => state.priviewIamges);
  const [loading, setLoading] = React.useState(false);
  const uploadImages = async () => {
    const formData = new FormData();
    const files = document.querySelector(".upload-imgs").files;
    let images = [];
    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      formData.append("file", file);
      formData.append("upload_preset", "my_uploads");
      const data = await fetch(url, {
        method: "POST",
        body: formData,
      }).then((response) => response.json());
      images.push(data.secure_url);
    }
    return images;
  };
  const handleEditProduct = async () => {
    if (priviewImages.length === 0 && product.images.length === 0) {
      toast.error("Bạn chưa chọn hình ảnh cho sản phẩm", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      try {
        await yupObject.validate(product, { abortEarly: false });
        setLoading(true);
        if (priviewImages.length > 0) {
          const images = await uploadImages();
          dispatch(
            updateProduct({
              ...product,
              images,
              updatedAt: dayjs().unix(),
            })
          );
        } else {
          dispatch(
            updateProduct({
              ...product,
              updatedAt: dayjs().unix(),
            })
          );
        }
        setLoading(false);
        dispatch(setModalEdit(false));
        dispatch(setPriviewImages([]));
        dispatch(resetProduct());
        dispatch(getProducts());
      } catch (err) {
        err?.inner[0]?.message &&
          toast.error(err.inner[0].message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
      }
    }
  };
  const handleDeleteProduct = () => {
    setLoading(true);
    dispatch(
      updateProduct({
        id: product.id,
        isDeleted: true,
        deletedAt: dayjs().unix(),
      })
    );
    dispatch(getProducts());
    setLoading(false);
    dispatch(resetProduct());
    dispatch(setModalEdit(false));
  };
  return (
    <>
      <div className="">
        <Heading heading="Danh sách sản phẩm.">
          <Button
            className="px-5 py-2 rounded-lg bg-[#4c7993] text-white"
            onClick={() => navigate("/admin/add-product")}
          >
            Thêm sản phẩm mới
          </Button>
        </Heading>
        <div className="bg-[#f0f6f9] px-3 py-5 rounded-lg">
          <div className="flex justify-between">
            <p className="ml-2 font-semibold">
              {" "}
              Hiển thị {products.length}/{totalProducts} sản phẩm
            </p>
            <Filter></Filter>
          </div>

          <div className="w-full">
            <div className="t-head">
              <div className="grid grid-cols-12 text-[#4d7a94] font-bold border-b">
                <div className="col-span-1">
                  <div className="flex items-center gap-2 px-2 py-2">
                    {/* <CheckBox></CheckBox> */}
                    <p className="text-[#4d7a94]">H/ảnh</p>
                  </div>
                </div>
                <div className="col-span-4 px-2 py-2 align-middle">
                  <p>Tên sản phẩm</p>
                </div>
                <div className="col-span-2 px-2 py-2 align-middle">
                  <p>Giá</p>
                </div>
                <div className="col-span-2 px-2 py-2 align-middle">
                  <p>Danh mục</p>
                </div>
                <div className="col-span-1 px-2 py-2 align-middle">
                  <p>SL</p>
                </div>
                <div className="col-span-1 px-2 py-2 align-middle">
                  <p>Ngày tạo</p>
                </div>
                <div className="col-span-1 px-2 py-2 text-center align-middle">
                  <p>T/thai</p>
                </div>
              </div>
            </div>
            <div className="w-full t-body">
              {products &&
                products.length > 0 &&
                products.map((item) => (
                  <ProductItem key={uuidv4()} data={item}></ProductItem>
                ))}
            </div>
          </div>
          <div className="flex justify-center py-6">
            {loadingMore && !isEmpty && (
              <div className="border-2 border-black rounded-full border-r-transparent w-7 h-7 animate-spin"></div>
            )}
            {!isEmpty && !loadingMore && (
              <p
                className="px-3 py-1 bg-[#4c7993] font-semibold text-white rounded-lg cursor-pointer select-none"
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
      {modalEdit && (
        <div className="fixed inset-0 bg-[#16191b32] z-10 flex items-center justify-center">
          <div
            className="absolute inset-0 z-20 bg-transparent"
            onClick={() => {
              dispatch(setModalEdit(false));
              dispatch(resetProduct());
              dispatch(setPriviewImages([]));
            }}
          ></div>
          <div className="bg-white rounded-lg p-10 max-w-[90%] max-h-[90%] overflow-y-auto z-30 scroll-hidden">
            <Heading
              heading={"Thông tin sản phẩm"}
              desc={`Cập nhật gần nhất ${dateFormat(product.updatedAt)}`}
            >
              <div className="flex gap-4 item-center">
                <Button
                  className="px-5 py-2 rounded-lg bg-[#4c7993] text-white"
                  onClick={() => handleEditProduct()}
                >
                  Sửa sản phẩm
                </Button>
                <Button
                  className="px-5 py-2 rounded-lg bg-[#ed7976] text-white"
                  onClick={() => handleDeleteProduct()}
                >
                  Xóa sản phẩm
                </Button>
              </div>
            </Heading>
            <ProductBox></ProductBox>
          </div>
        </div>
      )}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#16191b80]">
          <div className="border-white rounded-full border-[3px] w-8 h-8 border-b-transparent animate-spin"></div>
        </div>
      )}
    </>
  );
};

const CheckBox = () => {
  return (
    <div className="shrink-0">
      <input type="checkbox" className="hidden peer" id="checkbox1" />
      <label
        htmlFor="checkbox1"
        className="relative block w-5 h-5 border-2 border-[#4d7a94] rounded-md peer-checked:bg-[#4d7a94] peer-checked:text-white text-[#f0f6f9]"
      >
        <span className="absolute z-10 -translate-x-1/2 -translate-y-1/2 top-1/2 bg-blacktop-1/2 left-1/2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2.5"
            stroke="currentColor"
            className="w-[15px] h-[15px]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </span>
      </label>
    </div>
  );
};

export default ProductsPage;
