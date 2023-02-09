import { call, put } from "redux-saga/effects";
import { getProduct, setProducts } from "./productSlice";
import {
  requestAddProduct,
  requestGetProductDetail,
  requestGetProducts,
  requestUpdateProduct,
} from "./requests";

function* handleAddProduct({ payload, type }) {
  try {
    yield call(requestAddProduct, payload);
  } catch (error) {
    console.log(error);
  }
}

function* handleGetProductDetail({ payload, type }) {
  try {
    const data = yield call(requestGetProductDetail, payload);
    yield put(getProduct(data));
  } catch (error) {}
}

function* handleUpdateProduct({ payload, type }) {
  try {
    yield call(requestUpdateProduct, payload);
  } catch (error) {
    console.log(error);
  }
}

function* handleDeleteProduct({ payload, type }) {
  // try {
  //   yield call(requestUpdateProduct, payload);
  // } catch (error) {
  //   console.log(error);
  // }
}

function* handleGetProducts({ payload, type }) {
  try {
    const data = yield call(requestGetProducts);
    yield put(setProducts(data));
  } catch (error) {
    console.log(error);
  }
}

export {
  handleAddProduct,
  handleUpdateProduct,
  handleGetProducts,
  handleDeleteProduct,
  handleGetProductDetail,
};
