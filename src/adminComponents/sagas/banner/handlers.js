import { call, put } from "redux-saga/effects";
import { getBanners, setBanners } from "./bannerSlice";
import {
  requestAddBanner,
  requestGetBanners,
  requestUpdateBanner,
} from "./requests";

function* handlerAddBanner({ payload, type }) {
  try {
    yield call(requestAddBanner, payload);
    yield put(getBanners);
  } catch (error) {
    console.log(error);
  }
}

function* handleUpdateBanner({ payload, type }) {
  try {
    yield call(requestUpdateBanner, payload);
  } catch (error) {
    console.log(error);
  }
}

function* handleGetBanners({ payload, type }) {
  try {
    const data = yield call(requestGetBanners, payload);
    yield put(setBanners(data));
  } catch (error) {
    console.log(error);
  }
}

export { handlerAddBanner, handleGetBanners, handleUpdateBanner };
