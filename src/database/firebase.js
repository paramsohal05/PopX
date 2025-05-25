// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDR8ukFrfz_XuBZEZ-dndDO0gCABT9Tyfk",
  authDomain: "popx-cbdfa.firebaseapp.com",
  projectId: "popx-cbdfa",
  storageBucket: "popx-cbdfa.firebasestorage.app",
  messagingSenderId: "503214564370",
  appId: "1:503214564370:web:490dbca83101f0995f24cb",
  measurementId: "G-CEK35SPVDK"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth=getAuth(app)