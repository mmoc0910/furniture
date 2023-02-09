import React from "react";
import { Link } from "react-router-dom";

const CollectionItem = ({ location, urlImg }) => {
  const [hover, setHover] = React.useState(false);
  //   console.log(collectionRef.current);
  return (
    <div
      className={`collection-item collection-item__${location} wow animate__animated ${
        location === "left" ? "animate__fadeInLeft" : "animate__fadeInRight"
      }`}
    >
      <div
        className="cursor-pointer collection-image"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <img src={urlImg} alt="" className="w-full h-full" />
      </div>
      <div
        className={`collection-text wow  animate__animated  ${
          location === "left" ? "animate__fadeInLeft" : "animate__fadeInRight"
        }`}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <h2 className="mb-3 text-4xl font-bold capitalize">
          Clothing Collections 2030
        </h2>
        <Link
          className={`uppercase text-sm tracking-[4px] leading-loose font-bold py-1 relative after:absolute after:h-[2px] after:bg-black after:left-0 after:bottom-0 after:transition-all after:duration-200 after:ease-linear ${
            hover
              ? "after:w-1/2 after:bg-[#d52f42]"
              : "after:w-full after:bg-black"
          }`}
        >
          Shop now
        </Link>
      </div>
    </div>
  );
};

export default CollectionItem;
