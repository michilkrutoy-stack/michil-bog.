const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");

const app = express();

app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post("/chat", async (req, res) => {
  try {
    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      instructions: "Ты MichilBog. Отвечай дружелюбно, смешно, можешь использовать мемы. Никогда не используй мат и оскорбления.",
      input: req.body.message
    });

    res.json({ reply: response.output_text });
  } catch (error) {
    res.status(500).json({ error: "Не удалось получить ответ" });
  }
});

app.listen(process.env.PORT || 3000);
