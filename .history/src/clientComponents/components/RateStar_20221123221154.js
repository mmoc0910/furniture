import React from "react";
import { FaRegStar, FaStar } from "react-icons/fa";

const arrStar = [1, 2, 3, 4, 5];
const RateStar = ({ rateStar = 0 }) => {
  return (
    <div className="flex items-center gap-x-1">
      {arrStar &&
        arrStar.map((star, index) =>
          index + 1 <= rateStar.toFixed() ? (
            <span key={star}>
              <FaStar color="#ffaa01"></FaStar>
            </span>
          ) : (
            <span key={star}>
              <FaRegStar color="#ffaa01"></FaRegStar>
            </span>
          )
        )}
    </div>
  );
};

export default RateStar;
