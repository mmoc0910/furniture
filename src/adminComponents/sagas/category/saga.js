import { takeLatest } from "redux-saga/effects";
import {
  addCategory,
  // deleteCategory,
  getCategory,
  updateCategory,
} from "./categorySlice";
import {
  // handleDeleteCategory,
  handlerAddCategory,
  handlerGetCategory,
  handleUpdateCategory,
} from "./handlers";

function* getcategorySaga() {
  yield takeLatest(getCategory.type, handlerGetCategory);
}

function* addCategorySaga() {
  yield takeLatest(addCategory.type, handlerAddCategory);
}

// function* deleteCategorySaga() {
//   yield takeLatest(deleteCategory.type, handleDeleteCategory);
// }

function* updateCategorySaga() {
  yield takeLatest(updateCategory.type, handleUpdateCategory);
}

export {
  getcategorySaga,
  addCategorySaga,
  // deleteCategorySaga,
  updateCategorySaga,
};
