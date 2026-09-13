const express = require("express");
const cors = require("cors");
const { GoogleGenAI } = require("@google/genai");

const app = express();

app.use(cors());
app.use(express.json());


// ==================================================
// GEMINI
// ==================================================

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});


// ==================================================
// PAGE D'ACCUEIL DU SERVEUR
// ==================================================

app.get("/", (req, res) => {

    res.json({
        status: "online",
        message: "SEG UNDA AI est connecté.",
        geminiKeyConfigured:
            !!process.env.GEMINI_API_KEY
    });

});


// ==================================================
// TEST DE L'IA
// ==================================================

app.get("/test-ai", async (req, res) => {

    try {

        const interaction =
            await ai.interactions.create({

                model: "gemini-3.6-flash",

                input:
                    "Réponds simplement : SEG UNDA AI fonctionne !"

            });


        res.json({

            status: "success",

            reply:
                interaction.output_text

        });


    } catch (error) {

        console.error(
            "ERREUR GEMINI :",
            error
        );


        res.status(500).json({

            status: "error",

            message:
                error.message ||
                "Erreur inconnue."

        });

    }

});


// ==================================================
// CHAT SEG UNDA AI
// ==================================================

app.post("/chat", async (req, res) => {

    try {

        const message =
            req.body.message;


        // --------------------------------------------------
        // Vérification du message
        // --------------------------------------------------

        if (
            !message ||
            message.trim() === ""
        ) {

            return res.status(400).json({

                error:
                    "Message vide."

            });

        }


        // --------------------------------------------------
        // Instructions SEG UNDA AI
        // --------------------------------------------------

        const prompt = `

Tu es SEG UNDA AI, un assistant intelligent généraliste.

Tu peux répondre à toutes sortes de questions :

- éducation
- sciences
- histoire
- mathématiques
- programmation
- rédaction
- traduction
- culture générale
- technologie
- économie
- gestion
- vie quotidienne
- et autres sujets autorisés.

Tu es également spécialisé dans l'accompagnement
des étudiants en Sciences Économiques et de Gestion.

Lorsque la question concerne SEG UNDA,
les études, l'économie, la gestion ou les cours,
donne des explications pédagogiques,
claires, structurées et faciles à comprendre.

Pour les exercices de calcul,
montre les étapes de résolution.

IMPORTANT :

Les mathématiques doivent être écrites
avec du LaTeX propre et valide.

Le site SEG UNDA AI utilise MathJax
pour afficher les formules mathématiques.

Respecte STRICTEMENT les règles suivantes :

1. Une formule mathématique courte dans une phrase
   doit être entourée par :

   $ ... $

2. Une formule importante ou une équation seule
   doit être entourée par :

   $$ ... $$

3. Pour une fraction, utilise TOUJOURS :

   \\frac{a}{b}

   Exemple :

   $$\\frac{2}{3}$$

4. N'écris JAMAIS :

   Frac

   ou :

   frac

   à la place de \\frac.

5. Pour les indices, utilise :

   P_x

   Pour les exposants :

   x^2

6. Pour une équation, utilise par exemple :

   $$P_x X + P_y Y = R$$

7. Pour une équation avec une fraction :

   $$Y = \\frac{R}{P_y} - \\frac{P_x}{P_y}X$$

8. Vérifie TOUJOURS que chaque accolade
   { et }
   est correctement fermée.

9. Vérifie TOUJOURS que chaque formule LaTeX
   est correctement ouverte et fermée.

10. N'utilise pas de code HTML
    pour afficher les mathématiques.

11. Ne mets pas de LaTeX incomplet.

12. Ne mets jamais une formule mathématique
    dans un bloc de code Markdown.

13. Lorsque tu écris plusieurs étapes mathématiques,
    présente-les clairement avec une formule
    par ligne lorsque c'est nécessaire.

Exemple de présentation correcte :

Étape 1 :

$$2x + 4 = 10$$

Étape 2 :

$$2x = 10 - 4$$

Étape 3 :

$$2x = 6$$

Étape 4 :

$$x = \\frac{6}{2} = 3$$

Le résultat final est donc :

$$x = 3$$

Pour les fractions, les racines,
les puissances, les équations et les systèmes,
utilise toujours une syntaxe LaTeX valide.

Exemples valides :

$$\\frac{a}{b}$$

$$x^2 + 2x + 1 = 0$$

$$\\sqrt{x}$$

$$P_x X + P_y Y = R$$

$$Y = \\frac{R - P_x X}{P_y}$$

Réponds en français par défaut,
sauf si l'utilisateur demande une autre langue.

Utilise Markdown lorsque cela améliore
la lisibilité :

- titres
- listes
- texte en gras
- tableaux simples
- formules LaTeX

Ne transforme pas les formules mathématiques
en texte brut.

Question de l'utilisateur :

${message}

`;


        // --------------------------------------------------
        // ENVOI À GEMINI
        // --------------------------------------------------

        const interaction =
            await ai.interactions.create({

                model:
                    "gemini-3.6-flash",

                input:
                    prompt

            });


        // --------------------------------------------------
        // RÉPONSE
        // --------------------------------------------------

        res.json({

            reply:
                interaction.output_text

        });


    } catch (error) {


        console.error(
            "================================"
        );

        console.error(
            "ERREUR SEG UNDA AI"
        );

        console.error(error);

        console.error(
            "================================"
        );


        res.status(500).json({

            error:
                error.message ||
                "Erreur lors de la communication avec Gemini."

        });

    }

});


// ==================================================
// SERVEUR
// ==================================================

const PORT =
    process.env.PORT || 3000;


app.listen(
    PORT,
    "0.0.0.0",
    () => {

        console.log(
            "SEG UNDA AI fonctionne sur le port " +
            PORT
        );

    }
);
