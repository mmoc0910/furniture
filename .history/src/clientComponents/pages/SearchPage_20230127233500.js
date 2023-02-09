import React from "react";
import { useParams } from "react-router-dom";

const SearchPage = () => {
  const { slug } = useParams();
  return (
    <div className="container pt-10 pb-20">
      <p className="font-semibold pb-8">
        Kết quả tìm kiếm của: <span className="font-bold text-lg">{slug}</span>
      </p>
      <p>dmvbdfj</p>
    </div>
  );
};

export default SearchPage;
