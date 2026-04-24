import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAXDTKTqJY5o3BWWMQJ8dcj0PObm1tGzG8",
  authDomain: "quickmeds-91bcc.firebaseapp.com",
  projectId: "quickmeds-91bcc",
  storageBucket: "quickmeds-91bcc.firebasestorage.app",
  messagingSenderId: "913641841711",
  appId: "1:913641841711:web:5c04d0588cfb1bdb29d2da",
  measurementId: "G-N5CML0XS6V",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Auth and Provider
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
