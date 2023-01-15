// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import Cookies from 'js-cookie'
import {getAuth, GoogleAuthProvider,signInWithPopup} from 'firebase/auth'
import axios from "axios";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
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

export const signinwithgoogle= async()=>{
const signin=await signInWithPopup(auth,provider);
const email=signin.user.email
const name=signin.user.displayName;
const profilepic=signin.user.photoURL;
  Cookies.set('dp', profilepic)
  Cookies.set('email', email)
  Cookies.set('name',name)
// signInWithPopup(auth,provider).then((result)=>{
//   const email=result.user.email;
//   const profilepic=result.user.photoURL;
//   const name=result.user.displayName;
//   const token=result.user.uid;
//   // Cookies.set('token1', token)
//   console.log(result)
//   Cookies.set('dp', profilepic)
//   Cookies.set('email', email)
//   Cookies.set('name',name)
//   // auth.onAuthStateChanged()
//   // localStorage.setItem('token1',token);
//   // localStorage.setItem('dp',profilepic);
//   // localStorage.setItem('email',email);
 
//   // window.location.reload();
// }).catch((error)=>{
//   alert(error)
// })
 const url="http://localhost:5001/api/auth"
  const user=await axios.post(`${url}/createUser`,{email:email,name:name});
  const res=user.data;
  console.log(res)
  if(res.mark)
  {
    const login=await axios.post(`${url}/login`,{email:Cookies.get('email')});
    const data=login.data;
    Cookies.set('auth-Tokensynex',data.authToken)
    window.location.replace('/dashboard')
    return;
  }
  Cookies.set('auth-Tokensynex',res.authToken)
  
   
  
 window.location.replace('/dashboard')
}
