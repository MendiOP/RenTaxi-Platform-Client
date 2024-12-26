// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDgdhxQYv14Zy0sTJMcZZ-Boqu49L739cI",
  authDomain: "car-booking-22e5a.firebaseapp.com",
  projectId: "car-booking-22e5a",
  storageBucket: "car-booking-22e5a.firebasestorage.app",
  messagingSenderId: "841479123179",
  appId: "1:841479123179:web:b965b44e601c39dc7c8eae"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);