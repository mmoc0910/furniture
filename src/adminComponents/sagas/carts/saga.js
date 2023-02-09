import { takeLatest } from "redux-saga/effects";
import { addCart, createCart, getCarts, updateCarts } from "./cartSlice";
import {
  handleAddCart,
  handleCreateCart,
  handleGetCarts,
  handleUpdateCarts,
} from "./handlers";

function* createCartSaga() {
  yield takeLatest(createCart.type, handleCreateCart);
}
function* getCartsSaga() {
  yield takeLatest(getCarts.type, handleGetCarts);
}
function* updateCartsSaga() {
  yield takeLatest(updateCarts.type, handleUpdateCarts);
}
function* addCartSaga() {
  yield takeLatest(addCart.type, handleAddCart);
}
export { createCartSaga, getCartsSaga, updateCartsSaga, addCartSaga };
