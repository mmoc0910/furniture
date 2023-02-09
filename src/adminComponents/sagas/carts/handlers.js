import { call, put } from "redux-saga/effects";
import { setCarts } from "./cartSlice";
import {
  requestAddCart,
  requestCreateCart,
  requestGetCarts,
  requestUpdateCarts,
} from "./requests";

function* handleCreateCart({ payload, type }) {
  try {
    yield call(requestCreateCart, payload);
  } catch (error) {
    console.log(error);
  }
}
function* handleGetCarts({ payload, type }) {
  try {
    const data = yield call(requestGetCarts, payload);
    yield put(setCarts(data.carts));
  } catch (error) {}
}

function* handleUpdateCarts({ payload, type }) {
  try {
    yield call(requestUpdateCarts, payload);
  } catch (error) {}
}
function* handleAddCart({ payload, type }) {
  try {
    yield call(requestAddCart, payload);
  } catch (error) {}
}

export { handleCreateCart, handleGetCarts, handleUpdateCarts, handleAddCart };
