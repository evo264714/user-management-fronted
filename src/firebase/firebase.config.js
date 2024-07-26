// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyANaagYUeAT_CgCiNXgg4ZLqQScmJwyJ4A",
  authDomain: "user-management-f2826.firebaseapp.com",
  projectId: "user-management-f2826",
  storageBucket: "user-management-f2826.appspot.com",
  messagingSenderId: "718124592355",
  appId: "1:718124592355:web:96366aa6ba1f1149a6a9d6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
