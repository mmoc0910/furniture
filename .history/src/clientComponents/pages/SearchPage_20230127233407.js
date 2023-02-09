import React from "react";
import { useParams } from "react-router-dom";

const SearchPage = () => {
  const { slug } = useParams();
  return (
    <div className="container">
      <p className="font-semibold">
        Kết quả tìm kiếm của: <span className="font-bold text-lg">{slug}</span>
      </p>
    </div>
  );
};

export default SearchPage;
