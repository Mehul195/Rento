import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAkhUgkQQ_FK3olDRt0fSoTxw2JRuyHBSk",
  authDomain: "rento-416904.firebaseapp.com",
  projectId: "rento-416904",
  storageBucket: "rento-416904.appspot.com",
  messagingSenderId: "961087764231",
  appId: "1:961087764231:web:c60c55e647874108c277a2",
  measurementId: "G-KET5JBLRMF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const imageDb = getStorage(app);