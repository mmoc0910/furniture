import { takeLatest } from "redux-saga/effects";
import {
  handleAddProduct,
  handleGetProductDetail,
  handleGetProducts,
  handleUpdateProduct,
} from "./handlers";
import {
  addProduct,
  getProductDetail,
  getProducts,
  updateProduct,
} from "./productSlice";

function* addProductSaga() {
  yield takeLatest(addProduct.type, handleAddProduct);
}
function* updateProductSaga() {
  yield takeLatest(updateProduct.type, handleUpdateProduct);
}
function* getProductsSaga() {
  yield takeLatest(getProducts.type, handleGetProducts);
}
function* getProductsDetailSaga() {
  yield takeLatest(getProductDetail.type, handleGetProductDetail);
}

export {
  addProductSaga,
  getProductsSaga,
  updateProductSaga,
  getProductsDetailSaga,
};
