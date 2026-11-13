import { courseCatalog } from "./course-data.js";
const params=new URLSearchParams(location.search);
const level=(params.get("level")||"").toUpperCase();
const subject=params.get("subject")||"Matière";
const key=level+"|"+subject;
const course=courseCatalog[key];
const $=id=>document.getElementById(id);
$("subjectTitle").textContent=subject;
$("subjectLevel").textContent=({L1:"LICENCE 1",L2:"LICENCE 2",L3:"LICENCE 3"}[level]||"SEG UNDA");
document.title=subject+" | SEG UNDA";
$("backToLevel").href=level?"../"+level.toLowerCase()+".html":"index.html";
const root=$("courseContent");
if(!course && level==="L1" && subject.normalize("NFD").replace(/[\\u0300-\\u036f]/g,"").toLowerCase()==="microeconomie"){
 root.innerHTML='<section class="content-empty"><h2>Microéconomie — ressources déjà disponibles</h2><p>Le dépôt contient déjà un cours structuré en six chapitres, une série d’exercices corrigés et une fiche de révision. Ces ressources existantes sont conservées et accessibles ci-dessous.</p><div class="legacy-course-links"><a class="hero-btn" href="matieres/microeconomie-cours.html">📖 Consulter les 6 chapitres</a><a class="hero-btn" href="matieres/microeconomie-exercices.html">📝 Faire les exercices corrigés</a><a class="hero-btn" href="matieres/microeconomie-revision.html">🎯 Ouvrir la fiche de révision</a></div><p class="course-note">Les ressources historiques ont été réintégrées à la navigation de la nouvelle plateforme sans recopier ni écraser leur contenu.</p></section>';
} else if(!course){
 root.innerHTML='<section class="content-empty"><h2>Contenu en préparation</h2><p>Cette matière est identifiée dans le catalogue. Son cours détaillé sera ajouté après validation du programme et des supports pédagogiques.</p><p class="course-note">Aucun contenu officiel n’est présenté ici pour le moment.</p><a href="../ia/index.html" class="hero-btn">Demander à SEG UNDA AI</a></section>';
} else {
 const status=document.createElement("p");status.className="course-note";status.textContent=course.status;root.append(status);
 const intro=document.createElement("p");intro.className="course-intro";intro.textContent=course.intro;root.append(intro);
 const chapterNav=document.createElement("nav");chapterNav.className="chapter-nav";chapterNav.setAttribute("aria-label","Chapitres");
 course.chapters.forEach((c,i)=>{const b=document.createElement("a");b.href="#chapter-"+(i+1);b.textContent="Chapitre "+(i+1);chapterNav.append(b)});root.append(chapterNav);
 course.chapters.forEach((c,i)=>{
  const article=document.createElement("article");article.className="chapter-card";article.id="chapter-"+(i+1);
  const h=document.createElement("h2");h.textContent="Chapitre "+(i+1)+" — "+c.title;article.append(h);
  const ol=document.createElement("ul");ol.className="objective-list";c.objectives.forEach(t=>{const li=document.createElement("li");li.textContent=t;ol.append(li)});article.append(ol);
  c.sections.forEach(([title,body])=>{const section=document.createElement("section");const sh=document.createElement("h3");sh.textContent=title;const p=document.createElement("p");p.textContent=body;section.append(sh,p);article.append(section)});
  const summary=document.createElement("div");summary.className="chapter-summary";summary.textContent="À retenir : "+c.summary;article.append(summary);root.append(article);
 });
 const ex=document.createElement("section");ex.className="chapter-card";ex.innerHTML="<h2>Exercices d’application</h2>";
 course.exercises.forEach((item,i)=>{const box=document.createElement("div");box.className="exercise-item";const q=document.createElement("p");q.textContent=(i+1)+". "+item.question;const btn=document.createElement("button");btn.className="reveal-btn";btn.textContent="Voir la correction";const ans=document.createElement("p");ans.className="answer-hidden";ans.textContent=item.answer+" "+item.explanation;btn.addEventListener("click",()=>{const open=ans.classList.toggle("visible");btn.textContent=open?"Masquer la correction":"Voir la correction"});box.append(q,btn,ans);ex.append(box)});root.append(ex);
 const quiz=document.createElement("section");quiz.className="chapter-card";quiz.innerHTML="<h2>Quiz de révision</h2><p>Choisis une réponse pour chaque question, puis vérifie ton résultat.</p>";
 const form=document.createElement("form");form.id="courseQuiz";
 course.quiz.forEach((item,i)=>{const field=document.createElement("fieldset");field.className="quiz-question";const legend=document.createElement("legend");legend.textContent=(i+1)+". "+item.q;field.append(legend);item.options.forEach((opt,j)=>{const label=document.createElement("label");const input=document.createElement("input");input.type="radio";input.name="q"+i;input.value=j;input.required=true;label.append(input,document.createTextNode(" "+opt));field.append(label)});form.append(field)});
 const submit=document.createElement("button");submit.className="reveal-btn";submit.type="submit";submit.textContent="Corriger mon quiz";form.append(submit);const result=document.createElement("p");result.className="quiz-result";result.setAttribute("aria-live","polite");form.append(result);
 form.addEventListener("submit",e=>{e.preventDefault();let score=0;const feedback=[];course.quiz.forEach((q,i)=>{const selected=form.querySelector('input[name="q'+i+'"]:checked');const ok=selected&&Number(selected.value)===q.correct;if(ok)score++;feedback.push("Question "+(i+1)+" : "+(ok?"Correct. ":"À revoir. ")+q.why)});result.textContent="Résultat : "+score+"/"+course.quiz.length+". "+feedback.join(" ")});quiz.append(form);root.append(quiz);
}
