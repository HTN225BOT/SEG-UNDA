const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");

const app = express();

app.use(cors());
app.use(express.json());


/* ==================================================
   OPENAI
================================================== */

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});


/* ==================================================
   PAGE PRINCIPALE
================================================== */

app.get("/", (req, res) => {

    res.json({
        status: "online",
        message: "SEG UNDA AI est connecté.",
        openaiKeyConfigured: !!process.env.OPENAI_API_KEY
    });

});


/* ==================================================
   TEST OPENAI
================================================== */

app.get("/test-ai", async (req, res) => {

    try {

        const response = await client.responses.create({

            model: "gpt-5.6-luna",

            input: "Réponds simplement : SEG UNDA AI fonctionne !"

        });


        res.json({

            status: "success",

            reply: response.output_text

        });


    } catch (error) {

        console.error("ERREUR OPENAI :", error);


        res.status(500).json({

            status: "error",

            message: error.message || "Erreur inconnue",

            type: error.type || null,

            code: error.code || null,

            statusCode: error.status || null

        });

    }

});


/* ==================================================
   CHAT
================================================== */

app.post("/chat", async (req, res) => {

    try {

        const message = req.body.message;


        /* ------------------------------------------
           Vérification du message
        ------------------------------------------ */

        if (!message || message.trim() === "") {

            return res.status(400).json({

                error: "Message vide."

            });

        }


        /* ------------------------------------------
           Appel OpenAI
        ------------------------------------------ */

        const response = await client.responses.create({

            model: "gpt-5.6-luna",

            instructions: `
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
- vie quotidienne
- technologie
- économie
- et autres sujets autorisés.

Tu es également spécialisé dans
l'accompagnement des étudiants en
Sciences Économiques et de Gestion.

Lorsque la question concerne SEG UNDA
ou ses cours, donne des explications
pédagogiques, claires et structurées.

Pour les exercices de calcul,
montre les étapes et explique
le résultat obtenu.

Réponds en français par défaut,
sauf si l'utilisateur demande
une autre langue.
`,

            input: message

        });


        /* ------------------------------------------
           Réponse
        ------------------------------------------ */

        res.json({

            reply: response.output_text

        });


    } catch (error) {

        console.error("================================");
        console.error("ERREUR SEG UNDA AI");
        console.error(error);
        console.error("================================");


        res.status(500).json({

            error:
                error.message ||
                "Erreur lors de la communication avec OpenAI.",

            type:
                error.type || null,

            code:
                error.code || null,

            statusCode:
                error.status || null

        });

    }

});


/* ==================================================
   SERVEUR
================================================== */

const PORT = process.env.PORT || 3000;


app.listen(PORT, "0.0.0.0", () => {

    console.log(
        "SEG UNDA AI fonctionne sur le port " + PORT
    );

});
