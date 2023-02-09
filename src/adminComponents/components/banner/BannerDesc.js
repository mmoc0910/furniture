import { debounce } from "lodash";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBanner } from "../../sagas/banner/bannerSlice";

const BannerDesc = () => {
  const dispatch = useDispatch();
  const { bannerDesc } = useSelector((state) => state.banner.banner);
  const handleChange = debounce((e) => {
    dispatch(setBanner({ name: e.target.name, value: e.target.value }));
  }, 300);
  return (
    <textarea
      className="px-2 py-1 mb-8 overflow-y-scroll bg-transparent border-2 border-black border-dashed rounded-lg outline-none resize-none scroll-hidden placeholder:text-black"
      rows="2"
      placeholder="Mô tả.................."
      name="bannerDesc"
      defaultValue={bannerDesc}
      onChange={(e) => handleChange(e)}
    ></textarea>
  );
};

export default BannerDesc;
