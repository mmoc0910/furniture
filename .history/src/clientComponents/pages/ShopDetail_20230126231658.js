import React from "react";
import { AiOutlineRight } from "react-icons/ai";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BsCartPlus } from "react-icons/bs";
import Breadcrumb from "../components/Breadcrumb";
import { Button } from "../components/forms";
import InputNumber from "../components/products/shop/InputNumber";
import RateStar from "../components/RateStar";
import ShopDetailPictrure from "../components/ShopDetailPictrure";
import ProductItem from "../components/products/ProductItem";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import { useDispatch, useSelector } from "react-redux";
import { dateFormat, fomatNumberMoney } from "../../helpers/function";
import parse from "html-react-parser";
import { v4 as uuidv4 } from "uuid";
import { getProductDetail } from "../../adminComponents/sagas/products/productSlice";
import "react-toastify/dist/ReactToastify.css";
import SelectColorItem from "../components/products/shop/SelectColorItem";
import { auth, db } from "../../firebase/firebase-config";
import {
  addDoc,
  collection,
  doc,
  getCountFromServer,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import dayjs from "dayjs";
import swal from "sweetalert";

const ShopDetail = ({ priviewMode = false }) => {
  const navigate = useNavigate();
  const { product } = useSelector((state) => state.product);
  const formRef = React.useRef();
  const dispatch = useDispatch();
  const [cartItem, setCartItem] = React.useState({
    productId: "",
    qty: 1,
    properties: {},
  });
  const [err, setErr] = React.useState({});
  const [state, setState] = React.useState(0);
  const [totalStar, setTotalStar] = React.useState(0);
  const { slug } = useParams();
  React.useEffect(() => {
    window.scroll(0, 0);
    dispatch(getProductDetail(slug));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  React.useEffect(() => {
    if (product?.rates.length > 0) {
      let num = 0;
      product.rates.forEach((item) => (num += item.star));
      num = num / product.rates.length;
      setTotalStar(num);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);
  React.useEffect(() => {
    setCartItem((prev) => ({ productId: product.id, qty: 1, properties: {} }));
    Object.keys(product?.properties).length > 0 &&
      Object.keys(product?.properties).forEach((property) => {
        if (product?.properties[property].length > 0) {
          if (property === "color") {
            setCartItem((prev) => ({
              ...prev,
              properties: {
                ...prev.properties,
                color: {
                  colorName: "",
                  colorValue: "",
                },
              },
            }));
            setErr((prev) => ({ ...prev, color: false }));
            // setBlur((pre) => ({ ...pre, color: false }));
          } else {
            setCartItem((prev) => ({
              ...prev,
              properties: {
                ...prev.properties,
                [property]: "",
              },
            }));
            setErr((prev) => ({ ...prev, [property]: false }));
            // setBlur((pre) => ({ ...pre, [property]: false }));
          }
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, product?.properties]);
  const checkError = () => {
    Object.keys(cartItem.properties).forEach((prop) => {
      if (prop === "color") {
        if (!cartItem.properties[prop].colorName) {
          setErr((prev) => ({ ...prev, [prop]: true }));
        } else {
          const errcp = { ...err };
          delete errcp[prop];
          setErr(() => errcp);
        }
      } else {
        if (!cartItem.properties[prop]) {
          setErr((prev) => ({ ...prev, [prop]: true }));
        } else {
          const errcp = { ...err };
          delete errcp[prop];
          setErr(() => errcp);
        }
      }
    });
  };
  return (
    <>
      <Breadcrumb pageName="" bgColor="white" color="black" bgImg={false}>
        <Link to="/">Shop</Link>
        <span>
          <AiOutlineRight size={"0.75rem"}></AiOutlineRight>
        </span>
        <Link>{product.categoryName || "Category name"} </Link>
        <span>
          <AiOutlineRight size={"0.75rem"}></AiOutlineRight>
        </span>
        <p className="text-[#b7b7b7]">Product Details</p>
      </Breadcrumb>
      <div className="container grid grid-cols-1 gap-10 pb-24 select-none lg:grid-cols-2">
        <div className="col-span-1">
          <ShopDetailPictrure></ShopDetailPictrure>
        </div>
        <div className="col-span-1">
          {product.productName ? (
            <h2
              className="mb-2 text-2xl font-bold capitalize line-clamp-2"
              title={product.productName}
            >
              {product.productName}
            </h2>
          ) : (
            <div className="w-full mb-2 rounded-sm bg-[#d7d7d6] h-8"></div>
          )}

          <div className="flex flex-wrap items-stretch gap-y-2">
            <div className="flex pr-5 border-r-2 border-black border-solid items-cente">
              <span className="mr-1 font-semibold text-[#e53637] decoration-1 underline underline-offset-4 decoration-solid decoration-[#e53637]">
                {String(totalStar).length === 1 ? `${totalStar}.0` : totalStar}
              </span>
              <RateStar rateStar={totalStar}></RateStar>
            </div>
            <p className="px-5 mr-5 border-r-2 border-black border-solid">
              <span className="font-bold">{product.rates.length}</span> đánh giá
            </p>
            <p className="">
              <span className="font-bold">{product.sellNumber || 0}</span> đã
              bán
            </p>
          </div>
          {product.tag && product.tag.length > 0 && (
            <div className="flex mt-1 text-sm font-semibold item-center">
              {product.tag.map((item) => (
                <p
                  className="hover:underline decoration-black decoration before:content-['#'] before:font-extrabold"
                  key={uuidv4()}
                >
                  {item.tagName}
                </p>
              ))}
            </div>
          )}

          <div className="pl-5 mt-6">
            <div className="flex flex-wrap items-end gap-2 gap-y-2 mb-7">
              {!priviewMode && product.discountPrice ? (
                <p className="text-xl line-through first-letter:text-lg decoration-1 decoration-black ">
                  {fomatNumberMoney(product.price)}
                </p>
              ) : (
                ""
              )}
              {product.price ? (
                <p className="text-3xl font-bold first-letter:text-xl">
                  {product.discountPrice
                    ? fomatNumberMoney(product.discountPrice)
                    : fomatNumberMoney(product.price)}
                </p>
              ) : (
                <div className="w-32 h-9 bg-[#d7d7d6] rounded-sm"></div>
              )}
              {!priviewMode && product.discountPrice && (
                <p className="-translate-y-2 rounded-sm uppercase text-sm ml-4 inline-block px-2 bg-[#e53637] text-white font-bold">
                  {(
                    ((product.price - product.discountPrice) * 100) /
                    product.price
                  ).toFixed(2)}
                  {"% "}
                  giảm
                </p>
              )}
            </div>

            {product.productDesc ? (
              <p className="mb-10 line-clamp-5" title={product.productDesc}>
                {product.productDesc}
              </p>
            ) : (
              <div className="w-full space-y-1">
                <div className="w-full h-4 rounded-sm bg-[#d7d7d6]"></div>
                <div className="w-full h-4 rounded-sm bg-[#d7d7d6]"></div>
                <div className="w-full h-4 rounded-sm bg-[#d7d7d6]"></div>
              </div>
            )}
            <form ref={formRef}>
              <div className="mb-5">
                {product.properties.color.length > 0 && (
                  <div className="flex items-center">
                    <p className="mr-5 font-bold">Màu Sắc: </p>
                    <div className="flex items-center gap-4">
                      {product.properties.color.map((item) => (
                        <SelectColorItem
                          size="1.5rem"
                          key={uuidv4()}
                          color={item.colorValue}
                          colorName={item.colorName}
                          id={item.id}
                          defaultChecked={
                            cartItem?.properties?.color?.colorValue ===
                              item.colorValue && true
                          }
                          onChange={(e) => {
                            const errcp = { ...err };
                            delete errcp.color;
                            setErr(() => errcp);
                            setCartItem((prev) => ({
                              ...prev,
                              properties: {
                                ...prev.properties,
                                color: {
                                  colorName:
                                    e.target.getAttribute("data-color"),
                                  colorValue: e.target.value,
                                },
                              },
                            }));
                          }}
                        ></SelectColorItem>
                      ))}
                    </div>
                  </div>
                )}
                {err?.color && (
                  <span className="block text-[#ed7976] pt-1">
                    Bạn chưa chọn màu sắc
                  </span>
                )}
              </div>

              {Object.keys(product.properties).length > 0 &&
                Object.keys(product.properties).map(
                  (name) =>
                    product.properties[name].length > 0 &&
                    name !== "color" && (
                      <div className="mb-5" key={uuidv4()}>
                        <div className="flex items-center">
                          <p className="self-start mr-5 font-bold whitespace-nowrap">
                            {name}:
                          </p>
                          <div className="flex flex-wrap gap-3 item-center">
                            {product.properties[name].map((item) => (
                              <div key={uuidv4()}>
                                <input
                                  type="radio"
                                  name={name}
                                  id={item}
                                  value={item}
                                  defaultChecked={
                                    cartItem?.properties?.[name] === item &&
                                    true
                                  }
                                  onChange={(e) => {
                                    const errcp = { ...err };
                                    delete errcp[name];
                                    setErr(() => errcp);
                                    setCartItem((prev) => ({
                                      ...prev,
                                      properties: {
                                        ...prev.properties,
                                        [name]: e.target.value,
                                      },
                                    }));
                                  }}
                                  className="hidden peer"
                                />
                                <label
                                  htmlFor={item}
                                  className="bg-[#eaeaf1] rounded-lg px-2 py-1 border border-transparent transition-all duration-200 peer-checked:border-[#3ea07f] cursor-pointer whitespace-nowrap"
                                >
                                  {item}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                        {err[name] && (
                          <span className="block text-[#ed7976] pt-1">{`Bạn chưa chọn ${name}`}</span>
                        )}
                      </div>
                    )
                )}
              <div className="">
                <div className="flex items-center">
                  <p className="mr-5 font-bold">Số lượng: </p>
                  <InputNumber
                    qty={cartItem.qty}
                    handleReduced={() => {
                      if (cartItem.qty > 1) {
                        setCartItem((prev) => ({ ...prev, qty: prev.qty - 1 }));
                      }
                    }}
                    handleIncrease={() => {
                      if (cartItem.qty < product.amount - product.sellNumber) {
                        setCartItem((prev) => ({ ...prev, qty: prev.qty + 1 }));
                      } else {
                        swal("Không đủ số lượng hàng để cung cấp", "");
                      }
                    }}
                  ></InputNumber>
                </div>
              </div>
            </form>

            <div className="flex flex-wrap items-stretch gap-5 mt-10">
              <Button
                className="flex items-center gap-2 bg-[#ed1c2499] px-4 py-3"
                onClick={async (e) => {
                  e.preventDefault();
                  if (auth.currentUser) {
                    checkError();
                    if (Object.keys(err).length === 0) {
                      const colRef = collection(db, "carts");
                      const q = query(
                        colRef,
                        where("productId", "==", cartItem.productId),
                        where("properties", "==", cartItem.properties)
                      );
                      const snapshot = await getCountFromServer(q);
                      if (snapshot.data().count === 1) {
                        swal("Sản phẩm đã tồn tại trong giỏ hàng", "");
                      } else {
                        await addDoc(collection(db, "carts"), {
                          ...cartItem,
                          userId: auth.currentUser.uid,
                          createdAt: dayjs().unix(),
                        });
                        swal("Đã thêm sản phẩm vào giỏ hàng", "");
                      }
                    }
                  } else {
                    navigate("/signup");
                  }
                }}
              >
                <span>
                  <BsCartPlus size={"1.2rem"} color="white"></BsCartPlus>
                </span>
                <p className="font-bold text-white uppercase disabled:bg-black">
                  Thêm vào giỏ hàng
                </p>
              </Button>
              <Button className="px-4 py-2 font-bold text-white uppercase bg-black">
                Mua ngay
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="container mb-24">
        <div className="flex items-center justify-center gap-x-10 font-bold text-[#b7b7b7] text-xl border-b border-solid border-[#e4e4e4]">
          <div
            className={`pb-5 relative cursor-pointer ${
              state === 0
                ? "text-black after:absolute after:w-full after:h-[2px] after:bg-[#e53637] after:bottom-0 after:left-0 after:rounded-full after:translate-y-1/2"
                : ""
            }`}
            onClick={() => setState(0)}
          >
            Mô tả chi tiết
          </div>
          <div
            className={`pb-5 relative cursor-pointer ${
              state === 1
                ? "text-black after:absolute after:w-full after:h-[2px] after:bg-[#e53637] after:bottom-0 after:left-0 after:rounded-full after:translate-y-1/2"
                : ""
            }`}
            onClick={() => setState(1)}
          >
            Đánh giá(
            {product.rates.length})
          </div>
        </div>
        <div className="relative mt-14">
          {state === 0 && (
            <div className="max-w-[90%] mx-auto">
              {parse(product.detailedOverview)}
            </div>
          )}
          {state === 1 && (
            <div className="space-y-10">
              {product.rates.map((rate) => (
                <ReviewItem rate={rate} key={uuidv4()} />
              ))}
            </div>
          )}
        </div>
      </div>
      <RelatedProducts priviewMode={priviewMode} productId={product.id} />
    </>
  );
};

const ReviewItem = ({ rate }) => {
  const [user, setUser] = React.useState({});
  React.useEffect(() => {
    onSnapshot(doc(db, "users", rate.uid), (doc) => {
      setUser(doc.data());
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="flex gap-4">
      {user?.photoURL ? (
        <img
          src={user?.photoURL}
          alt=""
          className="rounded-full w-11 h-11 grow-0 shrink-0"
        />
      ) : (
        <div className="flex items-center justify-center w-11 h-11 overflow-hidden bg-black rounded-full uppercase font-extrabold text-2xl leading-none text-[#e53637] grow-0 shrink-0">
          {user.displayName?.split("")[0]}
        </div>
      )}

      <div className="">
        <p className="font-semibold">{user?.displayName}</p>
        <div className="flex items-center mb-2">
          {[1, 2, 3, 4, 5].map((item) =>
            item <= rate.star ? (
              <span key={item}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#f3be00"
                  className="w-4 h-4 cursor-pointer"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            ) : (
              <span key={item}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#f3be00"
                  className="w-4 h-4 cursor-pointer"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                  />
                </svg>
              </span>
            )
          )}
        </div>
        <div className="text-[#797977] text-sm flex items-center gap-1">
          <p>{dateFormat(rate.createdAt, "DD-MM-YYYY HH:mm")}</p>

          {Object.keys(rate.properties).length > 0 && (
            <>
              <div>|</div>
              <div className="flex items-center">
                {rate.properties?.color && (
                  <p>{rate.properties?.color.colorName}</p>
                )}
                {Object.keys(rate.properties).map(
                  (property) =>
                    property !== "color" && (
                      <p key={uuidv4()}>, {rate.properties[property]}</p>
                    )
                )}
              </div>
            </>
          )}
        </div>
        <p>{rate?.review}</p>
      </div>
    </div>
  );
};

const RelatedProducts = ({ priviewMode, productId }) => {
  const navigationPrevRef = React.useRef(null);
  const navigationNextRef = React.useRef(null);
  return (
    <>
      {!priviewMode && (
        <div className="container mb-20">
          <h2 className="text-3xl font-bold text-center mb-14">
            Related Product
          </h2>
          <div className="relative w-full">
            <div
              ref={navigationPrevRef}
              className="absolute left-0 z-20 text-black cursor-pointer -top-12"
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-10 h-10"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                  />
                </svg>
              </span>
            </div>
            <div
              ref={navigationNextRef}
              className="absolute right-0 z-20 text-black cursor-pointer -top-12"
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-10 h-10"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                  />
                </svg>
              </span>
            </div>
            <Swiper
              slidesPerView={1}
              spaceBetween={30}
              grabCursor={true}
              navigation={{
                nextEl: navigationNextRef.current,
                prevEl: navigationPrevRef.current,
              }}
              onSwiper={(swiper) => {
                // Delay execution for the refs to be defined
                setTimeout(() => {
                  // Override prevEl & nextEl now that refs are defined
                  swiper.params.navigation.prevEl = navigationPrevRef.current;
                  swiper.params.navigation.nextEl = navigationNextRef.current;

                  // Re-init navigation
                  swiper.navigation.destroy();
                  swiper.navigation.init();
                  swiper.navigation.update();
                });
              }}
              modules={[Navigation]}
              breakpoints={{
                767: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
                992: {
                  slidesPerView: 4,
                  spaceBetween: 30,
                },
              }}
              className="relatedProductSwiper"
            >
              <SwiperSlide>{/* <ProductItem></ProductItem> */}</SwiperSlide>
            </Swiper>
          </div>
        </div>
      )}
    </>
  );
};

export default ShopDetail;
