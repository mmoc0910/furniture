import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Box from "../Box";
import { Button } from "../forms";
import CategoryItem from "./CategoryItem";
import { useSelector, useDispatch } from "react-redux";
import dayjs from "dayjs";
import {
  setCategory,
  setShowInputAddCategory,
} from "../../sagas/category/categorySlice";
import { v4 as uuidv4 } from "uuid";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../../firebase/firebase-config";

const Categories = () => {
  const addInputRef = React.useRef();
  const dispatch = useDispatch();
  const { showInputAddCategory } = useSelector((state) => state.category);
  const [categories, setCategories] = React.useState([]);
  console.log(categories);
  React.useEffect(() => {
    addInputRef?.current?.focus();
  }, [showInputAddCategory]);
  React.useEffect(() => {
    const colRef = collection(db, "category");
    const q = query(
      colRef,
      orderBy("createdAt", "asc"),
      where("isDeleted", "==", false)
    );
    onSnapshot(q, (snapshot) => {
      let data = [];
      snapshot.docs.forEach((doc, index) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      dispatch(setCategory(data));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddCategory = async () => {
    if (addInputRef?.current?.value) {
      try {
        await addDoc(collection(db, "category"), {
          categoryName: addInputRef.current.value,
          isDeleted: false,
          isVisiabled: false,
          createdAt: dayjs().unix(),
          updatedAt: null,
          deletedAt: null,
        });
      } catch (error) {
        console.log(error);
      }

      // dispatch(
      //   addCategory({
      //     categoryName: addInputRef.current.value,
      //     isDeleted: false,
      //     isVisiabled: false,
      //     createdAt: dayjs().unix(),
      //     updatedAt: null,
      //     deletedAt: null,
      //   })
      // );
    } else {
      dispatch(setShowInputAddCategory(false));
    }
  };
  return (
    <Box>
      <div className="flex flex-col justify-between h-full">
        <div>
          <h3 className="relative z-[6] flex items-center justify-between text-2xl font-bold">
            Danh mục
            <span
              className="flex justify-center items-center w-8 h-8 rounded-lg bg-[#eaeaf1] cursor-pointer"
              onClick={() => dispatch(setShowInputAddCategory(true))}
            >
              <AiOutlinePlus></AiOutlinePlus>
            </span>
          </h3>
          <div className="space-y-1 -mt-[5px] border-l-2 border-[#8e8d8c] relative before:absolute before:w-full before:h-[5px] before:top-0 before:-left-1 before:bg-[#f7f7f9] before:z-[5]">
            {categories &&
              categories.map((item) => (
                <CategoryItem key={uuidv4()} data={item}></CategoryItem>
              ))}
            {showInputAddCategory && (
              <form
                className="pl-5 -ml-[1px] border-l-2 border-b-2 border-[#8e8d8c] rounded-bl-lg"
                style={{ transform: "translate(-1px, 10px)" }}
                onSubmit={(e) => {
                  e.preventDefault();
                  handleAddCategory();
                }}
              >
                <input
                  autoComplete="off"
                  type="text"
                  name="category"
                  id="category2"
                  className="translate-y-1/2 pl-1 bg-[#f7f7f9] w-full outline-none"
                  ref={addInputRef}
                />
              </form>
            )}
          </div>
        </div>
        <Button
          onClick={() => handleAddCategory()}
          type="submit"
          className="w-full mt-10 py-3 bg-[#eaeaf1] rounded-lg font-bold"
        >
          Thêm danh mục
        </Button>
      </div>
    </Box>
  );
};

export default Categories;
