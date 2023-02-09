import dayjs from "dayjs";

const fomatNumberMoney = (price) => {
  return `đ${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
};
const dateFormat = (date) => {
  return dayjs(date * 1000).format("DD/MM/YYYY");
};

const handleCheckout = (carts) => {
  let totalproduct = 0;
  let totalPrice = 0;
  let totalDiscount = 0;
  let totalHeight = 0;
  let totalWidth = 0;
  let totalLong = 0;
  let totalWeight = 0;
  carts?.forEach((item) => {
    totalproduct += item.qty;
    item.productInfo.discountPrice
      ? (totalPrice += item.productInfo.discountPrice * item.qty)
      : (totalPrice += item.productInfo.price * item.qty);
    item.productInfo.discountPrice
      ? (totalDiscount +=
          (item.productInfo.price - item.productInfo.discountPrice) * item.qty)
      : (totalDiscount += 0);
    totalHeight < item.productInfo.transpostInfo.height &&
      (totalHeight = item.productInfo.transpostInfo.height);
    totalWidth < item.productInfo.transpostInfo.width &&
      (totalWidth = item.productInfo.transpostInfo.width);
    totalLong += item.productInfo.transpostInfo.longs * item.qty;
    totalWeight += item.productInfo.transpostInfo.weight * item.qty;
  });
  return {
    totalproduct,
    totalPrice,
    totalDiscount,
    totalWidth,
    totalWeight,
    totalHeight,
    totalLong,
  };
};
export { fomatNumberMoney, dateFormat, handleCheckout };
