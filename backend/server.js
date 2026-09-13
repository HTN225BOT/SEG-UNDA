const express = require("express");
const cors = require("cors");
const { GoogleGenAI } = require("@google/genai");
const app = express();
app.use(cors());
app.use(express.json());
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});
/* ==================================================
   PAGE PRINCIPALE
================================================== */
app.get("/", (req, res) => {
    res.json({
        status: "online",
        message: "SEG UNDA AI est connecté.",
        geminiKeyConfigured: !!process.env.GEMINI_API_KEY
    });
});
/* ==================================================
   TEST GEMINI
================================================== */
app.get("/test-ai", async (req, res) => {
    try {
        const interaction = await ai.interactions.create({
            model: "gemini-3.6-flash",
            input: "Réponds simplement : SEG UNDA AI fonctionne !"
        });
        res.json({
            status: "success",
            reply: interaction.output_text
        });
    } catch (error) {
        console.error("ERREUR GEMINI :", error);
        res.status(500).json({
            status: "error",
            message: error.message || "Erreur inconnue"
        });
    }
});
/* ==================================================
   CHAT SEG UNDA AI
================================================== */
app.post("/chat", async (req, res) => {
    try {
        const message = req.body.message;
        if (!message || message.trim() === "") {
            return res.status(400).json({
                error: "Message vide."
            });
        }
        const interaction = await ai.interactions.create({
            model: "gemini-3.6-flash",
            input: `
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
- vie quotidienne
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
Question de l'utilisateur :
${message}
`
        });
        res.json({
            reply: interaction.output_text
        });
    } catch (error) {
        console.error("================================");
        console.error("ERREUR SEG UNDA AI");
        console.error(error);
        console.error("================================");
        res.status(500).json({
            error:
                error.message ||
                "Erreur lors de la communication avec Gemini."
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
