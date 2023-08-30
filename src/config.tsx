import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyByNL83BdjFOPGcjV-YlEny51uAmhjuO4E",
  authDomain: "weather-forecast-7412e.firebaseapp.com",
  projectId: "weather-forecast-7412e",
  storageBucket: "weather-forecast-7412e.appspot.com",
  messagingSenderId: "451703933394",
  appId: "1:451703933394:web:12136d12eec09349a1600b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getFirestore(app)