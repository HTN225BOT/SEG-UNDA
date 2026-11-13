import { auth } from "./firebase.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";

export function initAuthArea() {
  const authArea = document.getElementById("authArea");
  if (!authArea) return;

  onAuthStateChanged(auth, (user) => {
    if (!user) {
      authArea.innerHTML = '<a href="connexion.html" class="header-btn">Connexion</a>';
      return;
    }

    authArea.innerHTML = `
      <div class="auth-actions">
        <a href="espace.html" class="header-btn">Mon espace</a>
        <button type="button" id="logoutBtn" class="logout-btn">Déconnexion</button>
      </div>
    `;

    document.getElementById("logoutBtn")?.addEventListener("click", async () => {
      try {
        await signOut(auth);
      } catch (error) {
        console.error("Erreur de déconnexion :", error);
      }
    });
  });
}
