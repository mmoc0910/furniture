import { put, call } from "redux-saga/effects";
import {
  setCategory,
  setErrMessage,
  setShowInputAddCategory,
} from "./categorySlice";
import {
  requestAddCategory,
  requestGetCategory,
  requestUpadateCategory,
} from "./requests";

function* handlerGetCategory({ payload }) {
  try {
    const categories = yield call(requestGetCategory);
    yield put(setCategory(categories));
  } catch (error) {
    console.log(error);
  }
}

function* handlerAddCategory({ payload, type }) {
  try {
    const status = yield call(requestAddCategory, payload);
    if (status) {
      yield put(setShowInputAddCategory(false));
    } else {
      yield put(setErrMessage("Them khong thanh cong"));
    }
  } catch (error) {
    console.log(error);
  }
}

function* handleUpdateCategory({ payload }) {
  try {
    yield call(requestUpadateCategory, payload);
  } catch (error) {
    console.log(error);
  }
}

export { handlerGetCategory, handlerAddCategory, handleUpdateCategory };
