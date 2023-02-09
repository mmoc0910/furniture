import dayjs from "dayjs";
import React from "react";
import { useDispatch } from "react-redux";
import SelectColorItem from "../../../clientComponents/components/products/shop/SelectColorItem";
import { addColor, setShowInputAddColor } from "../../sagas/color/colorSlice";

const AddNewColor = () => {
  const [color, setColor] = React.useState("");
  const dispatch = useDispatch();
  return (
    <div className="fixed inset-0 z-20 bg-[#16191b44] flex items-center justify-center">
      <div
        className="absolute inset-0 z-30 bg-transparent"
        onClick={() => dispatch(setShowInputAddColor(false))}
      ></div>
      <div
        className={`relative z-40 px-10 py-8 bg-white rounded-lg max-w-[350px] w-full 
        }`}
      >
        <h4 className="mb-5 text-xl font-bold text-center">Add new color</h4>
        <form
          autoComplete="off"
          className="flex flex-col w-full gap-5"
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(
              addColor({
                colorName: e.target.elements["colorName"].value,
                colorValue: e.target.elements["colorValue"].value,
                createdAt: dayjs().unix(),
              })
            );
            dispatch(setShowInputAddColor(false));
          }}
        >
          <input
            type="text"
            name="colorName"
            placeholder="Color name(Ex: Yellow)"
            className="px-5 py-2 border border-[#8e8d8c] rounded-lg outline-none"
          />
          <div className="relative">
            <input
              type="text"
              name="colorValue"
              placeholder="Color value(Ex: #e5b556)"
              className="px-5 py-2 w-full border border-[#8e8d8c] rounded-lg outline-none"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
            <div className="absolute -translate-y-1/2 top-1/2 right-4">
              {color && (
                <SelectColorItem color={color} size="1rem"></SelectColorItem>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-[#eaeaf1] rounded-lg font-bold"
          >
            Add color
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNewColor;
