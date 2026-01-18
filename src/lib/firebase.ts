import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDd4uO7yCC1M3-NmTFpA8nDioGoc7xzLKQ",
  authDomain: "planner-app-180c5.firebaseapp.com",
  projectId: "planner-app-180c5",
  storageBucket: "planner-app-180c5.firebasestorage.app",
  messagingSenderId: "704621282536",
  appId: "1:704621282536:web:bb8e57556b8996ab25b55d",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);