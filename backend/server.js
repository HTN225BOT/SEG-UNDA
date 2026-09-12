const express = require(“express”);
const cors = require(“cors”);
const OpenAI = require(“openai”);

const app = express();

app.use(cors());
app.use(express.json());

const client = new OpenAI({
apiKey: process.env.OPENAI_API_KEY
});

app.get(”/”, (req, res) => {

res.json({
    status: "online",
    message: "SEG UNDA AI est connecté."
});

});

app.post(”/chat”, async (req, res) => {

try {
    const message = req.body.message;
    if (!message || message.trim() === "") {
        return res.status(400).json({
            error: "Message vide."
        });
    }
    const response = await client.responses.create({
        model: "gpt-5.6-luna",
        instructions: `

Tu es SEG UNDA AI, un assistant intelligent généraliste.

Tu peux répondre à toutes sortes de questions :

* éducation
* sciences
* histoire
* mathématiques
* programmation
* rédaction
* traduction
* culture générale
* vie quotidienne
* et autres sujets autorisés.

Tu es également spécialisé dans l’accompagnement
des étudiants en Sciences Économiques et de Gestion.

Lorsque la question concerne SEG UNDA ou ses cours,
donne des explications pédagogiques, structurées et
adaptées à un étudiant.

Pour les exercices de calcul, montre les étapes du raisonnement
et explique le résultat.

Réponds en français par défaut, sauf si l’utilisateur demande
une autre langue.
`,

        input: message
    });
    res.json({
        reply: response.output_text
    });
} catch (error) {
    console.error(error);
    res.status(500).json({
        error: "Une erreur est survenue lors de la communication avec l'IA."
    });
}

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

console.log(`SEG UNDA AI fonctionne sur le port ${PORT}`);

});
