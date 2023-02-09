import { put, call } from "redux-saga/effects";
import {
  getCategory,
  setCategory,
  setErrMessage,
  setShowInputAddCategory,
} from "./categorySlice";
import {
  requestAddCategory,
  // requestDeleteCategory,
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
      // yield put(getCategory());
    } else {
      yield put(setErrMessage("Them khong thanh cong"));
    }
  } catch (error) {
    console.log(error);
  }
}

// function* handleDeleteCategory({ payload }) {
//   try {
//     const status = yield call(requestUpadateCategory, payload);
//     if (status) {
//       yield put(getCategory());
//     } else {
//       yield put(setErrMessage("Xoa khong thanh cong"));
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }

function* handleUpdateCategory({ payload }) {
  try {
    const status = yield call(requestUpadateCategory, payload);
    console.log(payload);
    if (status) {
      yield put(getCategory());
    } else {
      yield put(setErrMessage("Update khong thanh cong"));
    }
  } catch (error) {
    console.log(error);
  }
}

export {
  handlerGetCategory,
  handlerAddCategory,
  // handleDeleteCategory,
  handleUpdateCategory,
};
