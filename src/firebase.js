// // src/firebase.js
import { initializeApp } from "firebase/app";

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// import { getFirestore } from "@firebase/firestore"
// import { initializeApp } from "firebase/app"

// const firebaseConfig = {
//     apiKey: "AIzaSyASD12J_r-LA-VjtF-NN5i9DckVFyXfOe0",
//     authDomain: "cloudecommerce-1.firebaseapp.com",
//     projectId: "cloudecommerce-1",
//     storageBucket: "cloudecommerce-1.appspot.com",
//     messagingSenderId: "818046210088",
//     appId: "1:818046210088:web:e69c9abbb27902f69aa51d",
//     measurementId: "G-LYL12RFBCG"
//   };

// firebase.initializeApp(firebaseConfig);

// export const auth = firebase.auth();
// export const db = getFirestore(app);
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"
import { getFirestore } from "@firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyASD12J_r-LA-VjtF-NN5i9DckVFyXfOe0",
  authDomain: "cloudecommerce-1.firebaseapp.com",
  projectId: "cloudecommerce-1",
  storageBucket: "cloudecommerce-1.appspot.com",
  messagingSenderId: "818046210088",
  appId: "1:818046210088:web:e69c9abbb27902f69aa51d",
  measurementId: "G-LYL12RFBCG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);

// const handleLogin = async () => {
//  x try {
//     const userCredential = await auth.signInWithEmailAndPassword(email, password);
//     console.log('User logged in:', userCredential.user);
//   } catch (error) {
//     console.error('Login error:', error.message);
//   }
// };