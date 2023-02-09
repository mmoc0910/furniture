import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper";
import { useSelector, useDispatch } from "react-redux";
import { setPriviewImages } from "../../sagas/priviewImages/priviewImagesSlice";
import { toogleShowModal } from "../../sagas/modal/modalSlice";
import { setProduct } from "../../sagas/products/productSlice";

const PriviewImageUpload = ({ indexSlice }) => {
  const navigationPrevRef = React.useRef(null);
  const navigationNextRef = React.useRef(null);
  const { priviewImages } = useSelector((state) => state.priviewIamges);
  const { product } = useSelector((state) => state.product);
  const listImages = priviewImages.length > 0 ? priviewImages : product.images;
  const dispatch = useDispatch();
  const handleClick = (item) => {
    if (priviewImages.length > 0) {
      dispatch(setPriviewImages([...listImages].filter((img) => item !== img)));
    } else {
      dispatch(
        setProduct({
          name: "images",
          value: [...listImages].filter((img) => item !== img),
        })
      );
    }

    if (listImages.length === 1) dispatch(toogleShowModal(false));
  };
  return (
    <>
      <span
        className="absolute z-50 -translate-x-1/2 -translate-y-1/2 cursor-pointer left-5 top-1/2"
        ref={navigationPrevRef}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-10 h-10"
        >
          <path
            fillRule="evenodd"
            d="M7.28 7.72a.75.75 0 010 1.06l-2.47 2.47H21a.75.75 0 010 1.5H4.81l2.47 2.47a.75.75 0 11-1.06 1.06l-3.75-3.75a.75.75 0 010-1.06l3.75-3.75a.75.75 0 011.06 0z"
            clipRule="evenodd"
          />
        </svg>
      </span>
      <span
        className="absolute z-50 translate-x-1/2 -translate-y-1/2 cursor-pointer right-5 top-1/2"
        ref={navigationNextRef}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-10 h-10"
        >
          <path
            fillRule="evenodd"
            d="M16.72 7.72a.75.75 0 011.06 0l3.75 3.75a.75.75 0 010 1.06l-3.75 3.75a.75.75 0 11-1.06-1.06l2.47-2.47H3a.75.75 0 010-1.5h16.19l-2.47-2.47a.75.75 0 010-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </span>
      <Swiper
        initialSlide={indexSlice}
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
        modules={[Navigation]}
        className="w-full h-full priviewPictures"
      >
        {listImages &&
          listImages.length > 0 &&
          listImages.map((item) => (
            <SwiperSlide key={item}>
              <div className="relative z-50 w-full h-full">
                <span
                  className="absolute z-50 translate-x-1/2 -translate-y-1/2 cursor-pointer top-1/2 right-1/2"
                  onClick={() => handleClick(item)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="white"
                    className="w-14 h-14"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </span>
                <img src={item} alt="" className="w-auto h-full mx-auto" />
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
};

export default PriviewImageUpload;
