import { call, put } from "redux-saga/effects";
import { requestAddOrder, requestCreateOrder } from "./requests";

function* handlerCreateOrder({ payload, type }) {
  try {
    yield call(requestCreateOrder, payload);
  } catch (error) {
    console.log(error);
  }
}
function* handlerAddOrder({ payload, type }) {
  try {
    yield call(requestAddOrder, payload);
  } catch (error) {
    console.log(error);
  }
}

export { handlerAddOrder, handlerCreateOrder };
