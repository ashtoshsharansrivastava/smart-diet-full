import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your specific configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKc33l5zA7uevQQcXwMPuLiJqwZU-Y_z0",
  authDomain: "smartdietai-d1181.firebaseapp.com",
  projectId: "smartdietai-d1181",
  storageBucket: "smartdietai-d1181.firebasestorage.app",
  messagingSenderId: "961905548460",
  appId: "1:961905548460:web:1c589f1034c0c56d71d309",
  measurementId: "G-375308NG2L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Authentication
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();