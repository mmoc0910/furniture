import { takeLatest } from "redux-saga/effects";
import { addBanner, getBanners, updateBanner } from "./bannerSlice";
import {
  handleGetBanners,
  handlerAddBanner,
  handleUpdateBanner,
} from "./handlers";

function* addBannerSaga() {
  yield takeLatest(addBanner.type, handlerAddBanner);
}
function* updateBannerSaga() {
  yield takeLatest(updateBanner.type, handleUpdateBanner);
}
function* getBannersSaga() {
  yield takeLatest(getBanners.type, handleGetBanners);
}

export { addBannerSaga, getBannersSaga, updateBannerSaga };
