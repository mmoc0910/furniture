import React from "react";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import {
  FaFacebookF,
  FaInstagram,
  FaPinterestP,
  FaTwitter,
} from "react-icons/fa";
const BannerItem = ({ banner }) => {
  return (
    <div
      className="relative w-full h-[700px]"
      style={{ background: banner.bannerColorBg }}
    >
      <img
        src={banner.bannerImage}
        alt={banner.bannerName}
        className="object-cover w-full h-full slider-image"
      />
      <div className="absolute top-0 z-20 w-full h-full">
        <div className="container relative flex items-center justify-start h-full">
          <div className="slider-content flex flex-col items-start justify-center select-none max-w-[470px] w-full">
            {/* <p
              className={`text-[#e53637] uppercase text-sm font-bold tracking-[2px] mb-5 silder-animation`}
            >
              Summer Collection
            </p> */}
            <h2
              className={`text-5xl font-bold mb-6 silder-animation capitalize line-clamp-2`}
            >
              {banner.bannerName}
            </h2>
            <p className="mb-7 line-clamp-2 silder-animation">
              {banner.bannerDesc}
            </p>
            <a
              href={banner.bannerUrl}
              rel="noopener noreferer"
              className="bg-[#00000080] text-sm font-bold tracking-[4px] px-7 py-3 text-white flex items-center gap-x-3 uppercase  silder-animation"
            >
              Shop Now
              <span>
                <BsArrowRight size={"1.4rem"}></BsArrowRight>
              </span>
            </a>
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
  );
};

export default BannerItem;
