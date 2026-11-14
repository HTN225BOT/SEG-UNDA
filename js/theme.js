/* SEG UNDA — sélecteur de thèmes */
(() => {
  const themes = [
    { id: "night", label: "Bleu nuit", color: "#00d9ff", icon: "🌌" },
    { id: "emerald", label: "Émeraude", color: "#34d399", icon: "🌿" },
    { id: "violet", label: "Violet", color: "#b69cff", icon: "💜" },
    { id: "ocean", label: "Océan", color: "#60a5fa", icon: "🌊" },
    { id: "light", label: "Clair", color: "#2563eb", icon: "☀️" },
    { id: "gold", label: "Doré", color: "#d4af37", icon: "👑" },
    { id: "dark", label: "Sombre", color: "#777b86", icon: "🌑" }
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
    .theme-control{position:relative;display:inline-flex;align-items:center;z-index:30;font-family:Arial,sans-serif;margin-left:8px}
    .theme-toggle{display:inline-flex;align-items:center;gap:5px;padding:6px 9px;border:1px solid var(--theme-border,rgba(124,92,255,.3));border-radius:18px;background:transparent;color:var(--theme-muted,var(--theme-text,#fff));font-weight:600;font-size:.76rem;line-height:1;cursor:pointer;opacity:.82;transition:opacity .2s ease,border-color .2s ease,background .2s ease}
    .theme-toggle:hover,.theme-toggle[aria-expanded="true"]{opacity:1;background:var(--theme-control-bg,rgba(0,217,255,.09));border-color:var(--theme-accent,#00d9ff)}
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
    body[data-theme="emerald"],body[data-theme="violet"],body[data-theme="ocean"]{background:var(--theme-bg);color:var(--theme-text)}
    body[data-theme="emerald"] .login-card,body[data-theme="violet"] .login-card,body[data-theme="ocean"] .login-card{background:var(--theme-card);border-color:var(--theme-border);color:var(--theme-text)}
    body[data-theme="emerald"] .login-page,body[data-theme="violet"] .login-page,body[data-theme="ocean"] .login-page{background:radial-gradient(circle at 20% 20%,var(--theme-glow),transparent 40%),var(--theme-bg)}
    body[data-theme="emerald"] .login-icon,body[data-theme="emerald"] .login-btn,body[data-theme="emerald"] .header-btn,body[data-theme="emerald"] .google-btn,
    body[data-theme="violet"] .login-icon,body[data-theme="violet"] .login-btn,body[data-theme="violet"] .header-btn,body[data-theme="violet"] .google-btn,
    body[data-theme="ocean"] .login-icon,body[data-theme="ocean"] .login-btn,body[data-theme="ocean"] .header-btn,body[data-theme="ocean"] .google-btn{background:linear-gradient(135deg,var(--theme-accent-2),var(--theme-accent));border-color:var(--theme-border);color:#fff}
    body[data-theme="emerald"] .login-card>p,body[data-theme="emerald"] .register,body[data-theme="emerald"] .field label,body[data-theme="emerald"] .info,body[data-theme="emerald"] .back-home,
    body[data-theme="violet"] .login-card>p,body[data-theme="violet"] .register,body[data-theme="violet"] .field label,body[data-theme="violet"] .info,body[data-theme="violet"] .back-home,
    body[data-theme="ocean"] .login-card>p,body[data-theme="ocean"] .register,body[data-theme="ocean"] .field label,body[data-theme="ocean"] .info,body[data-theme="ocean"] .back-home{color:var(--theme-muted)}
    body[data-theme="light"] .login-card{background:#fff;color:#172033;border-color:var(--theme-border)}
    body[data-theme="light"] .login-card>p,body[data-theme="light"] .register,body[data-theme="light"] .field label,body[data-theme="light"] .info,body[data-theme="light"] .back-home{color:#596579}
    body[data-theme="light"] .field input{background:#f7f9fd;color:#172033;border-color:var(--theme-border)}
    body[data-theme="light"] .login-icon,body[data-theme="light"] .login-btn,body[data-theme="light"] .header-btn{background:linear-gradient(135deg,#2563eb,#0ea5e9)}
    body[data-theme="light"]{--theme-accent:#2563eb;--theme-accent-2:#0ea5e9;--theme-glow:rgba(37,99,235,.09);--theme-border:rgba(37,99,235,.2);--theme-card:#fff;--theme-bg:#f3f6fc;--theme-text:#172033;--theme-muted:#596579;--theme-menu-bg:#fff;--theme-option-hover:rgba(37,99,235,.09);--theme-control-bg:#eef4ff;color:#172033;background:#f3f6fc}
    body[data-theme="light"] header{background:rgba(255,255,255,.94);border-color:var(--theme-border)}
    body[data-theme="light"] nav a,body[data-theme="light"] .brand-text,body[data-theme="light"] .theme-toggle{color:#172033}
    body[data-theme="light"] .hero-card,body[data-theme="light"] .licence-card,body[data-theme="light"] .about-card,body[data-theme="light"] .student-card,body[data-theme="light"] .summary-item,body[data-theme="light"] .profile-panel,body[data-theme="light"] .course-card,body[data-theme="light"] .course-subject-card,body[data-theme="light"] .learning-path>div,body[data-theme="light"] .content-empty,body[data-theme="light"] .chapter-card{background:#fff;color:#172033;border-color:var(--theme-border)}
    body[data-theme="light"] .hero p,body[data-theme="light"] .presentation p,body[data-theme="light"] .formations-header p,body[data-theme="light"] .about-hero p,body[data-theme="light"] .about-card p,body[data-theme="light"] .student-hero p,body[data-theme="light"] .summary-item small,body[data-theme="light"] .student-card p,body[data-theme="light"] .course-card p,body[data-theme="light"] .course-subject-card p,body[data-theme="light"] .chapter-card p,body[data-theme="light"] .chapter-card li{color:#596579}
    body[data-theme="light"] footer{background:#e9eef7;color:#596579;border-color:var(--theme-border)}
    body[data-theme="light"] .student-card,body[data-theme="light"] .chapter-card{box-shadow:0 12px 32px rgba(15,23,42,.07)}
    body[data-theme="light"] .hero{background:radial-gradient(circle at 80% 25%,rgba(37,99,235,.12),transparent 35%),radial-gradient(circle at 15% 80%,rgba(14,165,233,.08),transparent 35%)}

    body[data-theme="gold"]{--theme-accent:#e6c45a;--theme-accent-2:#9a7418;--theme-glow:rgba(230,196,90,.15);--theme-border:rgba(230,196,90,.3);--theme-card:#292315;--theme-bg:#100e09;--theme-text:#fff9e8;--theme-muted:#d0c6a8;--theme-menu-bg:#292315;--theme-option-hover:rgba(230,196,90,.14);--theme-control-bg:rgba(230,196,90,.1)}
    body[data-theme="dark"]{--theme-accent:#a1a1aa;--theme-accent-2:#52525b;--theme-glow:rgba(161,161,170,.1);--theme-border:rgba(161,161,170,.2);--theme-card:#18181b;--theme-bg:#09090b;--theme-text:#f4f4f5;--theme-muted:#a1a1aa;--theme-menu-bg:#18181b;--theme-option-hover:rgba(161,161,170,.12);--theme-control-bg:rgba(161,161,170,.09)}
    body[data-theme="gold"],body[data-theme="dark"]{background:var(--theme-bg);color:var(--theme-text)}
    body[data-theme="gold"] header,body[data-theme="dark"] header{background:rgba(12,12,14,.94);border-color:var(--theme-border)}
    body[data-theme="gold"] nav a:hover,body[data-theme="gold"] nav a.active,body[data-theme="dark"] nav a:hover,body[data-theme="dark"] nav a.active{color:var(--theme-accent)}
    body[data-theme="gold"] .hero,body[data-theme="dark"] .hero,body[data-theme="gold"] .about-page,body[data-theme="dark"] .about-page,body[data-theme="gold"] .student-page,body[data-theme="dark"] .student-page,body[data-theme="gold"] .courses-hub,body[data-theme="dark"] .courses-hub,body[data-theme="gold"] .level-page,body[data-theme="dark"] .level-page,body[data-theme="gold"] .subject-page,body[data-theme="dark"] .subject-page{background:radial-gradient(circle at 15% 20%,var(--theme-glow),transparent 34%),radial-gradient(circle at 85% 75%,var(--theme-glow),transparent 35%),var(--theme-bg)}
    body[data-theme="gold"] .hero-card,body[data-theme="dark"] .hero-card,body[data-theme="gold"] .licence-card,body[data-theme="dark"] .licence-card,body[data-theme="gold"] .about-card,body[data-theme="dark"] .about-card,body[data-theme="gold"] .student-card,body[data-theme="dark"] .student-card,body[data-theme="gold"] .summary-item,body[data-theme="dark"] .summary-item,body[data-theme="gold"] .profile-panel,body[data-theme="dark"] .profile-panel,body[data-theme="gold"] .course-card,body[data-theme="dark"] .course-card,body[data-theme="gold"] .course-subject-card,body[data-theme="dark"] .course-subject-card,body[data-theme="gold"] .learning-path>div,body[data-theme="dark"] .learning-path>div,body[data-theme="gold"] .content-empty,body[data-theme="dark"] .content-empty,body[data-theme="gold"] .chapter-card,body[data-theme="dark"] .chapter-card{background:var(--theme-card);border-color:var(--theme-border);color:var(--theme-text)}
    body[data-theme="gold"] .hero-tag,body[data-theme="dark"] .hero-tag,body[data-theme="gold"] .hero-card h2,body[data-theme="dark"] .hero-card h2,body[data-theme="gold"] .presentation h2 span,body[data-theme="dark"] .presentation h2 span,body[data-theme="gold"] .about-label,body[data-theme="dark"] .about-label,body[data-theme="gold"] .student-label,body[data-theme="dark"] .student-label,body[data-theme="gold"] .student-name,body[data-theme="dark"] .student-name,body[data-theme="gold"] .student-link,body[data-theme="dark"] .student-link,body[data-theme="gold"] .course-link,body[data-theme="dark"] .course-link,body[data-theme="gold"] .chapter-card h2,body[data-theme="dark"] .chapter-card h2{color:var(--theme-accent)}
    body[data-theme="gold"] .hero h1 span,body[data-theme="dark"] .hero h1 span,body[data-theme="gold"] .hero-btn,body[data-theme="dark"] .hero-btn,body[data-theme="gold"] .licence-btn,body[data-theme="dark"] .licence-btn,body[data-theme="gold"] .profile-btn,body[data-theme="dark"] .profile-btn,body[data-theme="gold"] .reveal-btn,body[data-theme="dark"] .reveal-btn{background:linear-gradient(135deg,var(--theme-accent-2),var(--theme-accent));color:#fff}
    body[data-theme="gold"] .hero p,body[data-theme="dark"] .hero p,body[data-theme="gold"] .presentation p,body[data-theme="dark"] .presentation p,body[data-theme="gold"] .formations-header p,body[data-theme="dark"] .formations-header p,body[data-theme="gold"] .about-hero p,body[data-theme="dark"] .about-hero p,body[data-theme="gold"] .about-card p,body[data-theme="dark"] .about-card p,body[data-theme="gold"] .student-hero p,body[data-theme="dark"] .student-hero p,body[data-theme="gold"] .summary-item small,body[data-theme="dark"] .summary-item small,body[data-theme="gold"] .student-card p,body[data-theme="dark"] .student-card p,body[data-theme="gold"] .course-card p,body[data-theme="dark"] .course-card p,body[data-theme="gold"] .course-subject-card p,body[data-theme="dark"] .course-subject-card p,body[data-theme="gold"] .chapter-card p,body[data-theme="dark"] .chapter-card p,body[data-theme="gold"] .chapter-card li,body[data-theme="dark"] .chapter-card li{color:var(--theme-muted)}
    body[data-theme="gold"] footer,body[data-theme="dark"] footer{background:var(--theme-card);color:var(--theme-muted);border-color:var(--theme-border)}
    body[data-theme="gold"] .login-card,body[data-theme="dark"] .login-card{background:var(--theme-card);border-color:var(--theme-border);color:var(--theme-text)}
    body[data-theme="gold"] .login-page,body[data-theme="dark"] .login-page{background:radial-gradient(circle at 20% 20%,var(--theme-glow),transparent 40%),var(--theme-bg)}
    body[data-theme="gold"] .login-icon,body[data-theme="dark"] .login-icon,body[data-theme="gold"] .login-btn,body[data-theme="dark"] .login-btn,body[data-theme="gold"] .header-btn,body[data-theme="dark"] .header-btn,body[data-theme="gold"] .google-btn,body[data-theme="dark"] .google-btn{background:linear-gradient(135deg,var(--theme-accent-2),var(--theme-accent));border-color:var(--theme-border);color:#fff}
    body[data-theme="gold"] .login-card>p,body[data-theme="dark"] .login-card>p,body[data-theme="gold"] .register,body[data-theme="dark"] .register,body[data-theme="gold"] .field label,body[data-theme="dark"] .field label,body[data-theme="gold"] .info,body[data-theme="dark"] .info,body[data-theme="gold"] .back-home,body[data-theme="dark"] .back-home{color:var(--theme-muted)}
    body[data-theme="gold"] .field input,body[data-theme="dark"] .field input{background:var(--theme-bg);color:var(--theme-text);border-color:var(--theme-border)}
    @media(max-width:768px){.theme-control{margin:2px}.theme-toggle{padding:5px 8px;font-size:.72rem;gap:4px}.theme-menu{right:0}}
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