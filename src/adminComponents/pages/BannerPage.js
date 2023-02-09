import React from "react";
import { useDispatch, useSelector } from "react-redux";
import AddNewBanner from "../components/banner/AddNewBanner";
import BannerItem from "../components/banner/BannerItem";
import { Button } from "../components/forms";
import Heading from "../components/Heading";
import { getBanners, setShowAddBanner } from "../sagas/banner/bannerSlice";
import { v4 as uuidv4 } from "uuid";
import { getColors } from "../sagas/color/colorSlice";
import EditBanner from "../components/banner/EditBanner";

const BannerPage = () => {
  const { showAddBanner, showEditBanner, banners } = useSelector(
    (state) => state.banner
  );
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getColors());
  }, [dispatch]);
  React.useEffect(() => {
    dispatch(getBanners());
  }, [dispatch]);
  return (
    <>
      <div>
        <Heading heading={"Danh sách banner"}>
          <Button
            className={"px-5 py-2 rounded-lg bg-[#4c7993] text-white"}
            onClick={() => dispatch(setShowAddBanner(true))}
          >
            Thêm banner
          </Button>
        </Heading>
        <div className="flex flex-col gap-10 ">
          {banners &&
            banners.length > 0 &&
            banners.map((banner) => (
              <BannerItem key={uuidv4()} data={banner}></BannerItem>
            ))}
        </div>
      </div>
      {showAddBanner && <AddNewBanner></AddNewBanner>}
      {showEditBanner && <EditBanner></EditBanner>}
    </>
  );
};

export default BannerPage;
