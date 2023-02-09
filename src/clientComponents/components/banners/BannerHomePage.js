import React from "react";
import BannerItem from "./BannerItem";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { getBanners } from "../../../adminComponents/sagas/banner/bannerSlice";

const BannerHomePage = () => {
  const navigationPrevRef = React.useRef(null);
  const navigationNextRef = React.useRef(null);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getBanners("client"));
  }, [dispatch]);
  const { banners } = useSelector((state) => state.banner);

  return (
    <div className="relative w-full overflow-hidden select-none">
      <Swiper
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, EffectFade, Navigation]}
        effect={"fade"}
        className="mySwiper"
        grabCursor={true}
        loop={true}
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
      >
        {banners &&
          banners.length > 0 &&
          banners.map((banner) => (
            <SwiperSlide key={uuidv4()}>
              <BannerItem
                urlImg="/images/hero-1.jpg"
                banner={banner}
              ></BannerItem>
            </SwiperSlide>
          ))}

        <div
          ref={navigationPrevRef}
          className="absolute z-30 -translate-x-1/2 cursor-pointer navigationPrev top-[80%] left-[10%] xl:top-1/2 xl:left-[5%]"
        >
          <span>
            <BsArrowLeft size={"2.5rem"}></BsArrowLeft>
          </span>
        </div>
        <div
          ref={navigationNextRef}
          className="absolute z-30 -translate-x-1/2 cursor-pointer navigationNext top-[80%] left-[40%] xl:top-1/2 xl:left-[95%]"
        >
          <span>
            <BsArrowRight size={"2.5rem"}></BsArrowRight>
          </span>
        </div>
      </Swiper>
    </div>
  );
};

export default BannerHomePage;
