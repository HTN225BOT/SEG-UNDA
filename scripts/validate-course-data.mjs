#!/usr/bin/env node
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];
const warnings = [];
const stats = {
  courses: 0,
  chapters: 0,
  exercises: 0,
  quizzes: 0,
  links: 0,
  catalogLinks: 0,
  legacyLinks: 0,
  pendingLinks: 0
};

function fail(message) {
  errors.push(message);
}

function warn(message) {
  warnings.push(message);
}

function readRepoFile(path) {
  const absolutePath = resolve(root, path);
  if (!existsSync(absolutePath)) {
    fail("Fichier introuvable : " + path);
    return "";
  }
  return readFileSync(absolutePath, "utf8");
}

function isText(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function normalizeText(value) {
  return String(value ?? "").normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("fr")
    .replace(/\s+/g, " ")
    .trim();
}

function checkUnique(items, getText, label) {
  const seen = new Set();
  items.forEach((item, index) => {
    const normalized = normalizeText(getText(item));
    if (seen.has(normalized)) {
      fail(label + " : doublon détecté à l'élément " + (index + 1));
    }
    seen.add(normalized);
  });
}

function checkModuleSyntax(path, source) {
  const withoutImports = source
    .replace(/^\s*import\s+.*?;\s*$/gm, "")
    .replace(/^\s*export\s+/gm, "");
  try {
    new vm.Script(withoutImports, { filename: path });
  } catch (error) {
    fail("Syntaxe invalide dans " + path + " : " + error.message);
  }
}

const dataSource = readRepoFile("js/course-data.js");
let catalog = null;

try {
  const declaration = /^export\s+const\s+courseCatalog\s*=/m;
  if (!declaration.test(dataSource)) {
    throw new Error("Déclaration export const courseCatalog introuvable.");
  }
  const executable = dataSource.replace(declaration, "const courseCatalog =") + "\n;courseCatalog;";
  catalog = new vm.Script(executable, { filename: "js/course-data.js" }).runInNewContext({});
  if (!catalog || typeof catalog !== "object" || Array.isArray(catalog)) {
    throw new Error("Le catalogue doit être un objet.");
  }
} catch (error) {
  fail("Impossible de lire le catalogue : " + error.message);
}

if (catalog) {
  const keys = Object.keys(catalog);
  stats.courses = keys.length;

  if (keys.length === 0) fail("Le catalogue ne contient aucune matière.");

  for (const key of keys) {
    const parts = key.split("|");
    if (parts.length !== 2 || !["L1", "L2", "L3"].includes(parts[0]) || !parts[1].trim()) {
      fail("Clé de matière invalide : " + key);
      continue;
    }

    const course = catalog[key];
    if (!course || typeof course !== "object" || Array.isArray(course)) {
      fail(key + " : entrée de matière invalide.");
      continue;
    }

    if (!isText(course.status) || !/provisoire/i.test(course.status) || !/valider/i.test(course.status)) {
      fail(key + " : le statut doit indiquer clairement un support provisoire à valider.");
    }
    if (!isText(course.intro)) fail(key + " : introduction manquante.");

    if (!Array.isArray(course.chapters) || course.chapters.length === 0) {
      fail(key + " : aucun chapitre structuré.");
    } else {
      stats.chapters += course.chapters.length;
      checkUnique(course.chapters, chapter => chapter && chapter.title || "", key + " — titres des chapitres");

      course.chapters.forEach((chapter, index) => {
        const label = key + " — chapitre " + (index + 1);
        if (!chapter || typeof chapter !== "object") {
          fail(label + " : structure invalide.");
          return;
        }
        if (!isText(chapter.title)) fail(label + " : titre manquant.");
        if (!Array.isArray(chapter.objectives) || chapter.objectives.length === 0 ||
            !chapter.objectives.every(isText)) {
          fail(label + " : objectifs absents ou incomplets.");
        }
        if (!Array.isArray(chapter.sections) || chapter.sections.length === 0) {
          fail(label + " : aucune section explicative.");
        } else {
          chapter.sections.forEach((section, sectionIndex) => {
            if (!Array.isArray(section) || section.length < 2 ||
                !isText(section[0]) || !isText(section[1])) {
              fail(label + " — section " + (sectionIndex + 1) + " : titre ou explication manquant.");
            }
          });
        }
        if (!isText(chapter.summary)) fail(label + " : résumé manquant.");
      });
    }

    if (!Array.isArray(course.exercises) || course.exercises.length === 0) {
      fail(key + " : aucun exercice corrigé.");
    } else {
      stats.exercises += course.exercises.length;
      checkUnique(course.exercises, exercise => exercise && exercise.question || "", key + " — questions d'exercices");
      course.exercises.forEach((exercise, index) => {
        const label = key + " — exercice " + (index + 1);
        if (!exercise || typeof exercise !== "object") {
          fail(label + " : structure invalide.");
          return;
        }
        if (!isText(exercise.question)) fail(label + " : énoncé manquant.");
        if (!isText(exercise.answer)) fail(label + " : réponse corrigée manquante.");
        if (!isText(exercise.explanation)) fail(label + " : explication manquante.");
      });
    }

    if (!Array.isArray(course.quiz) || course.quiz.length === 0) {
      fail(key + " : aucun quiz.");
    } else {
      stats.quizzes += course.quiz.length;
      checkUnique(course.quiz, question => question && question.q || "", key + " — questions de quiz");
      course.quiz.forEach((question, index) => {
        const label = key + " — quiz " + (index + 1);
        if (!question || typeof question !== "object") {
          fail(label + " : structure invalide.");
          return;
        }
        if (!isText(question.q)) fail(label + " : question manquante.");
        if (!Array.isArray(question.options) || question.options.length < 2 ||
            !question.options.every(isText)) {
          fail(label + " : options absentes ou invalides.");
        }
        if (!Number.isInteger(question.correct) || question.correct < 0 ||
            !Array.isArray(question.options) || question.correct >= question.options.length) {
          fail(label + " : indice de bonne réponse hors limites.");
        }
        if (!isText(question.why)) fail(label + " : explication de la réponse manquante.");
      });
    }
  }
}

const coursePage = readRepoFile("js/course-page.js");
const headerAuth = readRepoFile("js/header-auth.js");
const firebase = readRepoFile("js/firebase.js");
const subjectPage = readRepoFile("cours/matiere.html");
const stylesheet = readRepoFile("style.css");

checkModuleSyntax("js/course-page.js", coursePage);
checkModuleSyntax("js/header-auth.js", headerAuth);
checkModuleSyntax("js/firebase.js", firebase);

if (!coursePage.includes('from "./course-data.js"')) {
  fail("js/course-page.js doit importer ./course-data.js.");
}
if (!headerAuth.includes('from "./firebase.js"')) {
  fail("js/header-auth.js doit importer ./firebase.js.");
}
if (!subjectPage.includes('href="../style.css"')) {
  fail("cours/matiere.html ne référence pas ../style.css.");
}
if (!subjectPage.includes('src="../js/course-page.js"')) {
  fail("cours/matiere.html ne charge pas ../js/course-page.js.");
}
for (const selector of [".course-content", ".chapter-card", ".exercise-item", ".quiz-question"]) {
  if (!stylesheet.includes(selector)) fail("Style manquant dans style.css : " + selector);
}

const expectedLevels = [
  { file: "l1.html", level: "L1" },
  { file: "l2.html", level: "L2" },
  { file: "l3.html", level: "L3" }
];
const linkedCatalogKeys = new Set();
const seenLinks = new Set();
const legacyKey = "L1|Microéconomie";

for (const page of expectedLevels) {
  const html = readRepoFile(page.file);
  const hrefs = [...html.matchAll(/\bhref\s*=\s*(["'])(.*?)\1/gi)]
    .map(match => match[2].replace(/&amp;/g, "&"))
    .filter(href => href.includes("cours/matiere.html"));

  if (hrefs.length === 0) {
    fail(page.file + " : aucun lien vers cours/matiere.html.");
  }

  for (const href of hrefs) {
    stats.links += 1;
    const queryIndex = href.indexOf("?");
    const pathname = (queryIndex === -1 ? href : href.slice(0, queryIndex)).replace(/^\.\//, "");
    if (pathname !== "cours/matiere.html") {
      fail(page.file + " : destination inattendue : " + href);
      continue;
    }

    const params = new Map();
    const query = queryIndex === -1 ? "" : href.slice(queryIndex + 1);
    try {
      for (const part of query.split("&").filter(Boolean)) {
        const separator = part.indexOf("=");
        const rawName = separator === -1 ? part : part.slice(0, separator);
        const rawValue = separator === -1 ? "" : part.slice(separator + 1);
        const name = decodeURIComponent(rawName.replace(/\+/g, " "));
        const value = decodeURIComponent(rawValue.replace(/\+/g, " "));
        const values = params.get(name) || [];
        values.push(value);
        params.set(name, values);
      }
    } catch (error) {
      fail(page.file + " : paramètres URL mal encodés : " + href);
      continue;
    }

    const levels = params.get("level") || [];
    const subjects = params.get("subject") || [];
    if (levels.length !== 1 || subjects.length !== 1) {
      fail(page.file + " : chaque lien doit transmettre exactement un paramètre level et subject.");
      continue;
    }

    const level = levels[0];
    const subject = subjects[0];
    if (level !== page.level) {
      fail(page.file + " : niveau " + level + " inattendu, attendu " + page.level + ".");
      continue;
    }
    if (!isText(subject)) {
      fail(page.file + " : paramètre subject vide.");
      continue;
    }

    const key = level + "|" + subject;
    if (seenLinks.has(key)) fail(page.file + " : lien dupliqué pour " + key + ".");
    seenLinks.add(key);

    if (catalog && Object.prototype.hasOwnProperty.call(catalog, key)) {
      linkedCatalogKeys.add(key);
      stats.catalogLinks += 1;
    } else if (key === legacyKey) {
      stats.legacyLinks += 1;
      if (!coursePage.includes('normalize(subject) === "microeconomie"')) {
        fail("Le lien historique L1|Microéconomie n'a plus de traitement dédié dans course-page.js.");
      }
      const legacyFiles = [
        "cours/matieres/microeconomie-cours.html",
        "cours/matieres/microeconomie-exercices.html",
        "cours/matieres/microeconomie-revision.html"
      ];
      for (const path of legacyFiles) {
        if (!existsSync(resolve(root, path))) fail("Ressource historique introuvable : " + path);
        if (!coursePage.includes(path.replace("cours/", ""))) {
          fail("Ressource historique non référencée dans course-page.js : " + path);
        }
      }
    } else if (level === "L1") {
      fail(page.file + " : aucune clé exacte du catalogue pour " + key + ".");
    } else {
      stats.pendingLinks += 1;
      warn(page.file + " : " + key + " reste en préparation (aucune clé de catalogue pour le moment).");
    }
  }
}

if (catalog) {
  for (const key of Object.keys(catalog)) {
    if (!linkedCatalogKeys.has(key)) {
      fail("La matière du catalogue n'est reliée à aucune page de niveau : " + key);
    }
  }
}

if (stats.legacyLinks > 0 && stats.legacyLinks !== 1) {
  fail("Le lien historique L1|Microéconomie doit apparaître une seule fois.");
}

console.log("Validation du catalogue SEG-UNDA");
console.log("Matières : " + stats.courses + " | chapitres : " + stats.chapters +
  " | exercices : " + stats.exercises + " | quiz : " + stats.quizzes);
console.log("Navigation : " + stats.links + " liens | " + stats.catalogLinks +
  " clés exactes | " + stats.legacyLinks + " ressource historique | " +
  stats.pendingLinks + " matières en préparation.");

for (const warning of warnings) console.warn("À préparer : " + warning);
for (const error of errors) console.error("ERREUR : " + error);

if (errors.length > 0) {
  console.error("Échec : " + errors.length + " anomalie(s) détectée(s).");
  process.exitCode = 1;
} else {
  console.log("Succès : structure, navigation et imports cohérents.");
}
