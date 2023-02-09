import dayjs from "dayjs";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  orderBy,
} from "firebase/firestore";
import { db } from "../../../firebase/firebase-config";
import slugify from "react-slugify";

const requestAddProduct = async (data) => {
  const colRef = collection(db, "products");
  console.log(data);
  await addDoc(colRef, {
    ...data,
    createdAt: dayjs().unix(),
    slug: slugify(data.productName),
  });
};

const requestGetProductDetail = async (slug) => {
  const colRef = collection(db, "products");
  const q = query(colRef, where("slug", "==", slug));
  const querySnapShot = await getDocs(q);
  let data = [];
  querySnapShot.forEach((doc) => {
    data.push({
      id: doc.id,
      ...doc.data(),
    });
  });
  return data[0];
};
const requestUpdateProduct = async ({ id, ...data }) => {
  const docRef = doc(db, "products", id);
  try {
    await updateDoc(docRef, { ...data });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
const requestDeleteProduct = async ({ id, ...data }) => {
  // const docRef = doc(db, "products", id);
  // try {
  //   await updateDoc(docRef, { ...data });
  //   return true;
  // } catch (error) {
  //   console.log(error);
  //   return false;
  // }
};

const requestGetProducts = async () => {
  const colRef = collection(db, "products");
  const q = query(
    colRef,
    orderBy("createdAt", "asc"),
    where("isDeleted", "==", false)
  );
  const querySnapShot = await getDocs(q);
  let data = [];
  querySnapShot.forEach((doc) => {
    data.push({
      id: doc.id,
      ...doc.data(),
    });
  });
  // console.log(data);
  return data;
};
export {
  requestAddProduct,
  requestGetProducts,
  requestUpdateProduct,
  requestDeleteProduct,
  requestGetProductDetail,
};
