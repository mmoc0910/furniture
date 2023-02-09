import React from "react";
import { AiOutlineRight } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import axios from "axios";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/firebase-config";
import { useDispatch, useSelector } from "react-redux";
import SelectColorItem from "../components/products/shop/SelectColorItem";
import Button from "../components/forms/Button";
import { v4 as uuidv4 } from "uuid";
import { fomatNumberMoney, handleCheckout } from "../../helpers/function";
import DropDown from "../components/checkout/DropDown";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputCheckout from "../components/checkout/InputCheckout";
import { addOrder } from "../../adminComponents/sagas/checkout/checkOutSLice";
import dayjs from "dayjs";
import { infoShip } from "../../helpers/shipping";
import swal from "sweetalert";

const CheckOut = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [listProducts, setListProducts] = React.useState([]);
  const [provinces, setProvinces] = React.useState([]);
  const [districts, setDistricts] = React.useState([]);
  const [wards, setWards] = React.useState([]);
  const [fee, setFee] = React.useState(0);
  const { checkoutCarts } = useSelector((state) => state.checkout);
  const schema = yup
    .object({
      to_name: yup.string().required("Tên người dùng không được để trống."),
      to_phone: yup
        .string()
        .required("Số điện thoại không được để trống.")
        .matches(
          /^(0|84)(2(0[3-9]|1[0-6|8|9]|2[0-2|5-9]|3[2-9]|4[0-9]|5[1|2|4-9]|6[0-3|9]|7[0-7]|8[0-9]|9[0-4|6|7|9])|3[2-9]|5[5|6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])([0-9]{7})$/,
          "Số điện thoại không đúng."
        ),
      to_address: yup.string().required("Địa chỉ không được để trống."),
      province: yup
        .object({
          to_province_name: yup
            .string()
            .required("Bạn chưa chọn Tỉnh/Thành phố"),
          to_province_id: yup.string().required("Bạn chưa chọn Tỉnh/Thành phố"),
        })
        .required("Bạn chưa chọn Tỉnh/Thành phố"),
      district: yup
        .object({
          to_district_name: yup.string().required("Bạn chưa chọn Quận/Huyện"),
          to_district_id: yup.string().required("Bạn chưa chọn Quận/Huyện"),
        })
        .required("Bạn chưa chọn Quận/Huyện"),
      ward: yup
        .object({
          to_ward_name: yup.string().required("Bạn chưa chọn Phường/Xã"),
          to_ward_id: yup.string().required("Bạn chưa chọn Phường/Xã"),
        })
        .required("Bạn chưa chọn Phường/Xã"),
    })
    .required();
  const {
    control,
    handleSubmit,
    setValue,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      to_name: auth?.currentUser?.displayName,
      to_phone: user.phone,
      to_address: user.to_address,
      province: {
        to_province_name: user?.address?.province?.to_province_name,
        to_province_id: user?.address?.province?.to_province_id,
      },
      district: {
        to_district_name: user?.address?.district?.to_district_name,
        to_district_id: user?.address?.district?.to_district_id,
      },
      ward: {
        to_ward_name: user?.address?.ward?.to_ward_name,
        to_ward_id: user?.address?.ward?.to_ward_name,
      },
      note_for_shop: "",
    },
  });
  const province = useWatch({ control, name: "province" });
  const district = useWatch({ control, name: "district" });
  const ward = useWatch({ control, name: "ward" });
  React.useEffect(() => {
    let cartscp = [];
    [...checkoutCarts].forEach(async (cart) => {
      const docRef = doc(db, "products", cart.productId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        cartscp.push({ ...cart, productInfo: docSnap.data() });
        setListProducts([...cartscp]);
      } else {
        console.log("No such document!");
      }
    });
  }, [checkoutCarts]);
  React.useEffect(() => {
    const getProvince = async () => {
      try {
        const province = await axios({
          method: "get",
          url: "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province",
          headers: {
            "Content-Type": "application/json",
            Token: "60f7a89a-827f-11ed-b62e-2a5743127145",
          },
        });
        setProvinces(province.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProvince();
  }, []);
  React.useEffect(() => {
    const getDistrict = async () => {
      if (province?.to_province_id) {
        try {
          const district = await axios({
            method: "post",
            url: "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district",
            headers: {
              "Content-Type": "application/json",
              Token: "60f7a89a-827f-11ed-b62e-2a5743127145",
            },
            data: {
              province_id: province.to_province_id,
            },
          });
          // console.log(district);
          setDistricts(district.data.data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    getDistrict();
  }, [province?.to_province_id]);
  // React.useEffect(() => {
  //   const getServices = async () => {
  //     if (district?.to_district_id) {
  //       try {
  //         const service = await axios({
  //           method: "post",
  //           url: "https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/available-services",
  //           headers: {
  //             "Content-Type": "application/json",
  //             Token: "60f7a89a-827f-11ed-b62e-2a5743127145",
  //           },
  //           data: {
  //             shop_id: 121194,
  //             from_district: 1710,
  //             to_district: district?.to_district_id,
  //           },
  //         });
  //         console.log(service);
  //         setService(service);
  //       } catch (error) {}
  //     }
  //   };
  //   getServices();
  // }, [district?.to_district_id]);
  React.useEffect(() => {
    const getWard = async () => {
      if (district?.to_district_id) {
        // console.log(district.to_district_id);
        try {
          const ward = await axios({
            method: "post",
            url: "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward",
            headers: {
              "Content-Type": "application/json",
              Token: "60f7a89a-827f-11ed-b62e-2a5743127145",
            },
            data: {
              district_id: district.to_district_id,
            },
          });
          // console.log(ward);
          setWards(ward.data.data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    getWard();
  }, [district?.to_district_id]);
  React.useEffect(() => {
    const getCalculateFee = async () => {
      if (ward?.to_ward_id && listProducts.length > 0) {
        try {
          const fee = await axios({
            method: "post",
            url: "https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee",
            headers: {
              "Content-Type": "application/json",
              Token: "60f7a89a-827f-11ed-b62e-2a5743127145",
              shopId: 121194,
            },
            data: {
              service_id: null,
              service_type_id: 2,
              to_district_id: Number(district?.to_district_id),
              to_ward_code: ward?.to_ward_id,
              height: Number(handleCheckout(listProducts).totalHeight),
              length: Number(handleCheckout(listProducts).totalLong),
              weight: Number(handleCheckout(listProducts).totalWeight),
              width: Number(handleCheckout(listProducts).totalWidth),
              insurance_value: Number(handleCheckout(listProducts).totalPrice),
              coupon: null,
            },
          });
          // console.log(fee.data.data.total);
          setFee(fee.data.data.total);
        } catch (error) {
          console.log(error);
        }
      }
    };
    getCalculateFee();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ward?.to_ward_id, listProducts]);

  const onSubmit = async (value) => {
    try {
      let items = [];
      listProducts.map((item) =>
        items.push({
          name: item.productInfo.productName,
          quantity: item.qty,
          price: item.productInfo.discountPrice
            ? Number(item.productInfo.discountPrice)
            : Number(item.productInfo.price),
          weight: Number(item.productInfo.transpostInfo.weight),
        })
      );
      // console.log(items);
      const previewOrder = await axios({
        method: "post",
        url: "https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/preview",
        headers: {
          "Content-Type": "application/json",
          ShopId: infoShip.shop_id,
          Token: infoShip.token,
        },
        data: {
          payment_type_id: 2,
          required_note: "CHOXEMHANGKHONGTHU",
          service_type_id: 2,
          service_id: 0,
          to_name: value.to_name,
          to_phone: value.to_phone,
          to_address: value.to_address,
          to_ward_name: value.ward.to_ward_name,
          to_district_name: value.district.to_district_name,
          to_province_name: value.province.to_province_name,
          cod_amount: Number(handleCheckout(listProducts).totalPrice),
          weight: Number(handleCheckout(listProducts).totalWeight),
          length: Number(handleCheckout(listProducts).totalLong),
          width: Number(handleCheckout(listProducts).totalWidth),
          height: Number(handleCheckout(listProducts).totalHeight),
          items,
        },
      });
      // console.log(previewOrder);
      dispatch(
        addOrder({
          userId: auth?.currentUser?.uid,
          transportInfo: value,
          products: listProducts,
          status: 0,
          createdAt: dayjs().unix(),
          updatedAt: null,
          accomplishedAt: null,
          cancellationReason: {
            buyer: "",
            seller: "",
          },
          order_code: "",
          fee,
          expected_delivery_time: previewOrder.data.data.expected_delivery_time,
        })
      );
      navigate("../profile");
    } catch (error) {
      console.log(error);
      swal("Lỗi vận chuyển", `${error.response.data.code_message_value}`);
    }
  };
  return (
    <>
      <Breadcrumb pageName="Thanh toán">
        <Link to="/shop">Sản Phẩm</Link>
        <span>
          <AiOutlineRight size={"0.75rem"}></AiOutlineRight>
        </span>
        <p className="text-[#b7b7b7]">Thanh toán</p>
      </Breadcrumb>
      <form
        className="container grid grid-cols-10 pb-40 pt-14 gap-y-[50px] md:gap-[50px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-full col-span-10 lg:col-span-7">
          <div className="">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-2xl font-bold ">Sản phẩm</h3>
              <Button
                type="submit"
                className="px-2 py-1 font-semibold text-white rounded-lg bg-[#4d7a94] block lg:hidden"
              >
                Mua hàng
              </Button>
            </div>
          </div>
          <div className="md:py-3 font-semibold bg-[#bdcccb47] rounded-lg px-2 md:px-0">
            <div className="grid grid-cols-12 gap-[10px] font-bold py-2 text-lg md:text-xl">
              <div className="col-span-8 md:pl-3 md:col-span-7">
                Tên Sản phẩm
              </div>
              <div className="hidden col-span-1 md:block">SL</div>
              <div className="hidden col-span-2 md:block">Giá</div>
              <div className="col-span-4 md:col-span-2 line-clamp-1">
                Thành tiền
              </div>
            </div>
            {listProducts.map((item) => (
              <div
                className="grid grid-cols-12 gap-[10px] py-2 md:py-3 md:px-0"
                key={uuidv4()}
              >
                <div className="col-span-2 md:px-3">
                  <div className="w-full h-0 pb-[100%] relative">
                    <img
                      src={item.productInfo.images[0]}
                      alt={item.productInfo.productName}
                      className="absolute inset-0 w-full h-full rounded-lg"
                    />
                  </div>
                </div>
                <div className="flex flex-col justify-center col-span-6 gap-1 md:col-span-5">
                  <Link className="md:text-lg line-clamp-1">
                    {item.productInfo.productName}
                  </Link>
                  <div className="flex items-center">
                    {item.properties.color && (
                      <div className="hidden md:block">
                        <SelectColorItem
                          disabled={true}
                          size="1rem"
                          colorName={item.properties.color.colorName}
                          color={item.properties.color.colorValue}
                        ></SelectColorItem>
                      </div>
                    )}
                    {Object.keys(item.properties).map(
                      (prop) =>
                        prop !== "color" && (
                          <p className="" key={uuidv4()}>
                            {item.properties[prop]}
                          </p>
                        )
                    )}
                  </div>
                </div>
                <div className="items-center hidden col-span-1 md:flex">
                  {item.qty}
                </div>
                <div className="items-center hidden col-span-2 md:flex">
                  {item.productInfo.discountPrice
                    ? fomatNumberMoney(item.productInfo.discountPrice)
                    : fomatNumberMoney(item.productInfo.price)}
                </div>
                <div className="flex items-center col-span-4 md:col-span-2">
                  {item.productInfo.discountPrice
                    ? fomatNumberMoney(
                        item.productInfo.discountPrice * item.qty
                      )
                    : fomatNumberMoney(item.productInfo.price * item.qty)}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full col-span-7 md:col-span-5 lg:col-span-3">
          <div className="h-full">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-2xl font-bold">Thanh toán</h3>
              <Button
                type="submit"
                className="px-2 py-1 font-semibold text-white rounded-lg bg-[#4d7a94] hidden lg:block"
              >
                Mua hàng
              </Button>
            </div>

            <div className="py-3 px-3 rounded-lg space-y-3 bg-[#bdcccb47]">
              <div className="flex items-center justify-between font-semibold">
                <p>Đơn hàng:</p>
                <p>
                  {fomatNumberMoney(handleCheckout(listProducts).totalPrice)}
                </p>
              </div>
              <div className="flex items-center justify-between font-semibold">
                <p>Phí vận chuyển:</p> <p>{fomatNumberMoney(fee)}</p>
              </div>
              <div className="text-lg font-bold border-t-2 border-black border-dashed">
                <div className="flex items-center justify-between mt-3">
                  <p>Tổng thanh toán:</p>{" "}
                  <p>
                    {fomatNumberMoney(
                      handleCheckout(listProducts).totalPrice + fee
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-10">
          <h3 className="mb-5 text-2xl font-bold">Thông tin khách hàng</h3>
          <div className="grid grid-cols-6 gap-5 md:gap-10">
            <div className="col-span-3 md:col-span-2 ">
              <InputCheckout
                control={control}
                label=" Tên khách hàng"
                name="to_name"
                // defaultValue={auth?.currentUser?.displayName}
              ></InputCheckout>
              {errors?.to_name?.message && (
                <span className="text-sm text-[#d52f42]">
                  {errors.to_name.message}
                </span>
              )}
            </div>
            <div className="col-span-3 md:col-span-2 ">
              <InputCheckout
                control={control}
                label="Số điện thoại"
                name="to_phone"
                // defaultValue={user.phone}
              ></InputCheckout>
              {errors?.to_phone?.message && (
                <span className="text-sm text-[#d52f42]">
                  {errors.to_phone.message}
                </span>
              )}
            </div>
            <div className="col-span-3 md:col-span-2 ">
              <InputCheckout
                control={control}
                label="Địa chỉ"
                name="to_address"
              ></InputCheckout>
              {errors?.to_address?.message && (
                <span className="text-sm text-[#d52f42]">
                  {errors.to_address.message}
                </span>
              )}
            </div>
            <div className="col-span-3 md:col-span-2">
              <div className="flex flex-col gap-2">
                <DropDown
                  label={"Tỉnh/Thành phố"}
                  value={province?.to_province_name}
                >
                  <div className="w-full h-[130px] overflow-y-scroll scroll-hidden bg-white">
                    {provinces.map((item) => (
                      <div
                        key={item.ProvinceID}
                        className={`px-3 py-1 transition-all duration-100 bg-white hover:font-bold ${
                          province?.to_province_name === item.ProvinceName
                            ? "font-bold border-r-2 border-black"
                            : ""
                        }`}
                        onClick={() => {
                          setValue("province", {
                            to_province_name: item.ProvinceName,
                            to_province_id: item.ProvinceID,
                          });
                        }}
                      >
                        {item.ProvinceName}
                      </div>
                    ))}
                  </div>
                </DropDown>
              </div>
              {errors?.province?.to_province_id?.message && (
                <span className="text-sm text-[#d52f42]">
                  {errors?.province?.to_province_id?.message}
                </span>
              )}
            </div>
            <div className="col-span-3 md:col-span-2">
              <div className="flex flex-col gap-2">
                <DropDown
                  label={"Quận/Huyện"}
                  value={district.to_district_name}
                >
                  {districts?.length > 0 ? (
                    <div className="w-full h-[130px] overflow-y-scroll scroll-hidden">
                      {districts.map((item) => (
                        <div
                          key={item.DistrictID}
                          className={`px-3 py-1 transition-all duration-100 hover:font-bold ${
                            district?.to_district_name === item.DistrictName
                              ? "font-bold border-r-2 border-black"
                              : ""
                          }`}
                          onClick={() => {
                            setValue("district", {
                              to_district_name: item.DistrictName,
                              to_district_id: item.DistrictID,
                            });
                          }}
                        >
                          {item.DistrictName}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center w-full py-1">
                      Chưa chọn Tỉnh/Thành phố
                    </div>
                  )}
                </DropDown>
              </div>
              {errors?.district?.to_district_id?.message && (
                <span className="text-sm text-[#d52f42]">
                  {errors?.district?.to_district_id?.message}
                </span>
              )}
            </div>
            <div className="col-span-3 md:col-span-2">
              <div className="flex flex-col gap-2">
                <DropDown label={"Phường/Xã"} value={ward.to_ward_name}>
                  {wards?.length > 0 ? (
                    <div className="w-full h-[130px] overflow-y-scroll scroll-hidden">
                      {wards.map((item) => (
                        <div
                          key={item.WardCode}
                          className={`px-3 py-1 transition-all duration-100 hover:font-bold ${
                            ward?.to_ward_name === item.WardName
                              ? "font-bold border-r-2 border-black"
                              : ""
                          }`}
                          onClick={() => {
                            setValue("ward", {
                              to_ward_name: item.WardName,
                              to_ward_id: item.WardCode,
                            });
                          }}
                        >
                          {item.WardName}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center w-full py-1">
                      Chưa chọn Quận/Huyện
                    </div>
                  )}
                </DropDown>
              </div>{" "}
              {errors?.ward?.to_ward_id?.message && (
                <span className="text-sm text-[#d52f42]">
                  {errors?.ward?.to_ward_id?.message}
                </span>
              )}
            </div>
            <div className="col-span-6">
              <label
                htmlFor={"note_for_shop"}
                className="text-lg font-semibold"
              >
                Lưu ý cho người bán
              </label>
              <textarea
                {...register("note_for_shop")}
                id="note_for_shop"
                rows="3"
                className="w-full px-3 py-2 border border-black rounded-lg resize-none"
              ></textarea>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default CheckOut;
