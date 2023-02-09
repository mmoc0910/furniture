import {
  collection,
  query,
  orderBy,
  getDocs,
  addDoc,
  where,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../firebase/firebase-config";

const requestAddBanner = async (data) => {
  const colRef = collection(db, "banners");
  console.log(data);
  try {
    await addDoc(colRef, data);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const requestGetBanners = async (obj = "admin") => {
  const colRef = collection(db, "banners");
  if (obj === "admin") {
    const q = query(
      colRef,
      orderBy("createdAt", "desc"),
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
  } else {
    const q = query(
      colRef,
      orderBy("createdAt", "desc"),
      where("isDeleted", "==", false),
      where("isVisiabled", "==", false)
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
  }
};

const requestUpdateBanner = async ({ id, ...data }) => {
  const docRef = doc(db, "banners", id);
  try {
    await updateDoc(docRef, { ...data });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export { requestAddBanner, requestGetBanners, requestUpdateBanner };
