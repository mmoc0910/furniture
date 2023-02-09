import { takeLatest } from "redux-saga/effects";
import { addColor, getColors } from "./colorSlice";
import { handleGetColor, handlerAddColor } from "./handlers";

function* getColorSaga() {
  yield takeLatest(getColors.type, handleGetColor);
}
function* addColorSaga() {
  yield takeLatest(addColor.type, handlerAddColor);
}

export { getColorSaga, addColorSaga };
