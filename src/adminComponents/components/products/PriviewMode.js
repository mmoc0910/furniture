import React from "react";
import Box from "../Box";
import PriviewModeModal from "./PriviewModeModal";

const PriviewMode = () => {
  const [show, setShow] = React.useState(false);
  return (
    <>
      <Box>
        <div className="flex flex-col gap-5">
          <h3 className="text-2xl font-bold">Chế độ xem trước</h3>
          <p className="text-[#8e8d8c] line-clamp-2">
            Bạn có thể xem cách khách hàng của bạn sẽ nhìn thấy trang sản phẩm
          </p>
          <button
            className="w-full py-3 bg-[#eaeaf1] rounded-lg font-bold"
            onClick={() => setShow(true)}
          >
            Xem trước
          </button>
        </div>
      </Box>
      {show && (
        <PriviewModeModal onClick={() => setShow(false)}></PriviewModeModal>
      )}
    </>
  );
};

export default PriviewMode;
