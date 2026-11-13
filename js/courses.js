import { auth, db } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";

let currentUser = null;

onAuthStateChanged(auth, (user) => {
  currentUser = user;
});

document.querySelectorAll("[data-level]").forEach((button) => {
  button.addEventListener("click", async () => {
    const level = button.dataset.level;
    localStorage.setItem("segUndaLevel", level);

    if (!currentUser) return;

    try {
      await setDoc(
        doc(db, "users", currentUser.uid),
        { level },
        { merge: true }
      );
    } catch (error) {
      console.error("Erreur lors de l'enregistrement du niveau :", error);
    }
  });
});
