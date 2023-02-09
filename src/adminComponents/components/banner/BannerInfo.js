import { debounce } from "lodash";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setBanner } from "../../sagas/banner/bannerSlice";
import { Input } from "../forms";
import BannerColors from "./BannerColors";

const BannerInfo = () => {
  const dispatch = useDispatch();

  const { banner } = useSelector((state) => state.banner);

  const handleChange = debounce((e) => {
    dispatch(setBanner({ name: e.target.name, value: e.target.value }));
  }, 300);
  return (
    <div className="">
      <div className="flex max-w-[90%] mx-auto mb-3 items-center justify-between">
        <BannerColors></BannerColors>
        <div className="flex items-center gap-5">
          <div className="">
            <label
              htmlFor="uploadImg"
              className="px-4 py-2 rounded-lg bg-[#febeab] font-semibold cursor-pointer text-white"
            >
              Chọn hình ảnh
            </label>
            <Input
              type="file"
              name="bannerImage"
              id="uploadImg"
              className="hidden uploadImage"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                const reader = new FileReader();
                reader.addEventListener("load", () => {
                  dispatch(
                    setBanner({
                      name: e.target.name,
                      value: reader.result,
                    })
                  );
                });
                reader.readAsDataURL(file);
              }}
            ></Input>
          </div>
          <input
            autoComplete="off"
            className="w-[300px] border-2 font-semibold border-dashed border-black px-4 py-1 rounded-lg outline-none"
            type={"url"}
            placeholder="Đường dẫn"
            name="bannerUrl"
            defaultValue={banner.bannerUrl}
            onChange={(e) => handleChange(e)}
          ></input>
        </div>
      </div>

      <div className="rounded-lg max-w-[90%] mx-auto relative h-[550px] w-full overflow-hidden">
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            background: banner.bannerColorBg ? banner.bannerColorBg : "#d7d7d6",
          }}
        >
          {banner.bannerImage && (
            <img src={banner.bannerImage} alt="" className="w-full h-full" />
          )}
        </div>
        <div className="absolute max-w-[470px] flex flex-col top-1/2 left-10 -translate-y-1/2">
          <textarea
            className="px-2 py-1 mb-8 overflow-y-scroll text-5xl font-bold capitalize bg-transparent border-2 border-black border-dashed rounded-lg outline-none resize-none scroll-hidden placeholder:text-black"
            placeholder="Tiêu đề................"
            rows={2}
            name="bannerName"
            defaultValue={banner.bannerName}
            onChange={(e) => handleChange(e)}
          ></textarea>
          <textarea
            className="px-2 py-1 mb-8 overflow-y-scroll bg-transparent border-2 border-black border-dashed rounded-lg outline-none resize-none scroll-hidden placeholder:text-black"
            rows="2"
            placeholder="Mô tả.................."
            name="bannerDesc"
            defaultValue={banner.bannerDesc}
            onChange={(e) => handleChange(e)}
          ></textarea>
          <Link
            to={(location) => ({
              ...location,
              pathname: banner.bannerUrl,
            })}
            target="_blank"
            rel="noopener noreferer"
            className="bg-[#00000080] text-sm font-bold tracking-[4px] px-7 py-3 text-white flex items-center gap-x-3 uppercase max-w-max"
          >
            Shop now
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BannerInfo;
