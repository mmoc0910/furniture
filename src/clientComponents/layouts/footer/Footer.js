import React from "react";
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import Logo from "../../components/Logo";

const Footer = () => {
  return (
    <div className="footer pt-20 bg-black text-[#b7b7b7]">
      <div className="container grid grid-cols-1 md:grid-cols-12 gap-y-7 gap-x-[30px] pb-20 border-b-[1px] border-solid border-[rgba(255,255,255,0.1)]">
        <div className=" md:col-span-4 lg:col-span-3">
          <Logo className="block mb-8 text-white"></Logo>
          <p className="mb-8">
            Khách hàng là trung tâm của mô hình kinh doanh độc đáo của chúng
            tôi, bao gồm cả thiết kế.
          </p>
        </div>
        <div className="pt-2 md:col-span-4 lg:col-span-3">
          <h2 className="text-base font-bold tracking-[2px] uppercase mb-10">
            Hỗ trợ mua hàng
          </h2>
          <div className="space-y-4">
            <p>Chính sách khách hàng</p>
            <p>Chính sách bảo hành</p>
            <p>Chính sách đổi sản phẩm</p>
            <p>Giao hàng- thanh toán</p>
          </div>
        </div>
        <div className="pt-2 md:col-span-4 lg:col-span-3">
          <h2 className="text-base font-bold tracking-[2px] uppercase mb-10">
            THÔNG TIN LIÊN HỆ
          </h2>
          <div className="space-y-4">
            <div className="flex items-end gap-x-2">
              <AiOutlinePhone size={"1.25rem"}></AiOutlinePhone>
              <span className="leading-none">0123456789</span>
            </div>
            <div className="flex items-end gap-x-2">
              <AiOutlineMail size={"1.25rem"}></AiOutlineMail>
              <span className="leading-none">abc@gmail.com</span>
            </div>
          </div>
        </div>
        <div className="pt-2 md:col-span-4 lg:col-span-3">
          <h2 className="text-base font-bold tracking-[2px] uppercase mb-10">
            panpage
          </h2>
          <div className="w-full h-24 bg-white rounded-sm"></div>
        </div>
      </div>
      <div className="container py-5">
        <p className="text-center">
          Copyright © 2022 2020 All rights reserved | This template is made by{" "}
          <span className="text-[#e53637]">Colorlib</span>
        </p>
      </div>
    </div>
  );
};

export default Footer;
