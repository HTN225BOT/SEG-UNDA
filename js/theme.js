/* SEG UNDA — sélecteur de thèmes */
(() => {
  const themes = [
    { id: "night", label: "Bleu nuit", color: "#00d9ff", icon: "🌌" },
    { id: "emerald", label: "Émeraude", color: "#34d399", icon: "🌿" },
    { id: "violet", label: "Violet", color: "#b69cff", icon: "💜" },
    { id: "ocean", label: "Océan", color: "#60a5fa", icon: "🌊" },
    { id: "light", label: "Clair", color: "#2563eb", icon: "☀️" }
  ];
  const key = "segUndaTheme";
  const saved = localStorage.getItem(key) || "night";
  const apply = id => {
    const valid = themes.some(theme => theme.id === id) ? id : "night";
    document.body.dataset.theme = valid;
    localStorage.setItem(key, valid);
    document.querySelectorAll("[data-theme-choice]").forEach(button => {
      const selected = button.dataset.themeChoice === valid;
      button.setAttribute("aria-pressed", String(selected));
    });
  };
  const style = document.createElement("style");
  style.textContent = `
    .theme-control{position:relative;display:inline-flex;align-items:center;z-index:30;font-family:Arial,sans-serif}
    .theme-toggle{display:inline-flex;align-items:center;gap:8px;padding:9px 13px;border:1px solid var(--theme-accent,#00d9ff);border-radius:24px;background:var(--theme-control-bg,rgba(0,217,255,.09));color:var(--theme-text,#fff);font-weight:700;font-size:.88rem;cursor:pointer}
    .theme-toggle:focus-visible,.theme-option:focus-visible{outline:3px solid var(--theme-accent,#00d9ff);outline-offset:3px}
    .theme-menu{position:absolute;top:calc(100% + 10px);right:0;display:none;min-width:190px;padding:8px;border:1px solid var(--theme-border,rgba(124,92,255,.3));border-radius:15px;background:var(--theme-menu-bg,#141830);box-shadow:0 14px 35px rgba(0,0,0,.28)}
    .theme-menu.open{display:grid;gap:5px}
    .theme-option{display:flex;align-items:center;gap:10px;width:100%;padding:10px;border:0;border-radius:9px;background:transparent;color:var(--theme-text,#fff);text-align:left;font:inherit;cursor:pointer}
    .theme-option:hover,.theme-option[aria-pressed=true]{background:var(--theme-option-hover,rgba(0,217,255,.12))}
    .theme-dot{width:15px;height:15px;border-radius:50%;border:1px solid rgba(255,255,255,.35);background:var(--swatch)}
    .theme-check{margin-left:auto;color:var(--theme-accent,#00d9ff)}
    body[data-theme="emerald"]{--theme-accent:#34d399;--theme-accent-2:#059669;--theme-glow:rgba(52,211,153,.13);--theme-border:rgba(52,211,153,.28);--theme-card:#102a27;--theme-bg:#071713;--theme-text:#f0fdf4;--theme-muted:#b1c9bd;--theme-menu-bg:#102a27;--theme-option-hover:rgba(52,211,153,.13);--theme-control-bg:rgba(52,211,153,.1)}
    body[data-theme="violet"]{--theme-accent:#b69cff;--theme-accent-2:#805ad5;--theme-glow:rgba(182,156,255,.16);--theme-border:rgba(182,156,255,.3);--theme-card:#211a38;--theme-bg:#100b20;--theme-text:#f7f2ff;--theme-muted:#c5badb;--theme-menu-bg:#211a38;--theme-option-hover:rgba(182,156,255,.13);--theme-control-bg:rgba(182,156,255,.1)}
    body[data-theme="ocean"]{--theme-accent:#60a5fa;--theme-accent-2:#2563eb;--theme-glow:rgba(96,165,250,.15);--theme-border:rgba(96,165,250,.3);--theme-card:#14243b;--theme-bg:#071322;--theme-text:#eff6ff;--theme-muted:#b7c9df;--theme-menu-bg:#14243b;--theme-option-hover:rgba(96,165,250,.13);--theme-control-bg:rgba(96,165,250,.1)}
    body[data-theme="light"]{--theme-accent:#2563eb;--theme-accent-2:#0ea5e9;--theme-glow:rgba(37,99,235,.09);--theme-border:rgba(37,99,235,.2);--theme-card:#fff;--theme-bg:#f3f6fc;--theme-text:#172033;--theme-muted:#596579;--theme-menu-bg:#fff;--theme-option-hover:rgba(37,99,235,.09);--theme-control-bg:#eef4ff;color:#172033;background:#f3f6fc}
    body[data-theme="light"] header{background:rgba(255,255,255,.94);border-color:var(--theme-border)}
    body[data-theme="light"] nav a,body[data-theme="light"] .brand-text,body[data-theme="light"] .theme-toggle{color:#172033}
    body[data-theme="light"] .hero-card,body[data-theme="light"] .licence-card,body[data-theme="light"] .about-card,body[data-theme="light"] .student-card,body[data-theme="light"] .summary-item,body[data-theme="light"] .profile-panel,body[data-theme="light"] .course-card,body[data-theme="light"] .course-subject-card,body[data-theme="light"] .learning-path>div,body[data-theme="light"] .content-empty,body[data-theme="light"] .chapter-card{background:#fff;color:#172033;border-color:var(--theme-border)}
    body[data-theme="light"] .hero p,body[data-theme="light"] .presentation p,body[data-theme="light"] .formations-header p,body[data-theme="light"] .about-hero p,body[data-theme="light"] .about-card p,body[data-theme="light"] .student-hero p,body[data-theme="light"] .summary-item small,body[data-theme="light"] .student-card p,body[data-theme="light"] .course-card p,body[data-theme="light"] .course-subject-card p,body[data-theme="light"] .chapter-card p,body[data-theme="light"] .chapter-card li{color:#596579}
    body[data-theme="light"] footer{background:#e9eef7;color:#596579;border-color:var(--theme-border)}
    body[data-theme="light"] .student-card,body[data-theme="light"] .chapter-card{box-shadow:0 12px 32px rgba(15,23,42,.07)}
    body[data-theme="light"] .hero{background:radial-gradient(circle at 80% 25%,rgba(37,99,235,.12),transparent 35%),radial-gradient(circle at 15% 80%,rgba(14,165,233,.08),transparent 35%)}
    @media(max-width:768px){.theme-control{margin:4px}.theme-toggle{padding:8px 11px}.theme-menu{right:0}}
  `;
  document.head.appendChild(style);
  const mount = () => {
    const header = document.querySelector("header");
    if (!header || document.querySelector(".theme-control")) return;
    const control = document.createElement("div");
    control.className = "theme-control";
    control.innerHTML = '<button class="theme-toggle" type="button" aria-haspopup="true" aria-expanded="false">🎨 Thème</button><div class="theme-menu" role="group" aria-label="Choisir une couleur"></div>';
    const menu = control.querySelector(".theme-menu");
    themes.forEach(theme => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "theme-option";
      button.dataset.themeChoice = theme.id;
      button.innerHTML = '<span class="theme-dot" style="--swatch:' + theme.color + '"></span><span>' + theme.label + '</span><span class="theme-check" aria-hidden="true">✓</span>';
      button.addEventListener("click", () => { apply(theme.id); menu.classList.remove("open"); control.querySelector(".theme-toggle").setAttribute("aria-expanded","false"); });
      menu.appendChild(button);
    });
    const toggle = control.querySelector(".theme-toggle");
    toggle.addEventListener("click", () => { const open = menu.classList.toggle("open"); toggle.setAttribute("aria-expanded",String(open)); });
    document.addEventListener("click", event => { if (!control.contains(event.target)) { menu.classList.remove("open"); toggle.setAttribute("aria-expanded","false"); } });
    header.appendChild(control);
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount); else mount();
  apply(saved);
})();