// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDboHzTMZ72_OkruizZCrbN8tIK8LmzRL0",
  authDomain: "chureads-mongo.firebaseapp.com",
  projectId: "chureads-mongo",
  storageBucket: "chureads-mongo.firebasestorage.app",
  messagingSenderId: "241181598396",
  appId: "1:241181598396:web:ea0202c4d83febd408a6b9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // 우리 서비스에 인증서비스 사용하겠다고 선언
