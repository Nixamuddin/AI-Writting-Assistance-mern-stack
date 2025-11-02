import axios from "axios";
import express from "express";
const Routes = express.Router();
const key =
  "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";
Routes.post("/analysis", async (req, res) => {
  try {
    const { sentence } = req.body;
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "meta-llama/llama-4-maverick:free",
        messages: [
          {
            role: "system",
            content:
              "Paraphrase the following sentence while keeping the original meaning, tone, and context. Ensure the output sounds natural, fluent, and grammatically correct. Provide only the rephrased version without extra explanation.",
          },
          { role: "user", content: sentence },
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

export default Routes;
