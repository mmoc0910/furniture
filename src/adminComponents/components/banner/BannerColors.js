import React from "react";
import { useDispatch, useSelector } from "react-redux";
import SelectColorItem from "../../../clientComponents/components/products/shop/SelectColorItem";
import { setBanner } from "../../sagas/banner/bannerSlice";
import { getColors, setShowInputAddColor } from "../../sagas/color/colorSlice";
import AddNewColor from "../products/AddNewColor";

const BannerColors = () => {
  const dispatch = useDispatch();
  const { colors } = useSelector((state) => state.color);
  const { showInputAddColor } = useSelector((state) => state.color);
  const { bannerColorBg } = useSelector((state) => state.banner.banner);
  //   React.useEffect(() => {
  //     dispatch(getColors());
  //   }, [dispatch]);
  return (
    <>
      <div className="flex items-center gap-3">
        {colors &&
          colors.map((item) => (
            <SelectColorItem
              key={item.id}
              colorName={item.colorName}
              checked={item.colorValue === bannerColorBg}
              size="1rem"
              color={item.colorValue}
              id={item.id}
              name="bannerColorBg"
              type="radio"
              onChange={(e) => {
                dispatch(
                  setBanner({
                    name: e.target.name,
                    value: item.colorValue,
                  })
                );
              }}
            ></SelectColorItem>
          ))}
        <span
          className="cursor-pointer"
          onClick={() => {
            dispatch(setShowInputAddColor(true));
          }}
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
              d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </span>
      </div>
      {showInputAddColor && <AddNewColor></AddNewColor>}
    </>
  );
};

export default BannerColors;
