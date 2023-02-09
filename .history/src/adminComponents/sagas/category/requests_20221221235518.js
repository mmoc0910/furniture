import { db } from "../../../firebase/firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  orderBy,
  query,
  doc,
  updateDoc,
  where,
} from "firebase/firestore";

const requestGetCategory = async () => {
  const colRef = collection(db, "category");
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
  return data;
};

const requestAddCategory = async (data) => {
  const colRef = collection(db, "category");
  console.log(data);
  try {
    await addDoc(colRef, data);
    return true;
  } catch (error) {
    return false;
  }
};

// const requestDeleteCategory = async ({ id, ...data }) => {
//   const docRef = doc(db, "category", id);
//   try {
//     await updateDoc(docRef, { ...data });
//     return true;
//   } catch (error) {
//     console.log(error);
//     return false;
//   }
// };

const requestUpadateCategory = async ({ id, ...data }) => {
  const docRef = doc(db, "category", id);
  try {
    await updateDoc(docRef, { ...data });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export {
  requestGetCategory,
  requestAddCategory,
  // requestDeleteCategory,
  requestUpadateCategory,
};
