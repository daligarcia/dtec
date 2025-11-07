// -------------------- IMPORTS --------------------
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { GoogleGenAI } = require("@google/genai");

// -------------------- CONFIGURAÇÃO --------------------
const app = express();

app.use(
  cors({
    origin: ["http://127.0.0.1:5500", "http://localhost:5500"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use(express.json());

// -------------------- CONEXÕES --------------------
const MONGO_URI =
  "mongodb+srv://slownx:slownxgtz1@cluster0.79s8hoz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const GEMINI_KEY = "AIzaSyBkuVK-X1MjcKfrzKv1Bcn1YS2eDd89fss";
const PORT = 3000;

// Conectar MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ Conectado ao MongoDB"))
  .catch((err) => console.error("❌ Erro MongoDB:", err.message));

// -------------------- MODELO PRODUTO --------------------
const produtoSchema = new mongoose.Schema(
  {
    nome: String,
    raca: String,
    preco: Number,
    descricao: String,
    imagemUrl: String,
    categoria: {
      type: String,
      enum: ["Cachorro", "Gato", "Pássaro", "Peixe", "Outro"],
      default: "Cachorro",
    },
  },
  { timestamps: true }
);

const Produto = mongoose.model("Produto", produtoSchema);

// -------------------- GEMINI CONFIG --------------------
const ai = new GoogleGenAI({
  apiKey: GEMINI_KEY,
  vertexai: false,
});

console.log("🔑 Chave Gemini carregada com sucesso ✅");

// -------------------- FUNÇÃO GEMINI --------------------
async function gerarConteudoSobreAnimais(pergunta) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `
Você é um especialista em animais. Regras:
- Só responda perguntas relacionadas a animais, dicas, cuidados e receitas para pets.
- Se a pergunta não for sobre animais, diga: "Desculpe, só posso falar sobre animais."
- Seja direto e profissional.
- Use HTML simples (<p>, <ul>, <li>, <b>) para organizar a resposta.

Pergunta: ${pergunta}
              `,
            },
          ],
        },
      ],
    });

    let texto = "";

    if (typeof response.text === "function") {
      texto = await response.text();
    } else if (response?.candidates?.[0]?.content?.parts?.[0]?.text) {
      texto = response.candidates[0].content.parts[0].text;
    } else {
      texto = "Sem resposta gerada.";
    }

    return texto.trim();
  } catch (error) {
    console.error("❌ Erro Gemini:", error.message);
    return `Erro ao gerar resposta com Gemini: ${error.message}`;
  }
}

// -------------------- ROTAS --------------------

// Teste inicial
app.get("/", (req, res) => res.send("🐶 API PetWorld rodando!"));

// Produtos
app.get("/produtos", async (req, res) => {
  try {
    const produtos = await Produto.find();
    res.json(produtos);
  } catch {
    res.status(500).json({ erro: "Erro ao buscar produtos" });
  }
});

app.post("/produtos", async (req, res) => {
  try {
    const novoProduto = await Produto.create(req.body);
    res.status(201).json(novoProduto);
  } catch {
    res.status(500).json({ erro: "Erro ao adicionar produto" });
  }
});

app.put("/produtos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const produtoAtualizado = await Produto.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!produtoAtualizado)
      return res.status(404).json({ erro: "Produto não encontrado" });
    res.json(produtoAtualizado);
  } catch {
    res.status(500).json({ erro: "Erro ao atualizar produto" });
  }
});

app.delete("/produtos/:id", async (req, res) => {
  try {
    const produtoRemovido = await Produto.findByIdAndDelete(req.params.id);
    if (!produtoRemovido)
      return res.status(404).json({ erro: "Produto não encontrado" });
    res.json({ mensagem: "Produto removido com sucesso!" });
  } catch {
    res.status(500).json({ erro: "Erro ao excluir produto" });
  }
});

// ✅ IA (Gemini)
app.post("/api/pergunta", async (req, res) => {
  const { pergunta } = req.body;
  if (!pergunta)
    return res.status(400).json({ error: "Pergunta é obrigatória" });

  const resposta = await gerarConteudoSobreAnimais(pergunta);
  res.json({ resposta });
});

// Testar chave Gemini
app.get("/api/testar-key", async (req, res) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: "Responda apenas com a palavra OK",
    });

    const texto =
      (typeof response.text === "function"
        ? await response.text()
        : response?.candidates?.[0]?.content?.parts?.[0]?.text) || "Sem resposta";

    res.json({ status: "✅ Chave válida", resposta: texto });
  } catch (error) {
    res.status(400).json({ status: "❌ Chave inválida", erro: error.message });
  }
});

// -------------------- INICIAR SERVIDOR --------------------
app.listen(PORT, () =>
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`)
);
