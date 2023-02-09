import React from "react";
import Box from "../components/Box";
import AddDiscount from "../components/discounts/AddDiscount";
import Discounts from "../components/discounts/Discounts";
import Heading from "../components/Heading";

const DiscountPage = () => {
  return (
    <>
      <div>
        <Heading heading={"Giảm giá"}></Heading>
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
