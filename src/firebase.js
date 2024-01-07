
import { initializeApp } from "firebase/app";

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"
import { getFirestore } from "@firebase/firestore"
const firebaseConfig = {
      apiKey: "AIzaSyCjrbeVtsXHdm-WPopazKZ_CpIHJJgh8K8",
      authDomain: "inm420-cloud-ecommerce.firebaseapp.com",
      projectId: "inm420-cloud-ecommerce",
      storageBucket: "inm420-cloud-ecommerce.appspot.com",
      messagingSenderId: "937995303477",
      appId: "1:937995303477:web:83efc3ff98d75e3f94cf7c",
      measurementId: "G-Q6QZWY4PVG"
    };
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);