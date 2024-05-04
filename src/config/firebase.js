// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDE_zb9KrDgD_W4RRtBqJ3_n9tfJrIEB-g",
  authDomain: "it-sysarch32-store-aguilar.firebaseapp.com",
  projectId: "it-sysarch32-store-aguilar",
  storageBucket: "it-sysarch32-store-aguilar.appspot.com",
  messagingSenderId: "959814200328",
  appId: "1:959814200328:web:e7e2d30e429fdf285df5bd",
  measurementId: "G-PVHL3930JH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
