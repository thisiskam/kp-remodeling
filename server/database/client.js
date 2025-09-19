// server/database/client.js
import dotenv from "dotenv";
import pkg from "pg";
const { Pool } = pkg;

dotenv.config();

const connectionString =
  process.env.DATABASE_URL || "postgres://localhost:5432/remodel_estimator";

// Use a connection pool instead of a single client
const pool = new Pool({
  connectionString,
  ssl: process.env.NODE_ENV === "production"
    ? { rejectUnauthorized: false } // required for Supabase
    : false
});

// Export helper functions for queries and transactions
export default {
  query: (text, params) => pool.query(text, params),
  connect: () => pool.connect() // only use if you need manual transactions
};