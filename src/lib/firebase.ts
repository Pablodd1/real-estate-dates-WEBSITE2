import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAIGXqBh9oFvQ8tj_pFCq2GRZDufa33WzI",
  authDomain: "real-estate-dates-ab0e4.firebaseapp.com",
  projectId: "real-estate-dates-ab0e4",
  storageBucket: "real-estate-dates-ab0e4.firebasestorage.app",
  messagingSenderId: "705062190322",
  appId: "1:705062190322:web:68d535c01873c5fb5ca46b",
  measurementId: "G-EGYDX2XDCM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export default app;
