import { initializeApp } from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_NASA_FIREBASE_KEY,
  authDomain: "skysight-4217b.firebaseapp.com",
  projectId: "skysight-4217b",
  storageBucket: "skysight-4217b.appspot.com",
  messagingSenderId: "734256389890",
  appId: "1:734256389890:web:78590838b5cf0210ccac1b",
};
// initialze to firebase
initializeApp(firebaseConfig);

//initialize firestore
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();

export { projectFirestore, projectAuth };
