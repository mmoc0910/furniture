import React from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

const DiscountItem = ({ endTime = 1697734800 }) => {
  var duration = require("dayjs/plugin/duration");
  dayjs.extend(duration);
  const [time, setTime] = React.useState(dayjs.duration(100));
  const twoDP = (n) => (n > 9 ? n : "0" + n);
  React.useEffect(() => {}, []);
  React.useEffect(() => {
    const intervalFunc = setInterval(function () {
      const currentTime = dayjs();
      //   console.log(currentTime);
      const diffTime = endTime - currentTime.unix();
      // console.log(diffTime);
      if (diffTime < 0) clearInterval(intervalFunc);
      if (diffTime >= 0) {
        const duration = dayjs.duration(diffTime * 1000, "milliseconds");
        setTime(duration);
      }
    }, 1000);
    return function cleanup() {
      clearInterval(intervalFunc);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className="max-w-full lg:max-w-[33.333%] w-full relative z-[21] mb-16 lg:mb-0">
        <div className=" relative h-0 pb-[100%] ">
          <img
            src="/images/mockup-graphics-W6hOoTINcbc-unsplash.png"
            alt=""
            className="absolute inset-0 w-full h-full rounded-lg"
          />
        </div>
        <div className="absolute right-0 flex flex-col items-center justify-center w-32 h-32 text-white bg-black rounded-full lg:w-24 lg:h-24 -top-10">
          <p className="text-2xl font-medium lg:text-base">Sale Of</p>
          <p className="text-3xl font-bold lg:text-xl">40%</p>
        </div>
        <div className="mt-10 text-center wow animate__animated animate__fadeInUp">
          <p className="text-3xl font-bold leading-none first-letter:text-2xl">
            đ1.000.000
            <span className="ml-2 text-lg line-through decoration-2">
              đ1.100.000
            </span>
          </p>
        </div>
      </div>
      <div className="max-w-full lg:max-w-[33.333%] w-full ml-auto">
        <p className="text-[#e53637] text-sm font-bold tracking-[2px] uppercase mb-4 animate__animated wow animate__fadeInRight">
          DEAL OF THE WEEK
        </p>
        <h3
          style={{ animationDelay: "0.2s" }}
          className="mb-10 text-4xl font-bold animate__animated wow animate__fadeInRight"
        >
          Multi-pocket Chest Bag Black
        </h3>
        <div className="flex -ml-10">
          <div className="w-1/4 grow-0 shrink-0">
            <p className="relative mb-4 text-4xl font-bold text-center after:content-[':'] after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 animate__animated wow animate__fadeInDown">
              {twoDP(time.$d.days)}
            </p>
            <p className="text-[#3d3d3d] text-center text-sm wow animate__animated wow animate__fadeInUp">
              Days
            </p>
          </div>
          <div className="w-1/4 grow-0 shrink-0">
            <p className="relative mb-4 text-4xl font-bold text-center after:content-[':'] after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 animate__animated wow animate__fadeInDown">
              {twoDP(time.$d.hours)}
            </p>
            <p className="text-[#3d3d3d] text-center text-sm wow animate__animated wow animate__fadeInUp">
              Hours
            </p>
          </div>
          <div className="w-1/4 grow-0 shrink-0">
            <p className="relative mb-4 text-4xl font-bold text-center after:content-[':'] after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 wow animate__animated wow animate__fadeInDown">
              {twoDP(time.$d.minutes)}
            </p>
            <p className="text-[#3d3d3d] text-center text-sm wow animate__animated wow animate__fadeInUp">
              Minutes
            </p>
          </div>
          <div className="w-1/4 grow-0 shrink-0">
            <p className="relative mb-4 text-4xl font-bold text-center wow animate__animated animate__fadeInDown">
              {twoDP(time.$d.seconds)}
            </p>
            <p className="text-[#3d3d3d] text-center wow animate__animated wow animate__fadeInUp">
              Seconds
            </p>
          </div>
        </div>
        <Link className="uppercase text-white bg-black font-bold tracking-[4px] mt-10 inline-block text-[13px] px-8 py-3 rounded-sm animate__animated wow animate__fadeInRight">
          shop now
        </Link>
      </div>
    </>
  );
};

export default DiscountItem;
