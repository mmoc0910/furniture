import React from "react";
import { useParams } from "react-router-dom";

const SearchPage = () => {
  const { slug } = useParams();
  return <div>{slug}</div>;
};

export default SearchPage;
