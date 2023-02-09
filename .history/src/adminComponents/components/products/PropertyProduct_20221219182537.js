import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import SelectColorItem from "../../../clientComponents/components/products/shop/SelectColorItem";
import Box from "../Box";
import { Button } from "../forms";
import { useSelector, useDispatch } from "react-redux";
import { getColors, setShowInputAddColor } from "../../sagas/color/colorSlice";
import { v4 as uuidv4 } from "uuid";
import PropertyItem from "./PropertyItem";
import { setProduct } from "../../sagas/products/productSlice";
import AddNewColor from "./AddNewColor";

const PropertyProduct = () => {
  const [addProp, setAddProp] = React.useState(false);
  const inputRef = React.useRef();
  const dispatch = useDispatch();
  const { colors, showInputAddColor } = useSelector((state) => state.color);
  const { properties } = useSelector((state) => state.product.product);
  React.useEffect(() => {
    inputRef?.current && inputRef.current.focus();
  }, [addProp]);
  React.useEffect(() => {
    dispatch(getColors());
  }, [dispatch]);
  React.useEffect(() => {
    const boxScroll = document.querySelector(".box-scroll");

    boxScroll.addEventListener("wheel", (e) => {
      e.preventDefault();
      const delta = e.deltaY;
      console.log(delta);
      boxScroll.scrollLeft += delta;
    });
  }, []);

  return (
    <>
      <Box>
        <div className="flex flex-col items-center justify-between h-full">
          <div className="flex flex-col w-full h-full gap-5">
            <h3 className="flex items-center justify-between text-2xl font-bold">
              Phân loại hàng
              <span
                className="flex justify-center items-center w-8 h-8 rounded-lg bg-[#eaeaf1] cursor-pointer"
                onClick={() => setAddProp(!addProp)}
              >
                <AiOutlinePlus></AiOutlinePlus>
              </span>
            </h3>
            <div className="space-y-5">
              <div className="px-5 py-2 bg-white rounded-lg">
                <div className="flex items-center gap-2">
                  <span className="font-bold ">Color</span>
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-4 h-4 text-inherit"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <div className="flex w-full gap-3 px-1 py-1 overflow-x-auto scroll-smooth list-colors box-scroll">
                    {colors &&
                      colors.map((item) => (
                        <SelectColorItem
                          key={item.id}
                          checked={properties.color.some(
                            (color) => color.id === item.id
                          )}
                          colorName={item.colorName}
                          size="1rem"
                          color={item.colorValue}
                          id={item.id}
                          type="checkbox"
                          onChange={(e) => {
                            const arr = [...properties.color];
                            if (e.target.checked) {
                              arr.push({
                                id: e.target.id,
                                colorName: e.target.getAttribute("data-color"),
                                colorValue: e.target.value,
                              });
                              dispatch(
                                setProduct({
                                  name: "properties",
                                  value: {
                                    ...properties,
                                    color: arr,
                                  },
                                })
                              );
                            } else {
                              dispatch(
                                setProduct({
                                  name: "properties",
                                  value: {
                                    ...properties,
                                    color: [...arr].filter(
                                      (item) => item.id !== e.target.id
                                    ),
                                  },
                                })
                              );
                            }
                          }}
                        ></SelectColorItem>
                      ))}
                  </div>

                  <span
                    className="cursor-pointer"
                    onClick={() => dispatch(setShowInputAddColor(true))}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v12m6-6H6"
                      />
                    </svg>
                  </span>
                </div>
              </div>
              {Object.keys(properties).length > 0 &&
                Object.keys(properties).map(
                  (item) =>
                    item !== "color" && (
                      <PropertyItem
                        propName={item}
                        key={uuidv4()}
                      ></PropertyItem>
                    )
                )}
              {addProp && (
                <div className="px-5 py-2 bg-white rounded-lg">
                  <form
                    autoComplete="off"
                    onSubmit={(e) => {
                      e.preventDefault();
                      dispatch(
                        setProduct({
                          name: "properties",
                          value: {
                            ...properties,
                            [e.target.elements["addProperty"].value]: [],
                          },
                        })
                      );
                      setAddProp(false);
                    }}
                  >
                    <input
                      ref={inputRef}
                      type="text"
                      name="addProperty"
                      className="w-full outline-none"
                    />
                  </form>
                </div>
              )}
            </div>
          </div>

          <Button
            className="w-full mt-10 py-3 bg-[#eaeaf1] rounded-lg font-bold"
            onClick={() => {
              if (inputRef?.current?.value) {
                dispatch(
                  setProduct({
                    name: "properties",
                    value: {
                      ...properties,
                      [inputRef.current.value]: [],
                    },
                  })
                );
              }
              setAddProp(false);
            }}
          >
            Thêm phân loại hàng
          </Button>
        </div>
      </Box>
      {showInputAddColor && <AddNewColor></AddNewColor>}
    </>
  );
};

export default PropertyProduct;
