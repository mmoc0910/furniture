import React from "react";
import { AiOutlineUpload } from "react-icons/ai";
import Box from "../Box";
import Modal from "../modal/Modal";
import PriviewImageUpload from "./PriviewImageUpload";
import { useSelector, useDispatch } from "react-redux";
// import { setimages } from "../../sagas/priviewImages/imagesSlice";
import { toogleShowModal } from "../../sagas/modal/modalSlice";
import { setPriviewImages } from "../../sagas/priviewImages/priviewImagesSlice";

const arr = [0, 1, 2, 3];
const UploadImg = () => {
  const [indexSlice, setIndexSlice] = React.useState(0);
  const { priviewImages } = useSelector((state) => state.priviewIamges);
  const { product } = useSelector((state) => state.product);
  const { showModal } = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const images = priviewImages.length > 0 ? priviewImages : product.images;
  const ref = React.useRef();
  const handleChangeFile = () => {
    const selectedFiles = ref.current.files;
    // console.log(selectedFiles);
    const selectedFilesArray = Array.from(selectedFiles);
    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });
    dispatch(setPriviewImages([...imagesArray]));
    // dispatch(setImgFiles([...imgFiles, selectedFiles]));
  };
  // console.log(dispatch(setShowModal));
  const handleClick = (index) => {
    dispatch(toogleShowModal());
    setIndexSlice(index);
  };
  return (
    <>
      <Box className="grid w-full h-full grid-cols-4 grid-rows-2 gap-4 cursor-pointer images-upload">
        {images &&
          images.length > 0 &&
          images.map(
            (image, index) =>
              index <= 3 && (
                <div
                  key={image}
                  className={`relative overflow-hidden rounded-lg ${
                    index === 0
                      ? "col-span-2 row-span-2"
                      : "col-span-1 row-span-1"
                  }`}
                >
                  {images.length > 4 && index >= 3 && (
                    <div
                      className="absolute inset-0 bg-[#16191b80] rounded-lg flex items-center justify-center text-white font-semibold text-2xl"
                      onClick={() => handleClick(index)}
                    >
                      +{images.length - 4}
                    </div>
                  )}
                  <img
                    src={image}
                    alt=""
                    className="w-full h-full"
                    onClick={() => handleClick(index)}
                  />
                </div>
              )
          )}
        {arr &&
          arr.map(
            (item, index) =>
              index < arr.length - images.length && (
                <div
                  key={index}
                  className={` rounded-lg bg-[#eaebf1] ${
                    images.length === 0 && index === 0
                      ? "col-span-2 row-span-2"
                      : "col-span-1 row-span-1"
                  }`}
                ></div>
              )
          )}
        <div
          className={`flex items-center justify-center col-span-1 row-span-1 overflow-hidden rounded-lg bg-[#eaebf1] cursor-pointer`}
        >
          <input
            type="file"
            name="uploadImg"
            id="uploadImg"
            className="hidden upload-imgs"
            multiple
            accept="image/*"
            ref={ref}
            onChange={handleChangeFile}
          />
          <label htmlFor="uploadImg" className="cursor-pointer">
            <AiOutlineUpload size={"2.5rem"} color="#9998ac"></AiOutlineUpload>
          </label>
        </div>
      </Box>
      {showModal && (
        <Modal classContent="w-[90%] h-[90%] bg-white p-5 relative">
          <PriviewImageUpload indexSlice={indexSlice}></PriviewImageUpload>
        </Modal>
      )}
    </>
  );
};

export default UploadImg;
