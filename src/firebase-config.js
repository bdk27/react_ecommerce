// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAUljE4hq3xTfa8N22cN5nY_LNsYv3CRBg",
  authDomain: "avela-77aa8.firebaseapp.com",
  projectId: "avela-77aa8",
  storageBucket: "avela-77aa8.firebasestorage.app",
  messagingSenderId: "80337741119",
  appId: "1:80337741119:web:d1b7a9565378076d24df8a",
  measurementId: "G-FP861NT0V0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
