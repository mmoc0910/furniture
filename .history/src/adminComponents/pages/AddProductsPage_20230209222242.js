import React from "react";
import { Button } from "../components/forms";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addProduct, resetProduct } from "../sagas/products/productSlice";
import ProductBox from "../components/products/ProductBox";
import Heading from "../components/Heading";
import { useNavigate } from "react-router-dom";
import { setPriviewImages } from "../sagas/priviewImages/priviewImagesSlice";
import Loading from "../components/loading/Loading";

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
  })
  .required();

const AddProductsPage = () => {
  const navigate = useNavigate();
  const { priviewImages } = useSelector((state) => state.priviewIamges);
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  const { product } = useSelector((state) => state.product);
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
  const handleAddProduct = async () => {
    if (priviewImages.length > 0) {
      try {
        await yupObject.validate(product, { abortEarly: false });
        setLoading(true);
        const images = await uploadImages();
        dispatch(addProduct({ ...product, images }));
        setLoading(false);
        dispatch(setPriviewImages([]));
        dispatch(resetProduct());
        navigate("/admin/products");
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
    } else {
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
    }
  };

  return (
    <>
      <div className="">
        <Heading heading={"Thêm sản phẩm mới."}>
          <Button
            className="px-5 py-2 rounded-lg bg-[#3c897b] text-white"
            onClick={() => handleAddProduct()}
          >
            Thêm sản phẩm
          </Button>
        </Heading>
        <ProductBox></ProductBox>
      </div>
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
      {loading && <Loading></Loading>}
    </>
  );
};

export default AddProductsPage;
