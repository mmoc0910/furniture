import { call, put } from "redux-saga/effects";
import { getColors, setColors } from "./colorSlice";
import { requestAddColor, requestGetColor } from "./requests";

function* handleGetColor({ payload, type }) {
  try {
    const data = yield call(requestGetColor);
    yield put(setColors(data));
  } catch (error) {
    console.log(error);
  }
}

function* handlerAddColor({ payload, type }) {
  try {
    console.log(payload);
    const status = yield call(requestAddColor, payload);
    if (status) {
      yield put(getColors());
    } else {
      // yield put(setErrMessage("Them khong thanh cong"));
    }
  } catch (error) {
    console.log(error);
  }
}

export { handleGetColor, handlerAddColor };
