import { combineReducers } from "@reduxjs/toolkit";
import priviewIamgesSlice from "../sagas/priviewImages/priviewImagesSlice";
import modalSlice from "../sagas/modal/modalSlice";
import categorySlice from "./category/categorySlice";
import tagSlice from "./tag/tagSlice";
import colorSlice from "./color/colorSlice";
import propertySlice from "./property/propertySlice";
import productSlice from "./products/productSlice";
import bannerSlice from "./banner/bannerSlice";
import cartSlice from "./carts/cartSlice";
import checkOutSLice from "./checkout/checkOutSLice";
import discountSlice from "./discounts/discountSlice";
import userSlice from "./user/userSlice";

export const reducer = combineReducers({
  priviewIamges: priviewIamgesSlice,
  modal: modalSlice,
  category: categorySlice,
  tag: tagSlice,
  color: colorSlice,
  property: propertySlice,
  product: productSlice,
  banner: bannerSlice,
  cart: cartSlice,
  checkout: checkOutSLice,
  discount: discountSlice,
  user: userSlice,
});
