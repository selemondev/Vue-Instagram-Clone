import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyBG3vOHBA-RWsz0izqHQYDXFEc07oDON3M",
  authDomain: "vue-instagram-67662.firebaseapp.com",
  projectId: "vue-instagram-67662",
  storageBucket: "vue-instagram-67662.appspot.com",
  messagingSenderId: "572760905964",
  appId: "1:572760905964:web:fde6797af4de9f8ba32dc9"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);
export {
    auth,
    storage,
    db
}