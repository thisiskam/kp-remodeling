import express from "express";
import viteExpress from "vite-express";
import path from "path";
import { fileURLToPath } from "url";
import db from "./database/client.js";

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(express.json());
app.use(express.static("public"));

app.use(express.static(path.join(__dirname, '../../dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../dist', 'index.html'));
});

(async () => {
    try {
      await db.connect();
      console.log("Connected to the database!");
  
      // Test query
      const result = await db.query("SELECT NOW()");
      console.log("Current timestamp from the database:", result.rows[0]);
  
      // Close the connection
      await db.end();
    } catch (err) {
      console.error("Failed to connect or query the database:", err);
    }
  })();

viteExpress.listen(app, PORT, () =>
    console.log(`Server is listening on ${PORT}`)
  );
