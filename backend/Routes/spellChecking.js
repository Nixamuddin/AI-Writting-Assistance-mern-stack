import axios from "axios";
import express from "express";
const SpellCheckRoutes = express.Router();
const key =
  "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";
SpellCheckRoutes.post("/spell", async (req, res) => {
  try {
    const { text } = req.body;
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "meta-llama/llama-4-maverick:free",
        messages: [
          {
            role: "system",
            content:
              "only return origional text no extra text. You are an advanced English spell checker. Review the following text carefully and identify any spelling mistakes.",
          },
          { role: "user", content: text },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:3000",
          "X-Title": "Express Paraphrasing Tool",
        },
      }
    );
    const result = response.data?.choices?.[0]?.message?.content;
    res.status(200).send({ success: true, message: "Answer", result });
  } catch (error) {
    console.error("DeepSeek API error:", error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      success: false,
      message: "Sentence analysis failed",
      error: error.response?.data || error.message,
    });
  }
});

export default SpellCheckRoutes;
