import React from "react";
import { useParams } from "react-router-dom";

const SearchPage = () => {
  const { slug } = useParams();
  return <div className="container">{slug}</div>;
};

export default SearchPage;
