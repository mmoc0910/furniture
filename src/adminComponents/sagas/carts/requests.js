import { async } from "@firebase/util";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../firebase/firebase-config";

const requestCreateCart = async ({ userId }) => {
  try {
    await setDoc(doc(db, "cart", userId), { carts: [] });
  } catch (error) {
    console.log(error);
  }
};

const requestGetCarts = async (userId) => {
  try {
    const docRef = doc(db, "cart", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      return docSnap.data();
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  } catch (error) {}
};

const requestUpdateCarts = async ({ userId, ...data }) => {
  try {
    const cartRef = doc(db, "cart", userId);
    await updateDoc(cartRef, { data });
  } catch (error) {
    console.log(error);
  }
};
const requestAddCart = async ({ userId, data }) => {
  try {
    console.log(data);
    const cartRef = doc(db, "cart", userId);
    await updateDoc(cartRef, { carts: data });
  } catch (error) {
    console.log(error);
  }
};

export {
  requestCreateCart,
  requestGetCarts,
  requestUpdateCarts,
  requestAddCart,
};
