import React from "react";
import { useParams } from "react-router-dom";

const SearchPage = () => {
  const { slug } = useParams();
  return (
    <div className="container">
      <p>
        Kết quả tìm kiếm của: <span>{slug}</span>
      </p>
    </div>
  );
};

export default SearchPage;
