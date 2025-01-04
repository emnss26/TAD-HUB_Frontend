// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBm2UT8pqSkF5Z9TUyaYKYJaPCZe0oHzzQ",
  authDomain: "tadhub-28c98.firebaseapp.com",
  projectId: "tadhub-28c98",
  storageBucket: "tadhub-28c98.firebasestorage.app",
  messagingSenderId: "934078944372",
  appId: "1:934078944372:web:78b5cac0aa0d59d125ad21",
  measurementId: "G-0ZM1MXR3N0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);