import { call, put } from "redux-saga/effects";
import { requestAddTag, requestGetTag, requestUpadateTag } from "./requests";
import {
  getTag,
  setErrorMessage,
  setShowInputAddTag,
  setTag,
} from "./tagSlice";

function* handlerGetTag({ payload, type }) {
  try {
    const tags = yield call(requestGetTag);
    // console.log(tags);
    yield put(setTag(tags));
  } catch (error) {
    console.log(error);
  }
}

function* handlerAddTag({ payload, type }) {
  try {
    console.log(payload);
    const status = yield call(requestAddTag, payload);
    if (status) {
      yield put(setShowInputAddTag(false));
      yield put(getTag());
    } else {
      yield put(setErrorMessage("Them khong thanh cong"));
    }
  } catch (error) {
    console.log(error);
  }
}

function* handlerUpadateTag({ payload, tye }) {
  try {
    console.log(payload);
    const status = yield call(requestUpadateTag, payload);
    if (status) {
      yield put(getTag());
    } else {
      yield put(setErrorMessage("Them khong thanh cong"));
    }
  } catch (error) {
    console.log(error);
  }
}

export { handlerGetTag, handlerAddTag, handlerUpadateTag };
