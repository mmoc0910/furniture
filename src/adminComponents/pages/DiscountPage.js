import React from "react";
import Box from "../components/Box";
import AddDiscount from "../components/discounts/AddDiscount";
import Discounts from "../components/discounts/Discounts";
import { Button } from "../components/forms";
import Heading from "../components/Heading";

const DiscountPage = () => {
  return (
    <>
      <div>
        <Heading heading={"Giảm giá"}>
          {/* <Button
            className={"px-5 py-2 rounded-lg bg-[#4c7993] text-white"}
            // onClick={() => dispatch(setShowAddBanner(true))}
          >
            Hoàn thành
          </Button> */}
        </Heading>
        <div className="grid grid-cols-10 gap-7">
          <Box className={"col-span-4"}>
            <AddDiscount></AddDiscount>
          </Box>
          <Box className={"col-span-6"}>
            <Discounts></Discounts>
          </Box>
        </div>
      </div>
    </>
  );
};

export default DiscountPage;
