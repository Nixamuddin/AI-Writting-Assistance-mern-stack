import express from "express";
const grammaticallyRoutes = express.Router();
import axios from "axios";
const key =
  "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";
grammaticallyRoutes.post("/check", async (req, res) => {
  try {
    const { text } = req.body;
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "meta-llama/llama-4-maverick:free",
        messages: [
          {
            role: "system",
            content: `You are an AI grammar correction system. 
      Your task is to correct only the grammar of the given text. 
      Do not explain, describe, or justify the correction. 
      Return ONLY the corrected text — nothing else. 
      If the text is already correct, return it exactly as it is.`,
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
    console.error(
      "Grammer Check API error:",
      error.response?.data || error.message
    );
  }
});

export default grammaticallyRoutes;
