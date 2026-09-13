import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyC4ejbTOO1G3XbwDJ5KYH6-CiYcdQqr68k",
  authDomain: "seg-unda.firebaseapp.com",
  projectId: "seg-unda",
  storageBucket: "seg-unda.firebasestorage.app",
  messagingSenderId: "1076997262231",
  appId: "1:1076997262231:web:31b640fa8fd5991e8612d2"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
