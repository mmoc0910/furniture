import dayjs from "dayjs";
import React from "react";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Button } from "../forms";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../../firebase/firebase-config";
import { Link } from "react-router-dom";
import { fomatNumberMoney } from "../../../helpers/function";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import swal from "sweetalert";
const schema = yup
  .object({
    discountName: yup
      .string()
      .required("Tên chương trình giảm giá không được để trống."),
    timeStart: yup.string().required("Thời gian bắt đầu không được để trống."),
    timeEnd: yup.string().required("Thời gian kết thúc không được để trống."),
    discountPrice: yup.string().required("Giá giảm không được để trống."),
    productId: yup.string().required("Bạn chưa chọn sản phẩm áp dụng"),
  })
  .required();

const AddDiscount = () => {
  const [show, setShow] = React.useState(false);
  const [products, setProducts] = React.useState([]);
  const [product, setProduct] = React.useState("");
  const {
    handleSubmit,
    control,
    register,
    setValue,
    setError,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      discountName: "",
      timeStart: dayjs().unix(),
      timeEnd: dayjs().unix(),
      discountPrice: "",
      productId: "",
    },
    resolver: yupResolver(schema),
  });
  console.log(errors);
  const timeStart = useWatch({ control, name: "timeStart" });
  const timeEnd = useWatch({ control, name: "timeEnd" });
  const discountPrice = useWatch({ control, name: "discountPrice" });
  React.useEffect(() => {
    if (discountPrice && product) {
      if (discountPrice >= product.price) {
        console.log("ok");
        setError("discountPrice", {
          type: "custom",
          message: "Giá giảm giá không được cao hơn giá gốc",
        });
      }
    }
  }, [discountPrice, product, setError]);
  React.useEffect(() => {
    const colRef = collection(db, "products");
    const q = query(
      colRef,
      orderBy("createdAt", "desc"),
      where("isDeleted", "==", false)
    );
    onSnapshot(q, (snapshot) => {
      let data = [];
      snapshot.docs.forEach((doc, index) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      setProducts(data);
    });
  }, []);
  const onSubmit = async (value) => {
    if (value.discountPrice >= product.price) {
      setError("discountPrice", {
        type: "custom",
        message: "Giá giảm giá không được cao hơn giá gốc",
      });
    } else if (timeEnd <= timeStart) {
      setError("timeEnd", {
        type: "custom",
        message: "Thời gian kết thúc phải lớn hơn thời gian bắt đầu",
      });
    } else {
      try {
        await addDoc(collection(db, "discounts"), {
          ...value,
          createdAt: dayjs().unix(),
          status: 1,
        });
        swal("Tạo chương trình giảm giá thành công", "");
        reset({
          discountName: "",
          timeStart: dayjs().unix(),
          timeEnd: dayjs().unix(),
          discountPrice: "",
          productId: "",
        });
        setProduct({});
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
      <h3 className="text-xl font-bold mb-7">Tạo Chương trình giảm giá</h3>
      <form className="flex flex-col gap-7" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-3">
          <label htmlFor="discount_name" className="text-lg font-semibold">
            Tên chương trình giảm giá
          </label>
          <div className="flex flex-col">
            <input
              autoComplete="off"
              type="text"
              {...register("discountName")}
              id="discount_name"
              className="px-3 py-2 border border-black rounded-lg"
            />
            {errors?.discountName?.message && (
              <span className="text-[#ed7976]">
                {errors.discountName.message}
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="" className="text-lg font-semibold">
            Thời gian sử dụng
          </label>
          <div className="flex flex-col gap-5">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                renderInput={(params) => <TextField {...params} />}
                label="Thời gian bắt đầu"
                value={dayjs(timeStart * 1000)}
                onChange={(value) => setValue("timeStart", dayjs(value).unix())}
                minDateTime={dayjs()}
              />
              <DateTimePicker
                renderInput={(params) => <TextField {...params} />}
                label="Thời gian bắt đầu"
                value={dayjs(timeEnd * 1000)}
                onChange={(value) => setValue("timeEnd", dayjs(value).unix())}
                minDateTime={dayjs()}
              />
              {errors?.timeEnd?.message && (
                <span className="text-[#ed7976]">{errors.timeEnd.message}</span>
              )}
            </LocalizationProvider>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="discount_price" className="text-lg font-semibold">
            Giá giảm
          </label>
          <div className="flex flex-col">
            <input
              type="number"
              {...register("discountPrice")}
              id="discount_price"
              className="px-3 py-2 border border-black rounded-lg"
            />
            {errors?.discountPrice?.message && (
              <span className="text-[#ed7976]">
                {errors.discountPrice.message}
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center justify-between">
            <label htmlFor="" className="text-lg font-semibold">
              Sản phẩm áp dụng
            </label>
            <span className="cursor-pointer" onClick={() => setShow(true)}>
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
          {Object.keys(product).length > 0 && (
            <div className="flex gap-5 pt-5">
              <img
                src={product?.images?.[0]}
                alt={product?.productName}
                className="w-24 rounded-lg h-28 grow-0 shrink-0"
              />
              <div className="flex flex-col justify-center gap-3 text-lg font-medium">
                <p title={product?.productName} className="line-clamp-2">
                  {product?.productName}
                </p>
                <p>{product?.price && fomatNumberMoney(product?.price)}</p>
              </div>
            </div>
          )}

          {errors?.productId?.message && (
            <span className="text-[#ed7976]">{errors.productId.message}</span>
          )}
        </div>

        <Button
          className="px-5 py-2 rounded-lg bg-[#4c7993] text-white"
          type="submit"
        >
          Hoàn thành
        </Button>
      </form>
      {show && (
        <div className="fixed inset-0 bg-[#16191b3e] z-10 flex items-center justify-center">
          <div
            className="absolute inset-0 z-20 bg-transparent cursor-not-allowed"
            onClick={() => setShow(false)}
          ></div>
          <div className="relative z-30 p-10 bg-white rounded-lg w-[75%] max-h-[85%] overflow-y-auto scroll-hidden">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold capitalize">Chọn sản phẩm</h3>
              <Button
                className="px-5 py-2 rounded-lg bg-[#4c7993] text-white max-w-max"
                type="submit"
                onClick={() => setShow(false)}
              >
                Xác nhận
              </Button>
            </div>

            <table className="w-full text-lg ">
              <thead>
                <tr>
                  <th className="px-3 py-2 text-left">Sản phẩm</th>
                  <th className="px-3 py-2">Giá</th>
                  <th className="px-3 py-2 whitespace-nowrap ">Số lượng</th>
                </tr>
              </thead>
              <tbody className="font-medium ">
                {products &&
                  products.map((item) => (
                    <tr
                      key={item.id}
                      className="cursor-pointer group"
                      onClick={() => {
                        setProduct(item);
                        setValue("productId", item.id);
                      }}
                    >
                      <td
                        className={`px-3 py-2 my-2 align-middle group-hover:bg-[#f0f6f9] transition-all duration-200 rounded-tl-lg rounded-bl-lg ${
                          item.id === product.id && "bg-[#f0f6f9]"
                        }`}
                      >
                        <div className="flex items-center gap-5">
                          <img
                            src={item.images[0]}
                            alt={item.productName}
                            className="w-20 h-20 rounded-lg shrink-0 grow-0"
                          />
                          <Link
                            to={`../../shop/${item.slug}`}
                            target="_blank"
                            className="line-clamp-1"
                            title={item.productName}
                          >
                            {item.productName}
                          </Link>
                        </div>
                      </td>
                      <td
                        className={`px-3 py-2 text-center align-middle group-hover:bg-[#f0f6f9] transition-all duration-200 ${
                          item.id === product.id && "bg-[#f0f6f9]"
                        }`}
                      >
                        {fomatNumberMoney(item.price)}
                      </td>
                      <td
                        className={`px-3 py-2 text-center align-middle group-hover:bg-[#f0f6f9] transition-all duration-200 rounded-tr-lg rounded-br-lg ${
                          item.id === product.id && "bg-[#f0f6f9]"
                        }`}
                      >
                        {item.amount}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default AddDiscount;
