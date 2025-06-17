import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC4vRihjkpNzH4ziw5FBVS9Gne6zjderJg",
  authDomain: "imagetotext-88a73.firebaseapp.com",
  projectId: "imagetotext-88a73",
  storageBucket: "imagetotext-88a73.firebasestorage.app",
  messagingSenderId: "40708713979",
  appId: "1:40708713979:web:566f4eb6b14ccdc7e76f5e",
  measurementId: "G-DBMP0PSKZH",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();