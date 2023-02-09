import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import ReactTooltip from "react-tooltip";
import DropDown from "../components/checkout/DropDown";
import InputCheckout from "../components/checkout/InputCheckout";
import { Button } from "../components/forms";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "../../firebase/firebase-config";
import { setUser } from "../../adminComponents/sagas/user/userSlice";
import { onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { infoShip } from "../../helpers/shipping";
import SelectColorItem from "../components/products/shop/SelectColorItem";
import { fomatNumberMoney, handleCheckout } from "../../helpers/function";
import OrderItem from "../components/orders/OrderItem";
import { uuidv4 } from "@firebase/util";

const schema = yup
  .object({
    displayName: yup.string().required("Không được để trống"),
  })
  .required();
const ProfilePage = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [show, setShow] = React.useState(false);
  return (
    <>
      <div className="container pb-20 pt-14">
        <h2 className="mb-5 text-2xl font-bold">Thông tin</h2>
        <div className="flex flex-col gap-3 font-semibold">
          <div className="flex gap-2">
            <p className="font-bold">Tên:</p>
            <p>{user.displayName}</p>
            <span
              data-tip={"Đăng xuất"}
              className={"text-[#75b8ed] cursor-pointer"}
              onClick={async () => {
                await signOut(auth);
                navigate("../signin");
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                />
              </svg>
            </span>
            <span
              data-tip={"Chỉnh sửa"}
              className={"text-[#75b8ed] cursor-pointer"}
              onClick={() => setShow(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
            </span>
          </div>
          {user?.phone && user?.phone && (
            <div className="flex gap-2">
              <p className="font-bold">Số điện thoại:</p>
              <p>{user.phone}</p>
            </div>
          )}

          <div className="flex gap-2">
            <p className="font-bold">Email:</p>
            <p>{user.email}</p>
          </div>
          {user?.address && (
            <div className="flex gap-2">
              <p className="font-bold">Địa chỉ:</p>
              <p>
                {user.to_addresssss ? user.to_addresssss + ", " : ""}{" "}
                {user.address.ward.to_ward_name
                  ? user.address.ward.to_ward_name + ", "
                  : ""}
                {user.address.district.to_district_name
                  ? user.address.district.to_district_name + ", "
                  : ""}
                {user.address.province.to_province_name
                  ? user.address.province.to_province_name + ". "
                  : ""}
              </p>
            </div>
          )}
        </div>
        <Order />
      </div>
      {show && <ModalEdit setShow={setShow} user={user} />}
      <ReactTooltip
        padding="7px 15px"
        delayShow={100}
        effect="solid"
        place="top"
      />
    </>
  );
};

const order_status = [
  { status: "Tất cả", value: "all" },
  { status: "Chờ xác nhân", value: "wait" },
  { status: "Đang giao", value: "delivering" },
  { status: "Hoàn thành", value: "finish" },
  { status: "Đã hủy", value: "cancel" },
];

const Order = () => {
  const [orders, setOrders] = React.useState([]);
  const [state, setState] = React.useState(0);
  const [orderStatus, setOrderStatus] = React.useState(order_status[0].value);
  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        const colRef = collection(db, "orders");
        const q = query(
          colRef,
          orderBy("createdAt", "desc"),
          where("userId", "==", uid)
        );
        onSnapshot(q, (snapshot) => {
          let data = [];
          snapshot.docs.forEach(async (doc, index) => {
            data.push({
              id: doc.id,
              ...doc.data(),
            });
          });
          setOrders(data);
        });
      }
    });
  }, []);

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-7">Đơn hàng</h2>
      <div className={`grid grid-cols-5 gap-3 relative `}>
        <div
          className={` absolute h-[2px] bg-[#e53637] bottom-0 left-0 transition-all duration-300 w-[calc(100%/5)]`}
          style={{ transform: `translateX(${100 * state}%)` }}
        ></div>
        {order_status.map((item, index) => (
          <div
            key={index}
            className={`text-lg font-semibold cursor-pointer pb-2 text-center select-none`}
            onClick={() => {
              setState(index);
              setOrderStatus(item.value);
            }}
          >
            {item.status}
          </div>
        ))}
      </div>
      <div className="py-7">
        <div className="flex flex-col gap-3">
          {orders.map((order) => (
            <OrderItem key={uuidv4()} order={order} orderStatus={orderStatus} />
          ))}
        </div>
      </div>
    </div>
  );
};

const ModalEdit = ({ setShow, user }) => {
  const dispatch = useDispatch();
  const [provinces, setProvinces] = React.useState([]);
  const [districts, setDistricts] = React.useState([]);
  const [wards, setWards] = React.useState([]);
  const [province, setProvince] = React.useState(user?.address?.province || {});
  const [district, setDistrict] = React.useState(user?.address?.district || {});
  const [ward, setWard] = React.useState(user?.address?.ward || {});
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
  });
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
          setDistricts(district.data.data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    getDistrict();
  }, [province?.to_province_id]);
  React.useEffect(() => {
    const getWard = async () => {
      if (district?.to_district_id) {
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
          setWards(ward.data.data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    getWard();
  }, [district?.to_district_id]);
  const onSubmit = async (value) => {
    if (isValid) {
      const data = {
        ...value,
        address: {
          province,
          district,
          ward,
        },
      };
      console.log(data);
      try {
        await updateProfile(auth.currentUser, {
          displayName: value.displayName,
        });
        await setDoc(doc(db, "users", auth.currentUser.uid), data);
        dispatch(setUser(data));
        setShow(false);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="fixed inset-0 bg-[#16191b53] z-10 flex items-center justify-center">
      <div
        className="absolute z-20 w-full h-full bg-transparent cursor-not-allowed"
        onClick={() => setShow(false)}
      ></div>
      <div className="rounded-lg bg-white w-[60%] z-30 p-10 pb-16">
        <h1 className="mb-5 text-2xl font-bold">Thay đổi thông tin</h1>
        <form
          className="grid grid-cols-3 gap-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="col-span-1">
            <label htmlFor="displayName" className="text-lg font-semibold">
              Tên
            </label>
            <InputCheckout
              control={control}
              name="displayName"
              defaultValue={user.displayName}
            ></InputCheckout>
            {errors?.displayName?.message && (
              <span className="text-sm text-[#d52f42]">
                {errors.displayName.message}
              </span>
            )}
          </div>

          <div className="col-span-1">
            <label htmlFor="phone" className="text-lg font-semibold">
              Số điện thoại
            </label>
            <InputCheckout
              control={control}
              name="phone"
              defaultValue={user.phone}
            ></InputCheckout>
          </div>
          <div className="col-span-1">
            <label htmlFor="email" className="text-lg font-semibold">
              Email
            </label>
            <InputCheckout
              control={control}
              name="email"
              disabled={true}
              defaultValue={user.email}
            ></InputCheckout>
          </div>
          <div className="col-span-1">
            <label htmlFor="to_address" className="text-lg font-semibold">
              Địa chỉ
            </label>
            <InputCheckout
              control={control}
              name="to_address"
              defaultValue={user.to_address}
            ></InputCheckout>
          </div>
          <div className="flex flex-col col-span-1 gap-2">
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
                        setProvince({
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
          </div>
          <div className="flex flex-col col-span-1 gap-2">
            <DropDown label={"Quận/Huyện"} value={district?.to_district_name}>
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
                        setDistrict({
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
          <div className="flex flex-col col-span-1 gap-2">
            <div className="flex flex-col gap-2">
              <DropDown label={"Phường/Xã"} value={ward?.to_ward_name}>
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
                          setWard({
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
            </div>
          </div>
          <div className="flex items-end col-span-1">
            <Button
              type="submit"
              className="rounded-lg bg-[#afbdff] text-white px-3 py-2 capitalize font-semibold"
            >
              Lưu thay đổi
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
