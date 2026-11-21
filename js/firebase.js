import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyC4ejbTOO1G3XbwDJ5KYH6-CiYcdQqr68k",
  authDomain: "seg-unda.firebaseapp.com",
  projectId: "seg-unda",
  storageBucket: "seg-unda.firebasestorage.app",
  messagingSenderId: "1076997262231",
  appId: "1:1076997262231:web:31b640fa8fd5991e8612d2"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
