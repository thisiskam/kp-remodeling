// server/main.js
import 'dotenv/config';
import express from "express";
import cors from "cors";
import db from "./database/client.js";
import { apiRouter } from "./API/index.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Allow your frontend domain(s) to call the API
app.use(cors({
  origin: [
    "https://kphomeremodeling.com",
    "https://www.kphomeremodeling.com",
    "http://localhost:5173" // for local Vite dev
  ],
  credentials: true
}));

app.use(express.json());

// Mount your API
app.use("/api", apiRouter);

// Health check endpoint (also tests DB connection)
app.get("/health", async (_req, res) => {
  try {
    const { rows } = await db.query("SELECT NOW() AS ts");
    res.json({ ok: true, dbTime: rows[0].ts });
  } catch (err) {
    console.error("Health check failed:", err);
    res.status(500).json({ ok: false, error: String(err) });
  }
});

// Start Express normally (no vite-express)
app.listen(PORT, () => {
  console.log(`API listening on ${PORT}`);
});