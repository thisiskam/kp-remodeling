// server/database/client.js
import dotenv from "dotenv";
import pkg from "pg";
const { Pool } = pkg;

dotenv.config();

const connectionString =
  process.env.DATABASE_URL || "postgres://localhost:5432/remodel_estimator";

  import dns from "dns";
  if (typeof dns.setDefaultResultOrder === "function") {
    dns.setDefaultResultOrder("ipv4first");
  }
  
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