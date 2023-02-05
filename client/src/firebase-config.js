
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

import {getAuth, GoogleAuthProvider} from 'firebase/auth'

export const firebaseConfig = {
  apiKey: "AIzaSyBnGwyp6-3Ja1szGrEtpfE9VyUyoH71bgo",
  authDomain: "syntax-error-3c355.firebaseapp.com",
  projectId: "syntax-error-3c355",
  storageBucket: "syntax-error-3c355.appspot.com",
  messagingSenderId: "305956594550",
  appId: "1:305956594550:web:8b0fcb6b53013e5ae61057",
  measurementId: "G-L0YKP3ZDPX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export let auth = getAuth(app);
export const provider=new GoogleAuthProvider();

