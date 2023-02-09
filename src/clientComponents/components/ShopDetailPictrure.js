import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Thumbs } from "swiper";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

const ShopDetailPictrure = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState();
  const navigationPrevRef = React.useRef(null);
  const navigationNextRef = React.useRef(null);
  const { priviewImages } = useSelector((state) => state.priviewIamges);
  const { product } = useSelector((state) => state.product);
  const images = priviewImages.length > 0 ? priviewImages : product.images;
  return (
    <>
      {images.length > 0 ? (
        <>
          <Swiper
            loop={true}
            spaceBetween={20}
            grabCursor={true}
            navigation={{
              nextEl: navigationNextRef.current,
              prevEl: navigationPrevRef.current,
            }}
            onSwiper={(swiper) => {
              // Delay execution for the refs to be defined
              setTimeout(() => {
                // Override prevEl & nextEl now that refs are defined
                swiper.params.navigation.prevEl = navigationPrevRef.current;
                swiper.params.navigation.nextEl = navigationNextRef.current;

                // Re-init navigation
                swiper.navigation.destroy();
                swiper.navigation.init();
                swiper.navigation.update();
              });
            }}
            modules={[Navigation, Thumbs]}
            thumbs={{
              swiper:
                thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
            }}
            className="product-pictures"
          >
            {images &&
              images.map((item) => (
                <SwiperSlide key={uuidv4()}>
                  <img src={item} alt="" className="rounded-md" />
                </SwiperSlide>
              ))}
            <div
              ref={navigationPrevRef}
              className="absolute z-10 text-white cursor-pointer left-5 bottom-3"
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-10 h-10"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                  />
                </svg>
              </span>
            </div>
            <div
              ref={navigationNextRef}
              className="absolute z-10 text-white cursor-pointer right-5 bottom-3"
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-10 h-10"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                  />
                </svg>
              </span>
            </div>
          </Swiper>
          <Swiper
            loop={true}
            spaceBetween={10}
            slidesPerView={4}
            modules={[Navigation, Thumbs]}
            onSwiper={(swiper) => {
              setThumbsSwiper(swiper);
            }}
            className="product-pictures-thumbs"
          >
            {images &&
              images.map((item) => (
                <SwiperSlide key={uuidv4()}>
                  <div className="relative w-full h-0 pb-[70%] cursor-pointer select-none">
                    <img
                      src={item}
                      alt=""
                      className="absolute inset-0 w-full h-full rounded-md"
                    />
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </>
      ) : (
        <div className="w-full max-h-[400px] rounded-lg bg-[#d7d7d6] h-full"></div>
      )}
    </>
  );
};

export default ShopDetailPictrure;
