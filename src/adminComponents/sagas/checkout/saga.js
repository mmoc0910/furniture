import { takeLatest } from "redux-saga/effects";
import { addOrder, createOrder } from "./checkOutSLice";
import { handlerAddOrder, handlerCreateOrder } from "./handlers";

function* createOrderSaga() {
  yield takeLatest(createOrder.type, handlerCreateOrder);
}
function* addOrderSaga() {
  yield takeLatest(addOrder.type, handlerAddOrder);
}

export { addOrderSaga, createOrderSaga };
