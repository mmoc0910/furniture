import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Box from "../Box";
import TagNameItem from "./TagNameItem";
import { useDispatch, useSelector } from "react-redux";
import { getTag, setShowInputAddTag, addTag } from "../../sagas/tag/tagSlice";
import dayjs from "dayjs";

const TagName = () => {
  const inputRef = React.useRef();
  const dispatch = useDispatch();
  const { tags, showInputAddTag } = useSelector((state) => state.tag);
  // console.log(tags);
  React.useEffect(() => {
    dispatch(getTag());
  }, [dispatch]);
  React.useEffect(() => {
    inputRef?.current && inputRef.current.focus();
  }, [showInputAddTag]);

  const handleAddTag = (data) => {
    dispatch(addTag(data));
  };
  return (
    <Box>
      <div className="flex flex-col gap-5">
        <h3 className="flex items-center justify-between text-2xl font-bold ">
          Tag
          <span
            className="flex justify-center items-center w-8 h-8 rounded-lg bg-[#eaeaf1] cursor-pointer"
            onClick={() => dispatch(setShowInputAddTag(true))}
          >
            <AiOutlinePlus></AiOutlinePlus>
          </span>
        </h3>
        <div className="flex flex-wrap gap-x-4 gap-y-4">
          {tags &&
            tags.length > 0 &&
            tags.map((item) => (
              <TagNameItem key={item.id} data={item}></TagNameItem>
            ))}
          {showInputAddTag && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (inputRef.current.value) {
                  handleAddTag({
                    tagName: inputRef.current.value,
                    updatedAt: null,
                    isVisiabled: false,
                    isDeleted: false,
                    deletedAt: null,
                    createdAt: dayjs().unix(),
                  });
                } else {
                  dispatch(setShowInputAddTag(false));
                }
              }}
            >
              <input
                ref={inputRef}
                type="text"
                className="px-2 py-1 transition-all duration-150 bg-white rounded-full max-w-[100px] outline-none border border-transparent"
              />
            </form>
          )}
        </div>
      </div>
    </Box>
  );
};

export default TagName;
