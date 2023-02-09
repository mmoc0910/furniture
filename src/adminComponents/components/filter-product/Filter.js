import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "../../sagas/category/categorySlice";
import CheckboxFilter from "./CheckboxFilter";
import SearchFillter from "./SearchFillter";
import SortBy from "./SortBy";

const Filter = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  React.useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);
  return (
    <div className="flex items-center justify-end gap-4 mb-7">
      <SearchFillter></SearchFillter>
      <CheckboxFilter label={"Danh muc"} data={categories}></CheckboxFilter>
      <SortBy label={"Sap xep theo"}></SortBy>
    </div>
  );
};

export default Filter;
