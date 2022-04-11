import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBwNYl_9JgLYLalX_fmVOj9MWvHOaaK9mQ",
  authDomain: "mari-study.firebaseapp.com",
  projectId: "mari-study",
  storageBucket: "mari-study.appspot.com",
  messagingSenderId: "801197290206",
  appId: "1:801197290206:web:e2b01e8b2492ce6482484f",
  measurementId: "G-126SRELZRN"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const auth = getAuth(app);
export const storage = getStorage(app);
