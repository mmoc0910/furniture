import { takeLatest } from "redux-saga/effects";
import { handlerAddTag, handlerGetTag, handlerUpadateTag } from "./handlers";
import { addTag, getTag, updateTag } from "./tagSlice";

function* getTagSaga() {
  yield takeLatest(getTag.type, handlerGetTag);
}

function* addTagSaga() {
  yield takeLatest(addTag.type, handlerAddTag);
}
function* updateTagSaga() {
  yield takeLatest(updateTag.type, handlerUpadateTag);
}

export { getTagSaga, addTagSaga, updateTagSaga };
