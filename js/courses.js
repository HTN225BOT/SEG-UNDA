import { auth, db } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";

const validLevels = new Set(["L1", "L2", "L3"]);

let currentUser = null;
let resolveInitialAuth;
const initialAuth = new Promise((resolve) => {
  resolveInitialAuth = resolve;
});

onAuthStateChanged(
  auth,
  (user) => {
    currentUser = user;
    resolveInitialAuth(user);
  },
  (error) => {
    console.error("Impossible de vérifier la session :", error);
    resolveInitialAuth(null);
  }
);

document.addEventListener("click", async (event) => {
  const link = event.target.closest("a[data-level]");
  if (!link) return;

  const level = link.dataset.level;
  if (!validLevels.has(level)) return;

  event.preventDefault();

  try {
    localStorage.setItem("segUndaLevel", level);
  } catch (error) {
    console.error("Impossible d'enregistrer le niveau sur cet appareil :", error);
  }

  link.setAttribute("aria-busy", "true");
  try {
    const user = await initialAuth;
    if (user) {
      await setDoc(doc(db, "users", user.uid), { level }, { merge: true });
    }
  } catch (error) {
    console.error("Erreur lors de l'enregistrement du niveau :", error);
  } finally {
    window.location.assign(link.href);
  }
});
