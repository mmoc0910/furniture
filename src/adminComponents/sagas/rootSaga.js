import { all, fork } from "redux-saga/effects";
import { addBannerSaga, getBannersSaga, updateBannerSaga } from "./banner/saga";
import {
  addCartSaga,
  createCartSaga,
  getCartsSaga,
  updateCartsSaga,
} from "./carts/saga";
import {
  addCategorySaga,
  // deleteCategorySaga,
  getcategorySaga,
  updateCategorySaga,
} from "./category/saga";
import { addOrderSaga, createOrderSaga } from "./checkout/saga";
import { addColorSaga, getColorSaga } from "./color/saga";
import {
  addProductSaga,
  getProductsDetailSaga,
  getProductsSaga,
  updateProductSaga,
} from "./products/saga";
import { addTagSaga, getTagSaga, updateTagSaga } from "./tag/saga";

export default function* rootSaga() {
  yield all([
    fork(getcategorySaga),
    fork(addCategorySaga),
    // fork(deleteCategorySaga),
    fork(updateCategorySaga),
    fork(getTagSaga),
    fork(addTagSaga),
    fork(updateTagSaga),
    fork(getColorSaga),
    fork(addColorSaga),
    fork(addCategorySaga),
    fork(addProductSaga),
    fork(updateProductSaga),
    fork(getProductsSaga),
    fork(addBannerSaga),
    fork(getBannersSaga),
    fork(updateBannerSaga),
    fork(getProductsDetailSaga),
    fork(createCartSaga),
    fork(getCartsSaga),
    fork(updateCartsSaga),
    fork(addCartSaga),
    fork(addOrderSaga),
    fork(createOrderSaga),
  ]);
}
