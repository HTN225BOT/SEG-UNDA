# État des contenus pédagogiques — Licence 1

**Dépôt :** HTN225BOT/SEG-UNDA  
**Branche de travail :** `cleanup-foundation`  
**Date de mise à jour :** 13 novembre 2026

## Synthèse

La branche contient désormais six matières dans le catalogue pédagogique dynamique : Économie générale, Comptabilité générale, Mathématiques, Introduction à la gestion, Droit et Informatique.

Ces contenus sont présentés comme des **programmes non officiels de l'UNDA**. Ils constituent des supports pédagogiques complémentaires élaborés pour l'apprentissage. Ils ne doivent pas être interprétés comme une reproduction certifiée du syllabus officiel de l'université.

La Microéconomie dispose par ailleurs de ressources historiques distinctes, conservées dans le dépôt et reliées depuis la nouvelle page matière.

## État par matière

| Matière | État constaté | Fichier ou ressource |
|---|---|---|
| Économie générale | Contenu pédagogique présent dans le catalogue | `js/course-data.js` |
| Comptabilité générale | Contenu pédagogique présent dans le catalogue | `js/course-data.js` |
| Mathématiques | Contenu pédagogique présent dans le catalogue | `js/course-data.js` |
| Introduction à la gestion | Contenu pédagogique présent dans le catalogue | `js/course-data.js` |
| Droit | Contenu pédagogique général présent dans le catalogue | `js/course-data.js` |
| Informatique | Contenu pédagogique général présent dans le catalogue | `js/course-data.js` |
| Microéconomie | Ressources existantes : cours en six chapitres, exercices et fiche de révision | Fichiers historiques dans `cours/matieres/` |

## Ressources de Microéconomie

- `cours/matieres/microeconomie.html` : accueil de la matière.
- `cours/matieres/microeconomie-cours.html` : sommaire du cours.
- `cours/matieres/chapitre-01/index.html` à `chapitre-06/index.html` : six chapitres.
- `cours/matieres/microeconomie-exercices.html` : exercices.
- `cours/matieres/microeconomie-revision.html` : révision.
- Feuilles de style dédiées dans `cours/matieres/`.

La page matière dynamique propose des accès vers ces ressources historiques. Les fichiers historiques n'ont pas été réécrits dans le cadre de la création du catalogue.

## Limites et précautions

- Cet état décrit les fichiers présents dans la branche consultée. Il ne couvre pas les éventuels supports externes ou documents qui ne sont pas présents dans le dépôt.
- Aucun rapprochement exhaustif avec le syllabus officiel de l'UNDA n'a été effectué. Les contenus sont donc explicitement présentés comme non officiels.
- Les notions de droit doivent être utilisées avec prudence et confrontées aux textes ivoiriens et communautaires applicables dans leur version en vigueur.
- Aucune validation du rendu dans un navigateur n'est déclarée ici.

## Prochaines vérifications techniques

1. Contrôler les liens entre les pages de niveaux, les matières et les ressources historiques.
2. Vérifier les paramètres transmis dans les URL et la correspondance avec les clés du catalogue.
3. Contrôler la structure des chapitres, exercices et quiz, notamment les réponses attendues.
4. Effectuer ensuite un contrôle visuel dans un navigateur avant de considérer le parcours comme prêt à publier.
