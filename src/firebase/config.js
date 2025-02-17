import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
getFirestore


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCde9Ys8gTs_UTvIj84uPaMeOkyMXw1EhA",
  authDomain: "todo-app-7473d.firebaseapp.com",
  projectId: "todo-app-7473d",
  storageBucket: "todo-app-7473d.firebasestorage.app",
  messagingSenderId: "565641024190",
  appId: "1:565641024190:web:83dfa03b1097c3cb1e44ef"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export const firestoreDB = getFirestore(firebaseApp);