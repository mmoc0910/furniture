import dayjs from "dayjs";
import React from "react";
import {
  AiOutlineEdit,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { FaRegTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { updateCategory } from "../../sagas/category/categorySlice";
import { setProduct } from "../../sagas/products/productSlice";

const CategoryItem = ({ data }) => {
  const [showEdit, setShowEdit] = React.useState(false);
  const inputEditRef = React.useRef();
  const dispatch = useDispatch();
  const { categoryId } = useSelector((state) => state.product.product);
  const { product } = useSelector((state) => state.product);
  React.useEffect(() => {
    showEdit ? inputEditRef?.current?.focus() : inputEditRef?.current?.blur();
  }, [showEdit]);

  const handleDeleteCategory = () => {
    dispatch(
      updateCategory({
        id: data.id,
        isDeleted: true,
        deletedAt: dayjs().unix(),
      })
    );
  };

  const handleVisiableCategory = (data) => {
    dispatch(updateCategory(data));
  };

  const handleEditCategory = (data) => {
    dispatch(updateCategory(data));
    setShowEdit(false);
  };

  return (
    <>
      <div
        className="pl-5 -ml-[1px] border-l-2 border-b-2 border-[#8e8d8c] rounded-bl-lg select-none"
        style={{ transform: "translate(-1px, 10px)" }}
      >
        <input
          type="radio"
          name="category"
          id={data.id}
          value={data.id}
          className="hidden peer"
          checked={product.categoryId === data.id}
          onChange={(e) => {
            dispatch(
              setProduct({
                name: "categoryId",
                value: e.target.checked && e.target.value,
              })
            );
            dispatch(
              setProduct({
                name: "categoryName",
                value: data.categoryName,
              })
            );
          }}
        />
        <div
          className={`cursor-pointer translate-y-1/2 pl-1 bg-[#f7f7f9] transition-all duration-150   flex items-center justify-between gap-4 group ${
            categoryId === data.id ? "text-[#3c897b] font-bold" : "text-black"
          }`}
        >
          <label htmlFor={data.id} className="line-clamp-1">
            {showEdit ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleEditCategory({
                    id: data.id,
                    updatedAt: dayjs().unix(),
                    categoryName: inputEditRef.current.value,
                  });
                }}
              >
                <input
                  type="text"
                  className="bg-[#f7f7f9] outline-none line-clamp-1"
                  defaultValue={data.categoryName}
                  ref={inputEditRef}
                />
              </form>
            ) : (
              <span className="line-clamp-1">{data.categoryName}</span>
            )}
          </label>
          <div className="flex items-center">
            <span className="invisible text-[#8e8d8c] pr-1 transition-all duration-200 opacity-0 group-hover:opacity-100 group-hover:visible hover:text-black">
              {data.isVisiabled ? (
                <AiOutlineEyeInvisible
                  color="inherit"
                  onClick={() =>
                    handleVisiableCategory({
                      id: data.id,
                      isVisiabled: false,
                    })
                  }
                ></AiOutlineEyeInvisible>
              ) : (
                <AiOutlineEye
                  color="inherit"
                  onClick={() =>
                    handleVisiableCategory({
                      id: data.id,
                      isVisiabled: true,
                    })
                  }
                ></AiOutlineEye>
              )}
            </span>
            <span
              className={`edit-button pr-1 transition-all duration-200 group-hover:opacity-100 group-hover:visible text-[#8e8d8c] ${
                showEdit
                  ? "text-[#3c897b] opacity-100 visible"
                  : "hover:text-black opacity-0 invisible"
              }`}
              onClick={() => setShowEdit(!showEdit)}
            >
              <AiOutlineEdit
                color="inherit"
                className="pointer-events-none"
              ></AiOutlineEdit>
            </span>
            <span
              className="invisible pr-1 transition-all duration-200 opacity-0 group-hover:opacity-100 group-hover:visible hover:text-black text-[#8e8d8c]"
              onClick={() => handleDeleteCategory(data.id)}
            >
              <FaRegTrashAlt color="inherit" size={"0.85rem"}></FaRegTrashAlt>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryItem;
