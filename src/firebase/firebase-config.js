// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCOEkVnIBirBBxt8NQGjFLCsL-wSeKIadI",
  authDomain: "furniture-a4417.firebaseapp.com",
  projectId: "furniture-a4417",
  storageBucket: "furniture-a4417.appspot.com",
  messagingSenderId: "853139808848",
  appId: "1:853139808848:web:d213b7706603861c17e755",
  measurementId: "G-2PV8VJ4Q1K",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
