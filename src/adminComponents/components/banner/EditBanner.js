import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { dateFormat } from "../../../helpers/function";
import {
  getBanners,
  resetBanner,
  setShowEditBanner,
  updateBanner,
} from "../../sagas/banner/bannerSlice";
import { Button } from "../forms";
import Heading from "../Heading";
import Loading from "../loading/Loading";
import BannerInfo from "./BannerInfo";
import * as yup from "yup";
import "react-toastify/dist/ReactToastify.css";
import dayjs from "dayjs";

const url = "https://api.cloudinary.com/v1_1/ds32vmzcc/image/upload";
const yupObject = yup
  .object({
    bannerName: yup
      .string()
      .min(7, "Tiêu đề banner quá ngắn")
      .required("Tiêu đề banner không được để trống"),
    bannerDesc: yup
      .string()
      .min(7, "Mô tả banner quá ngắn")
      .required("Mô tả banner không được để trống"),
    bannerImage: yup.string().required("Hình ảnh banner không được để trống"),
    bannerUrl: yup.string().required("Đường dẫn banner không được để trống"),
  })
  .required();
const EditBanner = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  const { banner } = useSelector((state) => state.banner);
  const uploadImages = async () => {
    const formData = new FormData();
    const file = document.querySelector(".uploadImage").files[0];
    if (file) {
      formData.append("file", file);
      formData.append("upload_preset", "my_uploads");
      const data = await fetch(url, {
        method: "POST",
        body: formData,
      }).then((response) => response.json());
      return data.secure_url;
    } else {
      return banner.bannerImage;
    }
  };
  const handleAddBanner = async () => {
    try {
      await yupObject.validate(banner, { abortEarly: false });
      setLoading(true);
      const bannerImage = await uploadImages();
      dispatch(
        updateBanner({ ...banner, bannerImage, updatedAt: dayjs().unix() })
      );
      dispatch(resetBanner());
      dispatch(getBanners());
      setLoading(false);
      dispatch(setShowEditBanner(false));
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
  };
  return (
    <>
      <div className="fixed inset-0 bg-[#16191b47] flex items-center justify-center z-[12]">
        <div
          className="absolute inset-0 z-20 bg-transparent cursor-not-allowed"
          onClick={() => {
            dispatch(setShowEditBanner(false));
            dispatch(resetBanner());
          }}
        ></div>
        <div
          className="p-10 bg-white rounded-lg max-w-[85%] max-h-[90%] w-full h-full relative z-30 overflow-y-auto scroll-hidden
          "
        >
          <Heading
            heading={"Chỉnh sửa banner"}
            desc={
              banner.updatedAt &&
              `Cập nhật gần nhất ${dateFormat(banner.updatedAt)}`
            }
          >
            <Button
              className="px-5 py-2 rounded-lg bg-[#4c7993] text-white"
              onClick={() => handleAddBanner()}
            >
              Chỉnh sửa
            </Button>
          </Heading>
          <BannerInfo></BannerInfo>
        </div>
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

export default EditBanner;
