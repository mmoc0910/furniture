import React from "react";
import {
  AiOutlineEdit,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { FaRegTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { updateTag } from "../../sagas/tag/tagSlice";
import dayjs from "dayjs";
import { setProduct } from "../../sagas/products/productSlice";

const TagNameItem = ({ data }) => {
  const [edit, setEdit] = React.useState(false);
  const inputRef = React.useRef();
  const dispatch = useDispatch();
  const { tag } = useSelector((state) => state.product.product);
  const { product } = useSelector((state) => state.product);
  React.useEffect(() => {
    inputRef?.current && inputRef.current.focus();
  }, [edit]);
  const handleUpadteTag = (data) => {
    dispatch(updateTag(data));
  };
  return (
    <div className="">
      <input
        type="checkbox"
        name="tag"
        id={data.id}
        checked={product.tag.some((item) => item.id === data.id)}
        className="hidden peer"
        value={data.tagName}
        onChange={(e) => {
          const arr = [...tag];
          if (e.target.checked) {
            arr.push({ id: data.id, tagName: data.tagName });
            dispatch(setProduct({ name: "tag", value: arr }));
          } else {
            dispatch(
              setProduct({
                name: "tag",
                value: [...arr].filter((item) => item.id !== data.id),
              })
            );
          }
        }}
      />
      <div className="flex items-center pl-2 pr-0 py-1 transition-[background-color] duration-300 bg-white rounded-full peer-checked:font-bold peer-checked:text-white peer-checked:bg-[#3c897b] group">
        <label htmlFor={data.id}>
          {edit ? (
            <form
              className="w-full max-w-[100px]"
              onSubmit={(e) => {
                e.preventDefault();
                handleUpadteTag({
                  tagName: inputRef.current.value,
                  id: data.id,
                  updatedAt: dayjs().unix(),
                });
                setEdit(false);
              }}
            >
              <input
                ref={inputRef}
                type="text"
                defaultValue={data.tagName}
                className="w-full outline-none bg-inherit"
              />
            </form>
          ) : (
            <>
              <span className="font-bold">#</span>
              {data.tagName}
            </>
          )}
        </label>
        <div className="relative flex items-center justify-center transition-all duration-300 cursor-pointer group/item">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
            />
          </svg>
          <div className="absolute flex flex-row items-center gap-2 rounded-bl-none text-white bg-[#d7d7d6] px-2 py-1 rounded-full left-1/3 bottom-full opacity-0 invisible group-hover/item:opacity-100 group-hover/item:visible transition-all duration-200">
            <span className="hover:text-black">
              {data.isVisiabled ? (
                <AiOutlineEyeInvisible
                  onClick={() =>
                    handleUpadteTag({
                      isVisiabled: false,
                      id: data.id,
                    })
                  }
                ></AiOutlineEyeInvisible>
              ) : (
                <AiOutlineEye
                  onClick={() =>
                    handleUpadteTag({
                      isVisiabled: true,
                      id: data.id,
                    })
                  }
                ></AiOutlineEye>
              )}
            </span>
            <span className="hover:text-black" onClick={() => setEdit(!edit)}>
              <AiOutlineEdit></AiOutlineEdit>
            </span>
            <span className="hover:text-black">
              <FaRegTrashAlt
                size={"0.85rem"}
                onClick={() =>
                  handleUpadteTag({
                    isDeleted: true,
                    id: data.id,
                    deletedAt: dayjs().unix(),
                  })
                }
              ></FaRegTrashAlt>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TagNameItem;
