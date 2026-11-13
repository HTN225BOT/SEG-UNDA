import { courseCatalog } from "./course-data.js";

const params = new URLSearchParams(location.search);
const level = (params.get("level") || "").trim().toUpperCase();
const subject = (params.get("subject") || "Matière").trim();

const normalize = value =>
  value.normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("fr")
    .replace(/\s+/g, " ")
    .trim();

const requestedKey = normalize(level) + "|" + normalize(subject);
const courseEntry = Object.entries(courseCatalog).find(([key]) => {
  const [catalogLevel, catalogSubject] = key.split("|");
  return normalize(catalogLevel) + "|" + normalize(catalogSubject) === requestedKey;
});
const course = courseEntry ? courseEntry[1] : null;

const $ = id => document.getElementById(id);
const title = $("subjectTitle");
const levelLabel = $("subjectLevel");
const backLink = $("backToLevel");
const root = $("courseContent");

title.textContent = subject;
levelLabel.textContent = ({ L1: "LICENCE 1", L2: "LICENCE 2", L3: "LICENCE 3" }[level] || "SEG UNDA");
document.title = subject + " | SEG UNDA";
backLink.href = level ? "../" + level.toLowerCase() + ".html" : "index.html";

if (!course && level === "L1" && normalize(subject) === "microeconomie") {
  root.innerHTML = '<section class="content-empty"><h2>Microéconomie — ressources déjà disponibles</h2><p>Le dépôt contient déjà un cours structuré en six chapitres, une série d’exercices corrigés et une fiche de révision. Ces ressources existantes sont conservées et accessibles ci-dessous.</p><div class="legacy-course-links"><a class="hero-btn" href="matieres/microeconomie-cours.html">📖 Consulter les 6 chapitres</a><a class="hero-btn" href="matieres/microeconomie-exercices.html">📝 Faire les exercices corrigés</a><a class="hero-btn" href="matieres/microeconomie-revision.html">🎯 Ouvrir la fiche de révision</a></div><p class="course-note">Les ressources historiques ont été réintégrées à la navigation de la nouvelle plateforme sans recopier ni écraser leur contenu.</p></section>';
} else if (!course) {
  root.innerHTML = '<section class="content-empty"><h2>Contenu en préparation</h2><p>Cette matière ne dispose pas encore de support pédagogique détaillé dans le catalogue. Les ressources seront ajoutées progressivement.</p><p class="course-note">Aucun contenu officiel n’est présenté ici pour le moment.</p><a href="../ia/index.html" class="hero-btn">Demander à SEG UNDA AI</a></section>';
} else {
  const status = document.createElement("p");
  status.className = "course-note";
  status.textContent = course.status;
  root.append(status);

  const intro = document.createElement("p");
  intro.className = "course-intro";
  intro.textContent = course.intro;
  root.append(intro);

  const chapterNav = document.createElement("nav");
  chapterNav.className = "chapter-nav";
  chapterNav.setAttribute("aria-label", "Chapitres");
  course.chapters.forEach((chapter, index) => {
    const link = document.createElement("a");
    link.href = "#chapter-" + (index + 1);
    link.textContent = "Chapitre " + (index + 1);
    chapterNav.append(link);
  });
  root.append(chapterNav);

  course.chapters.forEach((chapter, index) => {
    const article = document.createElement("article");
    article.className = "chapter-card";
    article.id = "chapter-" + (index + 1);

    const heading = document.createElement("h2");
    heading.textContent = "Chapitre " + (index + 1) + " — " + chapter.title;
    article.append(heading);

    const objectives = document.createElement("ul");
    objectives.className = "objective-list";
    chapter.objectives.forEach(objective => {
      const item = document.createElement("li");
      item.textContent = objective;
      objectives.append(item);
    });
    article.append(objectives);

    chapter.sections.forEach(([sectionTitle, body]) => {
      const section = document.createElement("section");
      const subheading = document.createElement("h3");
      subheading.textContent = sectionTitle;
      const paragraph = document.createElement("p");
      paragraph.textContent = body;
      section.append(subheading, paragraph);
      article.append(section);
    });

    const summary = document.createElement("div");
    summary.className = "chapter-summary";
    summary.textContent = "À retenir : " + chapter.summary;
    article.append(summary);
    root.append(article);
  });

  const exercises = document.createElement("section");
  exercises.className = "chapter-card";
  const exercisesHeading = document.createElement("h2");
  exercisesHeading.textContent = "Exercices d’application";
  exercises.append(exercisesHeading);

  course.exercises.forEach((exercise, index) => {
    const box = document.createElement("div");
    box.className = "exercise-item";
    const question = document.createElement("p");
    question.textContent = (index + 1) + ". " + exercise.question;

    const button = document.createElement("button");
    button.className = "reveal-btn";
    button.type = "button";
    button.textContent = "Voir la correction";
    button.setAttribute("aria-expanded", "false");

    const answer = document.createElement("p");
    answer.className = "answer-hidden";
    answer.textContent = exercise.answer + " " + exercise.explanation;

    button.addEventListener("click", () => {
      const isVisible = answer.classList.toggle("visible");
      button.textContent = isVisible ? "Masquer la correction" : "Voir la correction";
      button.setAttribute("aria-expanded", String(isVisible));
    });
    box.append(question, button, answer);
    exercises.append(box);
  });
  root.append(exercises);

  const quiz = document.createElement("section");
  quiz.className = "chapter-card";
  const quizHeading = document.createElement("h2");
  quizHeading.textContent = "Quiz de révision";
  const quizIntro = document.createElement("p");
  quizIntro.textContent = "Choisis une réponse pour chaque question, puis vérifie ton résultat.";
  quiz.append(quizHeading, quizIntro);

  const form = document.createElement("form");
  form.id = "courseQuiz";
  course.quiz.forEach((question, index) => {
    const fieldset = document.createElement("fieldset");
    fieldset.className = "quiz-question";
    const legend = document.createElement("legend");
    legend.textContent = (index + 1) + ". " + question.q;
    fieldset.append(legend);

    question.options.forEach((option, optionIndex) => {
      const label = document.createElement("label");
      const input = document.createElement("input");
      input.type = "radio";
      input.name = "q" + index;
      input.value = optionIndex;
      input.required = true;
      label.append(input, document.createTextNode(" " + option));
      fieldset.append(label);
    });
    form.append(fieldset);
  });

  const submit = document.createElement("button");
  submit.className = "reveal-btn";
  submit.type = "submit";
  submit.textContent = "Corriger mon quiz";
  const result = document.createElement("p");
  result.className = "quiz-result";
  result.setAttribute("aria-live", "polite");
  form.append(submit, result);

  form.addEventListener("submit", event => {
    event.preventDefault();
    let score = 0;
    const feedback = [];
    course.quiz.forEach((question, index) => {
      const selected = form.querySelector('input[name="q' + index + '"]:checked');
      const correct = selected && Number(selected.value) === question.correct;
      if (correct) score++;
      feedback.push("Question " + (index + 1) + " : " +
        (correct ? "Correct. " : "À revoir. ") + question.why);
    });
    result.textContent = "Résultat : " + score + "/" + course.quiz.length + ". " + feedback.join(" ");
  });

  quiz.append(form);
  root.append(quiz);
}
