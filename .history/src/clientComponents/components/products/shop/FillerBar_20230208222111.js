import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "../../../../adminComponents/sagas/category/categorySlice";
import { Accordion } from "../../accordions";
import FillterItem from "./FillterItem";

const FillerBar = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  React.useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);
  return (
    <div className="mt-11">
      <FillterItem
        accrordionHeading={"Danh mục sản phẩm"}
        // accordionOption={categories}
      >
        <div className="pt-4 pl-4 text-[#b7b7b7] space-y-3 font-semibold">
          <Accordion.Option categoryId={""}>Tất cả sản phẩm</Accordion.Option>
          {categories &&
            categories.map((item) => (
              <Accordion.Option key={item.id} categoryId={item.id}>
                {item.categoryName}
              </Accordion.Option>
            ))}
        </div>
      </FillterItem>
    </div>
  );
};

export default FillerBar;
