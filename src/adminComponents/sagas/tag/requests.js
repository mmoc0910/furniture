import { db } from "../../../firebase/firebase-config";
import {
  collection,
  query,
  orderBy,
  where,
  getDocs,
  doc,
  updateDoc,
  addDoc,
} from "firebase/firestore";

const requestGetTag = async () => {
  const colRef = collection(db, "tags");
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

const requestAddTag = async (data) => {
  const colRef = collection(db, "tags");
  console.log(data);
  try {
    await addDoc(colRef, data);
    return true;
  } catch (error) {
    return false;
  }
};

const requestUpadateTag = async ({ id, ...data }) => {
  const docRef = doc(db, "tags", id);
  try {
    await updateDoc(docRef, { ...data });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export { requestGetTag, requestAddTag, requestUpadateTag };
