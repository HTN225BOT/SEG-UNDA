# Audit des contenus pédagogiques — Licence 1

**Dépôt :** HTN225BOT/SEG-UNDA  
**Branche de travail :** cleanup-foundation  
**Référence comparée :** main  
**Date :** 13 novembre 2026

## Synthèse

L'audit confirme qu'il ne faut pas reconstruire Microéconomie L1 : un ensemble pédagogique existe déjà sur `main` et ses ressources sont présentes dans la branche de travail. La nouvelle navigation de `cleanup-foundation` propose désormais des liens vers ces ressources historiques.

Deux autres matières ont des contenus pilotes dans le catalogue dynamique. Les autres matières affichées dans la liste L1 n'ont pas été retrouvées sous forme de cours détaillés dans les fichiers examinés.

## État par matière

| Matière | État constaté | Source / action |
|---|---|---|
| Économie générale | Contenu pilote : 3 chapitres, 2 exercices corrigés, 3 questions de quiz | `js/course-data.js` sur `cleanup-foundation`. À valider pédagogiquement. |
| Comptabilité générale | Contenu pilote : 3 chapitres, 2 exercices corrigés, 3 questions de quiz | `js/course-data.js` sur `cleanup-foundation`. À valider pédagogiquement. |
| Mathématiques | Matière listée, cours détaillé non retrouvé dans les fichiers audités | À rechercher dans les supports de l'équipe avant rédaction. |
| Introduction à la gestion | Matière listée, cours détaillé non retrouvé dans les fichiers audités | À rechercher dans les supports de l'équipe avant rédaction. |
| Droit | Matière listée, cours détaillé non retrouvé dans les fichiers audités | À rechercher dans les supports de l'équipe avant rédaction. |
| Informatique | Matière listée, cours détaillé non retrouvé dans les fichiers audités | À rechercher dans les supports de l'équipe avant rédaction. |
| Microéconomie | Ressources existantes : page matière, cours en 6 chapitres, exercices corrigés, fiche de révision et feuilles de style | Ressources historiques de `main`, conservées sur la branche de travail et reliées depuis la nouvelle page matière. |

## Détail de Microéconomie déjà disponible

- `cours/matieres/microeconomie.html` : accueil de la matière.
- `cours/matieres/microeconomie-cours.html` : sommaire du cours.
- `cours/matieres/chapitre-01/index.html` à `chapitre-06/index.html` : six chapitres.
- `cours/matieres/microeconomie-exercices.html` : exercices.
- `cours/matieres/microeconomie-revision.html` : révision.
- Feuilles de style dédiées dans `cours/matieres/`.

La page dynamique reconnaît maintenant Microéconomie L1 et expose trois accès directs vers le cours, les exercices et les révisions. Les fichiers historiques n'ont pas été réécrits.

## Limites et précautions

- Cet audit porte sur les fichiers présents dans les arbres Git des branches consultées. Il ne prouve pas l'existence ou l'absence de supports hors dépôt (documents locaux, fichiers non suivis, plateforme pédagogique).
- Les contenus pilotes d'Économie générale et de Comptabilité générale sont des propositions de démarrage, pas des syllabus officiellement validés par l'UNDA.
- Aucune validation de rendu en navigateur n'est déclarée dans cet audit.

## Ordre de travail recommandé

1. Vérifier le rendu et la navigation Microéconomie dans la nouvelle interface.
2. Demander ou rechercher les supports/syllabus officiels de Mathématiques, Introduction à la gestion, Droit et Informatique.
3. Développer ces matières à partir de ces références, en gardant une mention « provisoire » tant qu'elles ne sont pas validées.
4. Faire relire les deux contenus pilotes déjà présents.
