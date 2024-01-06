// // src/firebase.js
import { initializeApp } from "firebase/app";

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"
import { getFirestore } from "@firebase/firestore"
// const admin = require('firebase-admin');

// const firebaseConfig = {
//   apiKey: "AIzaSyASD12J_r-LA-VjtF-NN5i9DckVFyXfOe0",
//   authDomain: "cloudecommerce-1.firebaseapp.com",
//   projectId: "cloudecommerce-1",
//   storageBucket: "cloudecommerce-1.appspot.com",
//   messagingSenderId: "818046210088",
//   appId: "1:818046210088:web:e69c9abbb27902f69aa51d",
//   measurementId: "G-LYL12RFBCG"
// };
// const firebaseConfig = {
//       apiKey: "AIzaSyDapsd3fs0Ll-pU3tRu7j51D1enALtuRfI",
//       authDomain: "ecommerce-inm429.firebaseapp.com",
//       projectId: "ecommerce-inm429",
//       storageBucket: "ecommerce-inm429.appspot.com",
//       messagingSenderId: "711561965335",
//       appId: "1:711561965335:web:5b213b99bb0db9ef9f9152"
//     };
// const firebaseConfig = {
//   apiKey: "AIzaSyC9NA4vhMblmYiUzJlbIohD-HnQ-9SIwgQ",
//   authDomain: "inm429cloudecommerce.firebaseapp.com",
//   projectId: "inm429cloudecommerce",
//   storageBucket: "inm429cloudecommerce.appspot.com",
//   messagingSenderId: "980813316734",
//   appId: "1:980813316734:web:0eee72f82220e4bdd64e2f",
//   measurementId: "G-VST3X6C64X"
// };
// const firebaseConfig = {
//   apiKey: "AIzaSyBQGFIeSzEeNJoQ1h4FeleMX1VRtHzLuRw",
//   authDomain: "inm429cloudecommerce-fe226.firebaseapp.com",
//   projectId: "inm429cloudecommerce-fe226",
//   storageBucket: "inm429cloudecommerce-fe226.appspot.com",
//   messagingSenderId: "562632351322",
//   appId: "1:562632351322:web:02bda560e583aca5920263",
//   measurementId: "G-TQ229691M2"
// };
const firebaseConfig = {
      apiKey: "AIzaSyCjrbeVtsXHdm-WPopazKZ_CpIHJJgh8K8",
      authDomain: "inm420-cloud-ecommerce.firebaseapp.com",
      projectId: "inm420-cloud-ecommerce",
      storageBucket: "inm420-cloud-ecommerce.appspot.com",
      messagingSenderId: "937995303477",
      appId: "1:937995303477:web:83efc3ff98d75e3f94cf7c",
      measurementId: "G-Q6QZWY4PVG"
    };
// const functions = require('firebase-functions');

// admin.initializeApp();

// exports.processSignUp = functions.auth.user().onCreate((user) => {
//   // Set the user's role to "user" by default
//   return admin.auth().setCustomUserClaims(user.uid, { role: 'user' });
// });
// const admin = require('firebase-admin');
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
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
// const handleLogin = async () => {
//  x try {
//     const userCredential = await auth.signInWithEmailAndPassword(email, password);
//     console.log('User logged in:', userCredential.user);
//   } catch (error) {
//     console.error('Login error:', error.message);
//   }
// };