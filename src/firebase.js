import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDugK8GRG0__Akhn-bntmlViR8V5tGwpzc",
  authDomain: "filmflix-7f4bb.firebaseapp.com",
  projectId: "filmflix-7f4bb",
  storageBucket: "filmflix-7f4bb.appspot.com",
  messagingSenderId: "420985875775",
  appId: "1:420985875775:web:a7938c6c19336ce30fb78a"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
