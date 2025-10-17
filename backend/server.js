import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// 🧩 POST route to send prompt to Fireworks model
app.post("/api/generate", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "No prompt provided" });
  }

  try {
    const response = await fetch("https://api.fireworks.ai/inference/v1/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.FIREWORKS_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "accounts/sentientfoundation-serverless/models/dobby-mini-unhinged-plus-llama-3-1-8b",
        prompt: prompt,
        max_tokens: 300,
      }),
    });

    const data = await response.json();

    if (data?.error) {
      console.error("🔥 Fireworks API Error:", data.error);
      return res.status(500).json({ error: data.error.message });
    }

    const text = data?.choices?.[0]?.text?.trim() || "⚠️ No response from Dobby.";
    res.json({ text });

  } catch (err) {
    console.error("❌ Server Error:", err);
    res.status(500).json({ error: "Backend error." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Backend running on port ${PORT}`));
