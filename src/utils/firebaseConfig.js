// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDcxMlvtf0G9YO3HPBZGiIX17vA2Xw6yc0",
  authDomain: "sima-industries.firebaseapp.com",
  projectId: "sima-industries",
  storageBucket: "sima-industries.appspot.com",
  messagingSenderId: "612319216946",
  appId: "1:612319216946:web:cba39b5dbd88a74c1ec32b",
  measurementId: "G-K34S4SKRTM",
};

// Initialize Firebase

// const analytics = getAnalytics(app);

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = app.storage();
export const auth = getAuth(app);
export const db = getFirestore(app);
