import dayjs from "dayjs";
import React from "react";
import { BsArrowRight } from "react-icons/bs";
import {
  FaFacebookF,
  FaInstagram,
  FaPinterestP,
  FaTwitter,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import { dateFormat } from "../../../helpers/function";
import {
  getBanner,
  getBanners,
  setShowEditBanner,
  updateBanner,
} from "../../sagas/banner/bannerSlice";

const BannerItem = ({ data }) => {
  const dispatch = useDispatch();
  const { banners } = useSelector((state) => state.banner);
  const handleUpdateBanner = ({ ...data }) => {
    dispatch(updateBanner({ ...data }));
    dispatch(getBanners());
  };
  return (
    <>
      <div className="">
        <p className="font-semibold">Ngày tạo: {dateFormat(data.createdAt)}</p>
        <div className="w-full p-1 border-2 border-black border-dashed rounded-lg select-none">
          <div
            className="relative w-full h-[600px] rounded-lg overflow-hidden"
            style={{ background: data.bannerColorBg }}
          >
            <img
              src={data.bannerImage}
              alt=""
              className="object-cover w-full h-full"
            />
            <div className="absolute top-0 right-0 z-[11] flex flex-col gap-3 p-5">
              <span
                className="cursor-pointer"
                data-tip="Sửa"
                onClick={() => {
                  dispatch(setShowEditBanner(true));
                  banners.forEach((banner) => {
                    banner.id === data.id && dispatch(getBanner(banner));
                  });
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-7 h-7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
              </span>
              <span
                className="cursor-pointer"
                data-tip="Xóa"
                onClick={() =>
                  handleUpdateBanner({
                    id: data.id,
                    isDeleted: true,
                    deletedAt: dayjs().unix(),
                  })
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-7 h-7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </span>
              {data.isVisiabled ? (
                <span
                  className="cursor-pointer"
                  data-tip="Hiển thị"
                  onClick={() =>
                    handleUpdateBanner({ id: data.id, isVisiabled: false })
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-7 h-7"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                </span>
              ) : (
                <span
                  className="cursor-pointer"
                  data-tip="Ẩn"
                  onClick={() =>
                    handleUpdateBanner({ id: data.id, isVisiabled: true })
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-7 h-7"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </span>
              )}
            </div>
            <div className="absolute top-0 z-10 w-full h-full">
              <div className="container relative flex items-center justify-start h-full">
                <div className="slider-content flex flex-col items-start justify-center select-none max-w-[450px] w-full">
                  {/* <p
                className={`text-[#e53637] uppercase text-sm font-bold tracking-[2px] mb-5 silder-animation`}
              >
                Summer Collection
              </p> */}
                  <h2
                    className={`text-5xl font-bold mb-6  silder-animation line-clamp-2 capitalize`}
                  >
                    {data.bannerName}
                  </h2>
                  <p className="mb-7 line-clamp-2 silder-animation">
                    {data.bannerDesc}
                  </p>
                  <Link
                    to={(location) => ({
                      ...location,
                      pathname: data.bannerUrl,
                    })}
                    target="_blank"
                    rel="noopener noreferer"
                    className="bg-[#00000080] text-sm font-bold tracking-[4px] px-7 py-3 text-white flex items-center gap-x-3 uppercase  silder-animation"
                  >
                    Shop Now
                    <span>
                      <BsArrowRight size={"1.4rem"}></BsArrowRight>
                    </span>
                  </Link>
                </div>
                <div className="absolute left-[15px] flex items-center gap-x-10 bottom-7">
                  <Link className="cursor-pointer">
                    <FaFacebookF></FaFacebookF>
                  </Link>
                  <Link className="cursor-pointer">
                    <FaTwitter></FaTwitter>
                  </Link>
                  <Link className="cursor-pointer">
                    <FaPinterestP></FaPinterestP>
                  </Link>
                  <Link className="cursor-pointer">
                    <FaInstagram></FaInstagram>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ReactTooltip
        padding="7px 15px"
        delayShow={100}
        effect="solid"
        place="right"
      />
    </>
  );
};

export default BannerItem;
