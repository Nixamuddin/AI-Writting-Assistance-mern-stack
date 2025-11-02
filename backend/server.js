import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import Routes from "./Routes/ApiRoutes.js";
import grammaticallyRoutes from "./Routes/GrammerCheck.js";
import SpellCheckRoutes from "./Routes/spellChecking.js";
const app = express();
app.use(express.json());

dotenv.config();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use("/api/v1/openai", Routes);
app.use("/api/v1/openai", grammaticallyRoutes);
app.use("/api/v1/openai", SpellCheckRoutes);
const PORT = 8000;
app.listen(PORT, () => {
  console.log("App Running at port ", PORT);
});
