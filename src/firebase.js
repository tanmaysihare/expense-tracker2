// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getDatabase} from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-ZiBDqAYaaBy2czSnBwxdUgrRk0Y0Qjs",
  authDomain: "expanse-tracker-2f5d9.firebaseapp.com",
  databaseURL: "https://expanse-tracker-2f5d9-default-rtdb.firebaseio.com",
  projectId: "expanse-tracker-2f5d9",
  storageBucket: "expanse-tracker-2f5d9.appspot.com",
  messagingSenderId: "295860165406",
  appId: "1:295860165406:web:bbcf2427aa34f17f24070f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);