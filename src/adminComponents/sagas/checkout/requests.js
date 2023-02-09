import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../firebase/firebase-config";

const requestCreateOrder = async ({ userId }) => {
  try {
    await setDoc(doc(db, "orders", userId), { orders: [] });
  } catch (error) {
    console.log(error);
  }
};

const requestAddOrder = async (data) => {
  try {
    await addDoc(collection(db, "orders"), data);
    // const docRef = doc(db, "orders", userId);
    // // Atomically add a new region to the "regions" array field.
    // await updateDoc(docRef, {
    //   orders: arrayUnion(arr),
    // });
  } catch (error) {
    console.log(error);
  }
};

export { requestAddOrder, requestCreateOrder };
