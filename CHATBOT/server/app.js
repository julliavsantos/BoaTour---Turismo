import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import empresa from "./empresa.js";
import identidade from "./bot.js";

dotenv.config();

// Resolve o caminho da pasta public corretamente a partir da pasta server/
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());

// Ajuste da pasta estática para apontar para a raiz (../public)
app.use(express.static(path.join(__dirname, "../public")));

const memoria = [];

// Rota do chatbot
app.post("/chat", async (req, res) => {
    const mensagem = req.body.mensagem;

    if (!mensagem) {
        return res.status(400).json({
            erro: "Mensagem vazia"
        });
    }

    // Salva mensagem do usuário
    memoria.push({
        role: "user",
        content: mensagem
    });

    try {
        const resposta = await fetch(
            `${process.env.OLLAMA_HOST}/api/chat`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    model: process.env.OLLAMA_MODEL || "gpt-oss:20b-cloud",
                    stream: false,
                    messages: [
                        {
                            role: "system",
                            content: `Instruções do Bot: ${JSON.stringify(identidade.personalidade)}. Dados da Empresa: ${JSON.stringify(empresa)}`
                        },
                        ...memoria
                    ]
                })
            }
        );

        const dados = await resposta.json();
        const texto = dados.message.content;

        // Salva resposta do bot
        memoria.push({
            role: "assistant",
            content: texto
        });

        res.json({
            resposta: texto
        });

    } catch (erro) {
        console.error(erro);
        res.status(500).json({
            resposta: "Não consegui conectar ao Ollama."
        });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("================================");
    console.log("Chatbot funcionando!");
    console.log(`http://localhost:${PORT}`);
    console.log("================================");
});