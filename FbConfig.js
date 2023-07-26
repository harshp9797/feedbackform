import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";



const firebaseConfig = {
  apiKey: "AIzaSyD_Pi_KqSjy-taj6cxN-1EO7jNLXEx8rto",
  authDomain: "feedback-bdbe5.firebaseapp.com",
  databaseURL: "https://feedback-bdbe5-default-rtdb.firebaseio.com",
  projectId: "feedback-bdbe5",
  storageBucket: "feedback-bdbe5.appspot.com",
  messagingSenderId: "83994143877",
  appId: "1:83994143877:web:3c12c7d4cd78e634a30dec"
};

// Initialize Firebase
const app =initializeApp(firebaseConfig);
const db = getDatabase(app);
export default db;