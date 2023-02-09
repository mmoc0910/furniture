import {
  collection,
  query,
  orderBy,
  getDocs,
  addDoc,
} from "firebase/firestore";
import { db } from "../../../firebase/firebase-config";

const requestGetColor = async () => {
  const colRef = collection(db, "colors");
  const q = query(colRef, orderBy("createdAt", "desc"));
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

const requestAddColor = async (data) => {
  const colRef = collection(db, "colors");
  console.log(data);
  try {
    await addDoc(colRef, data);
    return true;
  } catch (error) {
    return false;
  }
};

export { requestGetColor, requestAddColor };
