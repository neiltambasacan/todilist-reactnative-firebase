// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZlSLYIrdMyrlJboz4ZhJfH1NKfp8SUDk",
  authDomain: "iptproj-6661c.firebaseapp.com",
  projectId: "iptproj-6661c",
  storageBucket: "iptproj-6661c.firebasestorage.app",
  messagingSenderId: "23577779336",
  appId: "1:23577779336:web:eaa208e693fd89e531d33d",
  measurementId: "G-69PVGHEM6R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };