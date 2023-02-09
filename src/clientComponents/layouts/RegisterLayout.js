import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import { Autoplay, EffectFade, Navigation } from "swiper";
import { Input, Button } from "../components/forms";
import { FaGoogle } from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";
import Logo from "../components/Logo";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

const RegisterLayout = () => {
  const navigationPrevRef = React.useRef(null);
  const navigationNextRef = React.useRef(null);
  return (
    <div className="relative flex items-center justify-center w-screen h-screen">
      <div className="hidden max-w-[100%] md:block lg:max-w-[65%] w-full h-full bg-black relative">
        <Swiper
          className="signinSwiper"
          loop={true}
          effect={"fade"}
          modules={[Autoplay, EffectFade, Navigation]}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
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
          <SwiperSlide>
            <div className="relative w-full h-full">
              <div className="absolute inset-0 z-20 w-full h-full bg-transparent">
                <div className="grid w-full h-full grid-cols-1 grid-rows-3 p-10">
                  <Logo className="items-start"></Logo>
                  <p className="quote hidden lg:block text-4xl font-semibold leading-normal text-white max-w-[700px]">
                    "Good Space, Good Service – Không gian tốt, dịch vụ tốt"
                  </p>
                  <div className="flex flex-col items-start justify-end text-white">
                    <div className="hidden text-lg font-semibold author lg:block">
                      Mr.DianaVinhPham
                    </div>
                    <div className="hidden location lg:block">Founder</div>
                  </div>
                </div>
              </div>
              <img
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1916&q=80"
                alt=""
                className="absolute inset-0 z-10 w-full h-full"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative w-full h-full">
              <div className="absolute inset-0 z-20 w-full h-full bg-transparent">
                <div className="grid w-full h-full grid-cols-1 grid-rows-3 p-10">
                  <Logo className="items-start"></Logo>
                  <p className="quote hidden lg:block text-4xl font-semibold leading-normal text-white max-w-[700px]">
                    "Best Service, Right Time, Right People – Dịch vụ tốt nhất,
                    Đúng lúc, Đúng người"
                  </p>
                  <div className="flex flex-col items-start justify-end text-white">
                    <div className="hidden text-lg font-semibold author lg:block">
                      Mr.DianaVinhPham
                    </div>
                    <div className="hidden location lg:block">Founder</div>
                  </div>
                </div>
              </div>
              <img
                src="https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80"
                alt=""
                className="absolute inset-0 z-10 w-full h-full"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative w-full h-full">
              <div className="absolute inset-0 z-20 w-full h-full bg-transparent">
                <div className="grid w-full h-full grid-cols-1 grid-rows-3 p-10">
                  <Logo className="items-start"></Logo>
                  <p className="quote hidden lg:block text-4xl font-semibold leading-normal text-white max-w-[700px]">
                    "Your Passion is our Satisfaction – Đam mê của bạn là sự hài
                    lòng của chúng tôi"
                  </p>
                  <div className="flex flex-col items-start justify-end text-white">
                    <div className="hidden text-lg font-semibold author lg:block">
                      Mr.DianaVinhPham
                    </div>
                    <div className="hidden location lg:block">Founder</div>
                  </div>
                </div>
              </div>
              <img
                src="https://images.unsplash.com/photo-1615874959474-d609969a20ed?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1780&q=80"
                alt=""
                className="absolute inset-0 z-10 w-full h-full"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative w-full h-full">
              <div className="absolute inset-0 z-20 w-full h-full bg-transparent">
                <div className="grid w-full h-full grid-cols-1 grid-rows-3 p-10">
                  <Logo className="items-start"></Logo>
                  <p className="quote hidden lg:block text-4xl font-semibold leading-normal text-white max-w-[700px]">
                    "Satisfaction is our motto – Sự hài lòng là phương châm của
                    chúng tôi"
                  </p>
                  <div className="flex flex-col items-start justify-end text-white">
                    <div className="hidden text-lg font-semibold author lg:block">
                      Mr.DianaVinhPham
                    </div>
                    <div className="hidden location lg:block">Founder</div>
                  </div>
                </div>
              </div>
              s
              <img
                src="https://images.unsplash.com/photo-1565538810643-b5bdb714032a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80"
                alt=""
                className="absolute inset-0 z-10 w-full h-full"
              />
            </div>
          </SwiperSlide>
          <div
            ref={navigationPrevRef}
            className="absolute z-30 -translate-x-1/2 cursor-pointer bottom-10 right-40"
          >
            <span>
              <BsArrowLeft size={"2.5rem"} color="white"></BsArrowLeft>
            </span>
          </div>
          <div
            ref={navigationNextRef}
            className="absolute z-30 -translate-x-1/2 cursor-pointer bottom-10 right-10"
          >
            <span>
              <BsArrowRight size={"2.5rem"} color="white"></BsArrowRight>
            </span>
          </div>
        </Swiper>
      </div>
      <div className=" md:max-w-[70%] p-0 md:px-10 md:py-20 lg:p-0 bg-white rounded-3xl absolute z-50 lg:relative lg:max-w-[35%] w-full md:h-max h-full lg:h-full px-7 md:mx-20 lg:mx-12 flex flex-col items-start justify-center">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default RegisterLayout;
