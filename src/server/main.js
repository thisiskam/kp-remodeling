import express from "express";
import viteExpress from "vite-express";
import db from "./database/client.js";
import { apiRouter } from "./API/index.js";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/api", apiRouter)

app.use(express.static("public"));

(async () => {
    try {
      await db.connect();
      console.log("Connected to the database!");

      const result = await db.query("SELECT NOW()");
      console.log("Current timestamp from the database:", result.rows[0]);
    } catch (err) {
      console.error("Failed to connect or query the database:", err);
    }
  })();

viteExpress.listen(app, PORT, () =>
    console.log(`Server is listening on ${PORT}`)
  );
